import { task } from 'hardhat/config';
import { initIncentiveController } from '../../helpers/init-helpers';
import { getFirstSigner } from '../../helpers/contracts-getters';
import { deployMintableERC20 } from '../../helpers/contracts-deployments';

task('deploy-incentives', 'Deploy IncentivesVault and IncentivesController')
  .addFlag('mock', 'Deploy and use mock reward token')
  .addOptionalParam('address', `Address of reward token`, '')
  .setAction(async ({ mock, address }, localBRE) => {
    await localBRE.run('set-DRE');

    let rewardTokenAddress = address;
    if (mock) {
      let mockToken = await deployMintableERC20(['WAT', 'WAT', '18']);
      const amount = localBRE.ethers.utils.parseEther('3000000');
      await mockToken.mint(amount);
      rewardTokenAddress = mockToken.address;
    } else {
      if (address == '') {
        console.log('Empty reward token address !');
        return;
      }
    }

    // Config incentives
    const admin = await getFirstSigner();
    await initIncentiveController(rewardTokenAddress, (await admin.getAddress())); // WAT token

  });