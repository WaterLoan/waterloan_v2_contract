import { task } from 'hardhat/config';
import { eContractid } from '../../helpers/types';
import { getIErc20Detailed, getDistributionManager } from '../../helpers/contracts-getters';
import { deployWatIncentivesVault, deployStakedTokenV3 } from '../../helpers/contracts-deployments';
import { BigNumber, utils } from 'ethers';

task(`deploy-${eContractid.StakedTokenV3}`, `Deploys the StakedTokenV3 contract`)
  .addParam('stakedToken', 'address of staked token')
  .addParam('rewardToken', 'address of reward token')
  .addOptionalParam('cooldownSeconds', 'how long user need to wait before cooldown of staked tokens', "864000")
  .addOptionalParam('unstakeWindow', 'how long after cooldown can user unstake', "86400")
  .addOptionalParam('emissionManager', 'manager address of emission', "0xA4ff8Eb9F7331C2E93E60c5a2Cf5D694AC0f2811")
  .addOptionalParam('name', 'name of staked token', "Staked WAT/USDT OneSwap")
  .addOptionalParam('symbol', 'symbol of staked token', "stkWAT/USDT")
  .addOptionalParam("decimals", "decimals of staked token", "18")
  .addFlag('verify', 'Verify UiPoolDataProvider contract via Etherscan API.')
  .setAction(async ({ verify, stakedToken, rewardToken, cooldownSeconds, unstakeWindow, rewardsVault, emissionManager, name, symbol, decimals }, localBRE) => {
    await localBRE.run('set-DRE');
    if (!localBRE.network.config.chainId) {
      throw new Error('INVALID_CHAIN_ID');
    }
    const network = localBRE.network.name;

    console.log(`\n- StakedTokenV3 deployment`);

    // Deploy vault
    // Need to transfer initial amount of reward tokens to it
    const vault = await deployWatIncentivesVault([rewardToken]);
    console.log('Vault deployed at:', vault.address);

    const REWARD = await getIErc20Detailed(rewardToken);
    const amount = utils.parseEther('100000');
    await REWARD.transfer(vault.address, amount);
    console.log('Deposit initial amount of reward token to vault, token address at:', rewardToken);

    const stkTokenV3 = await deployStakedTokenV3(
      [stakedToken, rewardToken, cooldownSeconds, unstakeWindow, vault.address, emissionManager, name, symbol, decimals],
      verify
    );
    console.log('StakedTokenV3 deployed at:', stkTokenV3.address);

    await vault.approve(stkTokenV3.address, amount);
    console.log('Approved');

    await stkTokenV3.configureAssets([stkTokenV3.address], [utils.parseEther('0.01')]);
    let controller = await getDistributionManager(stkTokenV3.address);
    let current = Math.floor(Date.now() / 1000);
    await controller.setDistributionEnd(BigNumber.from(current).add(7776000)); //90 days
    console.log('Emission configured');

    console.log(`\tFinished StakedTokenV3 deployment`);
  });
