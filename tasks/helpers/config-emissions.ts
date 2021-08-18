import { task } from 'hardhat/config';
import { getLendingPool, getTokenIncentivesController } from '../../helpers/contracts-getters';
import { BigNumber, utils } from 'ethers';

task('config-emissions', 'Configurate emissions of IncentivesController')
  .setAction(async ({ _ }, localBRE) => {
    await localBRE.run('set-DRE');

    const lendingPool = await getLendingPool();

    const reserves = await lendingPool.getReservesList();

    const assets: string[] = [];
    const emissions: BigNumber[] = [];
    for (let i = 0; i < reserves.length; i++) {
      let address = reserves[i];
      let data = await lendingPool.getReserveData(address);

      assets.push(data.aTokenAddress);
      emissions.push(utils.parseEther('0.002'));
      assets.push(data.variableDebtTokenAddress);
      emissions.push(utils.parseEther('0.001'));
      console.log(`Push aToken and vDebtToken of reserve ${address}`);
    }

    let controller = await getTokenIncentivesController();
    // Config emissions
    await controller.configureAssets(assets, emissions);
    let current = Math.floor(Date.now() / 1000);
    await controller.setDistributionEnd(BigNumber.from(current).add(7776000)); //90 days
  });