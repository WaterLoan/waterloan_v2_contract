import { task } from 'hardhat/config';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { ICommonConfiguration, eNetwork } from '../../helpers/types';
import { waitForTx } from '../../helpers/misc-utils';
import { loadPoolConfig, ConfigNames } from '../../helpers/configuration';
import { initIncentiveController } from '../../helpers/init-helpers';
import { deployPriceOracle, deployMockAggregator } from '../../helpers/contracts-deployments';

task('deploy-mock-aggregators', 'Deploy MockAggregators')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ pool }, DRE) => {
    await DRE.run('set-DRE');
    const network = <eNetwork>DRE.network.name;

    const verify = false;
    const poolConfig = loadPoolConfig(pool);
    const {
      ProtocolGlobalParams: { MockUsdPriceInWei, UsdAddress },
      ReserveAssets,
      Mocks: { AllAssetsInitialPrices },
    } = poolConfig as ICommonConfiguration;
    const reserveAssets = await getParamPerNetwork(ReserveAssets, network);

    const tokensAddress = {
      ...reserveAssets,
      USD: UsdAddress,
    };

    const fallbackOracle = await deployPriceOracle(verify);
    await waitForTx(await fallbackOracle.setEthUsdPrice(MockUsdPriceInWei));

    for (const [symbol, address] of Object.entries(tokensAddress) as [string, string][]) {
      let price = AllAssetsInitialPrices[symbol];
      console.log(`Set price of ${symbol}(${address}) to ${price} `);
      await waitForTx(await fallbackOracle.setAssetPrice(address, price));
      await deployMockAggregator(price, verify);
    }

  });