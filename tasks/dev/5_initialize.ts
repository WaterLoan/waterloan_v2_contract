import { task } from 'hardhat/config';
import {
  deployLendingPoolCollateralManager,
  deployMockFlashLoanReceiver,
  deployWalletBalancerProvider,
  deployAaveProtocolDataProvider,
  authorizeWETHGateway,
  deployTokenIncentivesController,
} from '../../helpers/contracts-deployments';
import { getParamPerNetwork } from '../../helpers/contracts-helpers';
import { eNetwork } from '../../helpers/types';
import {
  ConfigNames,
  getReservesConfigByPool,
  getTreasuryAddress,
  loadPoolConfig,
} from '../../helpers/configuration';

import { tEthereumAddress, AavePools, eContractid } from '../../helpers/types';
import { waitForTx, filterMapBy, notFalsyOrZeroAddress } from '../../helpers/misc-utils';
import { configureReservesByHelper, initReservesByHelper } from '../../helpers/init-helpers';
import { getAllTokenAddresses } from '../../helpers/mock-helpers';
import { ZERO_ADDRESS } from '../../helpers/constants';
import {
  getAllMockedTokens,
  getLendingPoolAddressesProvider,
  getWETHGateway,
  getTokenIncentivesController,
} from '../../helpers/contracts-getters';
import { insertContractAddressInDb } from '../../helpers/contracts-helpers';

task('dev:initialize-lending-pool', 'Initialize lending pool configuration.')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .addParam('pool', `Pool name to retrieve configuration, supported: ${Object.values(ConfigNames)}`)
  .setAction(async ({ verify, pool }, localBRE) => {
    await localBRE.run('set-DRE');
    const network = <eNetwork>localBRE.network.name;
    const poolConfig = loadPoolConfig(pool);
    const {
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      WethGateway,
      IncentivesController,
    } = poolConfig;
    const mockTokens = await getAllMockedTokens();
    const allTokenAddresses = getAllTokenAddresses(mockTokens);

    const addressesProvider = await getLendingPoolAddressesProvider();

    const protoPoolReservesAddresses = <{ [symbol: string]: tEthereumAddress }>(
      filterMapBy(allTokenAddresses, (key: string) => !key.includes('UNI_'))
    );

    const testHelpers = await deployAaveProtocolDataProvider(addressesProvider.address, verify);

    const reservesParams = getReservesConfigByPool(AavePools.waterloan);

    const admin = await addressesProvider.getPoolAdmin();

    let treasuryAddress = await getTreasuryAddress(poolConfig);
    // Default address for testing in hardhat node
    if (pool == ConfigNames.Waterloan && treasuryAddress == undefined) {
      console.log("==== Use hard-coded treasuryAddress for hardhat node testing ====");
      treasuryAddress = "0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10";
    }

    await localBRE.run('deploy-incentives', { mock: true });
    let controller = await getTokenIncentivesController();
    let incentivesController = controller.address;

    await initReservesByHelper(
      reservesParams,
      protoPoolReservesAddresses,
      ATokenNamePrefix,
      StableDebtTokenNamePrefix,
      VariableDebtTokenNamePrefix,
      SymbolPrefix,
      admin,
      treasuryAddress,
      incentivesController,
      verify
    );
    await configureReservesByHelper(reservesParams, protoPoolReservesAddresses, testHelpers, admin);

    await localBRE.run('config-emissions');

    const collateralManager = await deployLendingPoolCollateralManager(verify);
    await waitForTx(
      await addressesProvider.setLendingPoolCollateralManager(collateralManager.address)
    );

    const mockFlashLoanReceiver = await deployMockFlashLoanReceiver(
      addressesProvider.address,
      verify
    );
    await insertContractAddressInDb(
      eContractid.MockFlashLoanReceiver,
      mockFlashLoanReceiver.address
    );

    await deployWalletBalancerProvider(verify);

    await insertContractAddressInDb(eContractid.AaveProtocolDataProvider, testHelpers.address);

    const lendingPoolAddress = await addressesProvider.getLendingPool();

    let gateway = getParamPerNetwork(WethGateway, network);
    if (!notFalsyOrZeroAddress(gateway)) {
      gateway = (await getWETHGateway()).address;
    }
    await authorizeWETHGateway(gateway, lendingPoolAddress);
  });
