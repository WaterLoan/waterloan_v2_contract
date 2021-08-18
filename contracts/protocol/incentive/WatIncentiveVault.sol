// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {IERC20} from '../../dependencies/openzeppelin/contracts/IERC20.sol';
import {SafeERC20} from '../../dependencies/openzeppelin/contracts/SafeERC20.sol';
import {Ownable} from '../../dependencies/openzeppelin/contracts/Ownable.sol';

/**
 * @title WatIncentivesVault
 * @notice Stores all the WAT kept for incentives, just giving approval to the different
 * systems that will pull WAT funds for their specific use case
 **/
contract WatIncentivesVault is Ownable {
  using SafeERC20 for IERC20;

  IERC20 public immutable WAT;

  constructor(IERC20 wat) public {
    WAT = wat;
  }

  function approve(
    address recipient,
    uint256 amount
  ) external onlyOwner {
    WAT.safeApprove(recipient, amount);
  }

  function transfer(
    address recipient,
    uint256 amount
  ) external onlyOwner {
    WAT.safeTransfer(recipient, amount);
  }
}
