import BigNumber from 'bignumber.js';
import {
  oneEther,
  oneRay,
  RAY,
  ZERO_ADDRESS,
  WATERLOAN_MOCK_CHAINLINK_AGGREGATORS_PRICES,
} from '../../helpers/constants';
import { ICommonConfiguration, eEthereumNetwork } from '../../helpers/types';

// ----------------
// PROTOCOL GLOBAL PARAMS
// ----------------

export const CommonsConfig: ICommonConfiguration = {
  MarketId: 'Commons',
  ATokenNamePrefix: 'Waterloan interest bearing',
  StableDebtTokenNamePrefix: 'Waterloan stable debt bearing',
  VariableDebtTokenNamePrefix: 'Waterloan variable debt bearing',
  SymbolPrefix: '',
  ProviderId: 0, // Overriden in index.ts
  ProtocolGlobalParams: {
    TokenDistributorPercentageBase: '10000',
    MockUsdPriceInWei: '216383403311',
    UsdAddress: '0x10F7Fc1F91Ba351f9C629c5947AD69bD03C05b96',
    NilAddress: '0x0000000000000000000000000000000000000000',
    OneAddress: '0x0000000000000000000000000000000000000001',
    AaveReferral: '0',
  },

  // ----------------
  // COMMON PROTOCOL PARAMS ACROSS POOLS AND NETWORKS
  // ----------------

  Mocks: {
    AllAssetsInitialPrices: {
      ...WATERLOAN_MOCK_CHAINLINK_AGGREGATORS_PRICES,
    },
  },
  // TODO: reorg alphabetically, checking the reason of tests failing
  LendingRateOracleRatesCommon: {
    WCET: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    DAI: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    USDC: {
      borrowRate: oneRay.multipliedBy(0.039).toFixed(),
    },
    USDT: {
      borrowRate: oneRay.multipliedBy(0.035).toFixed(),
    },
    IFT: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
    ONES: {
      borrowRate: oneRay.multipliedBy(0.03).toFixed(),
    },
  },
  // ----------------
  // COMMON PROTOCOL ADDRESSES ACROSS POOLS
  // ----------------

  // If PoolAdmin/emergencyAdmin is set, will take priority over PoolAdminIndex/emergencyAdminIndex
  PoolAdmin: {
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.hardhat]: undefined,
    [eEthereumNetwork.kovan]: undefined,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderlyMain]: undefined,
    [eEthereumNetwork.coinexTest]: undefined,
    [eEthereumNetwork.coinex]: undefined,
  },
  PoolAdminIndex: 0,
  EmergencyAdmin: {
    [eEthereumNetwork.hardhat]: undefined,
    [eEthereumNetwork.coverage]: undefined,
    [eEthereumNetwork.buidlerevm]: undefined,
    [eEthereumNetwork.kovan]: undefined,
    [eEthereumNetwork.ropsten]: undefined,
    [eEthereumNetwork.main]: undefined,
    [eEthereumNetwork.tenderlyMain]: undefined,
    [eEthereumNetwork.coinexTest]: undefined,
    [eEthereumNetwork.coinex]: undefined,
  },
  EmergencyAdminIndex: 1,
  ProviderRegistry: {
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0xA974224082dda44fB1F37EDb9d48392d076dF29f',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0x113E7aD783deaaf6A4edc75F2909a950bC02980B',
    [eEthereumNetwork.coinex]: '',
  },
  ProviderRegistryOwner: {
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0xA4ff8Eb9F7331C2E93E60c5a2Cf5D694AC0f2811',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0xA4ff8Eb9F7331C2E93E60c5a2Cf5D694AC0f2811',
    [eEthereumNetwork.coinex]: '',
  },
  LendingRateOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x84e4CA98df0112d334Feb96D3803E90b1F82Bf6B',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0x1EC94eaa91b7CFb2DeB61591137D657AEcc41e0E',
    [eEthereumNetwork.coinex]: '',
  },
  LendingPoolCollateralManager: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  LendingPoolConfigurator: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  LendingPool: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  WethGateway: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  TokenDistributor: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  AaveOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x06e8FCa22f642E634844a2C271CFA2431b636A80',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0x5800C93468F7B9bCa96ee8B123AC4E4cA2ecD78D',
    [eEthereumNetwork.coinex]: '',
  },
  FallbackOracle: {
    [eEthereumNetwork.coverage]: '',
    [eEthereumNetwork.hardhat]: '',
    [eEthereumNetwork.buidlerevm]: '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x2963797bd8880Ee71BD3B217D348cE13f7d67731',
    [eEthereumNetwork.main]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
    [eEthereumNetwork.coinexTest]: '0xAc40eb847001Cf2058fA5Ce11AeaB4ff30D32570',
    [eEthereumNetwork.coinex]: '',
  },
  ChainlinkAggregator: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: {
      USDC: '0x193862b5221eF4aF5400f203136A1b7c0b37D5ca',
      USDT: '0xF86a5789914A02B3901e19c88Be9e7298b215EdA',
      DAI: '0xaA44Abfc8F235CBC41bd3AfeC51A8bBCd773679C',
      WCET: '0x1Cf43a2aac63701A008796A0d1d827091F03b939',
      ONES: '0x83Aa329f2A76C5227755854a9708cAE2C0eB24a7',
      IFT: '0xFa8BA8D71BD85d09719Ca1c9603214360010bCf8',
      USD: '0xfA8d507460dc9D12ec1B247A29964b36E4092D74',
    },
    [eEthereumNetwork.main]: {},
    [eEthereumNetwork.tenderlyMain]: {},
    [eEthereumNetwork.coinexTest]: {
      USDC: '0xe44Fe08cfe7635BfD310202EBA3Cb053e8070B2A',
      USDT: '0x6d937B0F537fE26192f9bd36D1C52A2a3DD75997',
      DAI: '0xc031De80e177fe0b28B5126BF35D589b5666F304',
      WCET: '0x334c55c3ECBc35119d4647c27aa067572a43dfa2',
      ONES: '0x31d2D3553C34A3b7Dc98aE9597f2027599fF7161',
      IFT: '0x41B97192132E38295B40d26e20e5f4b79fb23281',
      USD: '0x53Bb503121c9E692b27747856048524a7704a9C7',
    },
    [eEthereumNetwork.coinex]: {},
  },
  ReserveAssets: {
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.main]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: {},
    [eEthereumNetwork.tenderlyMain]: {},
    [eEthereumNetwork.coinexTest]: {},
    [eEthereumNetwork.coinex]: {},
  },
  ReservesConfig: {},
  ATokenDomainSeparator: {
    [eEthereumNetwork.coverage]:
      '',
    [eEthereumNetwork.hardhat]:
      '',
    [eEthereumNetwork.buidlerevm]:
      '',
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '',
    [eEthereumNetwork.coinex]: '',
  },
  WETH: {
    [eEthereumNetwork.coverage]: '', // deployed in local evm
    [eEthereumNetwork.hardhat]: '', // deployed in local evm
    [eEthereumNetwork.buidlerevm]: '', // deployed in local evm
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x5FC1cF152c7F0baBA32de88BaCec43916527d7c4',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0xeEDEEB1fCa6749FaCF0f3326C2B170a3D602bA97',
    [eEthereumNetwork.coinex]: '',
  },
  WrappedNativeToken: {
    [eEthereumNetwork.coverage]: '', // deployed in local evm
    [eEthereumNetwork.hardhat]: '', // deployed in local evm
    [eEthereumNetwork.buidlerevm]: '', // deployed in local evm
    [eEthereumNetwork.kovan]: '',
    [eEthereumNetwork.ropsten]: '0x5FC1cF152c7F0baBA32de88BaCec43916527d7c4',
    [eEthereumNetwork.main]: '',
    [eEthereumNetwork.tenderlyMain]: '',
    [eEthereumNetwork.coinexTest]: '0xeEDEEB1fCa6749FaCF0f3326C2B170a3D602bA97',
    [eEthereumNetwork.coinex]: '',
  },
  ReserveFactorTreasuryAddress: {
    [eEthereumNetwork.coverage]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.hardhat]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.buidlerevm]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.kovan]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.ropsten]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.main]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.tenderlyMain]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.coinexTest]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
    [eEthereumNetwork.coinex]: '0x6bf0cA6f3DAf1C29063eff4CEBDCaa0f17B02D10',
  },
  IncentivesController: {
    [eEthereumNetwork.coverage]: ZERO_ADDRESS,
    [eEthereumNetwork.hardhat]: ZERO_ADDRESS,
    [eEthereumNetwork.buidlerevm]: ZERO_ADDRESS,
    [eEthereumNetwork.kovan]: ZERO_ADDRESS,
    [eEthereumNetwork.ropsten]: '0xc4eB4E9FdAE91fcc1a4f98f54903d89AFF82cf29',
    [eEthereumNetwork.main]: ZERO_ADDRESS,
    [eEthereumNetwork.tenderlyMain]: ZERO_ADDRESS,
    [eEthereumNetwork.coinexTest]: '0x516971C2bA13285B7ef8948fcB31252139325E96',
    [eEthereumNetwork.coinex]: ZERO_ADDRESS,
  },
};
