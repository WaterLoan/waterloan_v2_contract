// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {DistributionTypes} from '../libraries/types/DistributionTypes.sol';
import {SafeMath} from '../../dependencies/openzeppelin/contracts/SafeMath.sol';

import {IERC20} from '../../dependencies/openzeppelin/contracts/IERC20.sol';
import {SafeERC20} from '../../dependencies/openzeppelin/contracts/SafeERC20.sol';
import {IAToken} from '../../interfaces/IAToken.sol';
import {IAaveIncentivesController} from '../../interfaces/IAaveIncentivesController.sol';
import {VersionedInitializable} from '../libraries/aave-upgradeability/VersionedInitializable.sol';
import {DistributionManager} from './DistributionManager.sol';
import {IScaledBalanceToken} from '../../interfaces/IScaledBalanceToken.sol';

/**
 * @title TokenIncentivesController
 * @author IFWallet
 **/
contract TokenIncentivesController is
  IAaveIncentivesController,
  VersionedInitializable,
  DistributionManager
{
  using SafeMath for uint256;
  using SafeERC20 for IERC20;

  uint256 public constant REVISION = 1;

  IERC20 public immutable INCENTIVE_TOKEN;
  address public immutable REWARDS_VAULT;

  mapping(address => uint256) internal _usersUnclaimedRewards;

  // this mapping allows whitelisted addresses to claim on behalf of others
  // useful for contracts that hold tokens to be rewarded but don't have any native logic to claim Liquidity Mining rewards
  mapping(address => address) internal _authorizedClaimers;

  modifier onlyAuthorizedClaimers(address claimer, address user) {
    require(_authorizedClaimers[user] == claimer, 'CLAIMER_UNAUTHORIZED');
    _;
  }

  constructor(IERC20 rewardToken, address rewardsVault, address emissionManager)
    DistributionManager(emissionManager) public
  {
    INCENTIVE_TOKEN = rewardToken;
    REWARDS_VAULT = rewardsVault;
  }

  /**
   * @dev Initialize IStakedTokenIncentivesController
   * @param addressesProvider the address of the corresponding addresses provider
   **/
  function initialize(address addressesProvider) external initializer {
  }

  /// @inheritdoc IAaveIncentivesController
  function configureAssets(address[] calldata assets, uint256[] calldata emissionsPerSecond)
    external
    override
    onlyEmissionManager
  {
    require(assets.length == emissionsPerSecond.length, 'INVALID_CONFIGURATION');

    DistributionTypes.AssetConfigInput[] memory assetsConfig =
      new DistributionTypes.AssetConfigInput[](assets.length);

    for (uint256 i = 0; i < assets.length; i++) {
      assetsConfig[i].underlyingAsset = assets[i];
      assetsConfig[i].emissionPerSecond = emissionsPerSecond[i];

      require(assetsConfig[i].emissionPerSecond == emissionsPerSecond[i], 'INVALID_CONFIGURATION');

      assetsConfig[i].totalStaked = IScaledBalanceToken(assets[i]).scaledTotalSupply();
    }
    _configureAssets(assetsConfig);
  }

  /// @inheritdoc IAaveIncentivesController
  function handleAction(
    address user,
    uint256 totalSupply,
    uint256 userBalance
  ) external override {
    uint256 accruedRewards = _updateUserAssetInternal(user, msg.sender, userBalance, totalSupply);
    if (accruedRewards != 0) {
      _usersUnclaimedRewards[user] = _usersUnclaimedRewards[user].add(accruedRewards);
      emit RewardsAccrued(user, accruedRewards);
    }
  }

  /// @inheritdoc IAaveIncentivesController
  function getRewardsBalance(address[] calldata assets, address user)
    external
    view
    override
    returns (uint256)
  {
    uint256 unclaimedRewards = _usersUnclaimedRewards[user];

    DistributionTypes.UserStakeInput[] memory userState =
      new DistributionTypes.UserStakeInput[](assets.length);
    for (uint256 i = 0; i < assets.length; i++) {
      userState[i].underlyingAsset = assets[i];
      (userState[i].stakedByUser, userState[i].totalStaked) = IScaledBalanceToken(assets[i])
        .getScaledUserBalanceAndSupply(user);
    }
    unclaimedRewards = unclaimedRewards.add(_getUnclaimedRewards(user, userState));
    return unclaimedRewards;
  }

  /// @inheritdoc IAaveIncentivesController
  function claimRewards(
    address[] calldata assets,
    uint256 amount,
    address to
  ) external override returns (uint256) {
    require(to != address(0), 'INVALID_TO_ADDRESS');
    return _claimRewards(assets, amount, msg.sender, msg.sender, to);
  }

  /// @inheritdoc IAaveIncentivesController
  function claimRewardsOnBehalf(
    address[] calldata assets,
    uint256 amount,
    address user,
    address to
  ) external override onlyAuthorizedClaimers(msg.sender, user) returns (uint256) {
    require(user != address(0), 'INVALID_USER_ADDRESS');
    require(to != address(0), 'INVALID_TO_ADDRESS');
    return _claimRewards(assets, amount, msg.sender, user, to);
  }

  /**
   * @dev Claims reward for an user on behalf, on all the assets of the lending pool, accumulating the pending rewards.
   * @param amount Amount of rewards to claim
   * @param user Address to check and claim rewards
   * @param to Address that will be receiving the rewards
   * @return Rewards claimed
   **/

  /// @inheritdoc IAaveIncentivesController
  function setClaimer(address user, address caller) external override onlyEmissionManager {
    _authorizedClaimers[user] = caller;
    emit ClaimerSet(user, caller);
  }

  /// @inheritdoc IAaveIncentivesController
  function getClaimer(address user) external view override returns (address) {
    return _authorizedClaimers[user];
  }

  /// @inheritdoc IAaveIncentivesController
  function getUserUnclaimedRewards(address _user) external view override returns (uint256) {
    return _usersUnclaimedRewards[_user];
  }

  /// @inheritdoc IAaveIncentivesController
  function REWARD_TOKEN() external view override returns (address) {
    return address(INCENTIVE_TOKEN);
  }

  /**
   * @dev returns the revision of the implementation contract
   */
  function getRevision() internal pure override returns (uint256) {
    return REVISION;
  }

  /**
   * @dev Claims reward for an user on behalf, on all the assets of the lending pool, accumulating the pending rewards.
   * @param amount Amount of rewards to claim
   * @param user Address to check and claim rewards
   * @param to Address that will be receiving the rewards
   * @return Rewards claimed
   **/
  function _claimRewards(
    address[] calldata assets,
    uint256 amount,
    address claimer,
    address user,
    address to
  ) internal returns (uint256) {
    if (amount == 0) {
      return 0;
    }
    uint256 unclaimedRewards = _usersUnclaimedRewards[user];

    DistributionTypes.UserStakeInput[] memory userState =
      new DistributionTypes.UserStakeInput[](assets.length);
    for (uint256 i = 0; i < assets.length; i++) {
      userState[i].underlyingAsset = assets[i];
      (userState[i].stakedByUser, userState[i].totalStaked) = IScaledBalanceToken(assets[i])
        .getScaledUserBalanceAndSupply(user);
    }

    uint256 accruedRewards = _claimRewards(user, userState);
    if (accruedRewards != 0) {
      unclaimedRewards = unclaimedRewards.add(accruedRewards);
      emit RewardsAccrued(user, accruedRewards);
    }

    if (unclaimedRewards == 0) {
      return 0;
    }

    uint256 amountToClaim = amount > unclaimedRewards ? unclaimedRewards : amount;
    _usersUnclaimedRewards[user] = unclaimedRewards - amountToClaim; // Safe due to the previous line

    INCENTIVE_TOKEN.safeTransferFrom(REWARDS_VAULT, to, amountToClaim);
    emit RewardsClaimed(user, to, claimer, amountToClaim);

    return amountToClaim;
  }
}