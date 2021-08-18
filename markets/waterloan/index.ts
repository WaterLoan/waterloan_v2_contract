import { oneRay, ZERO_ADDRESS } from '../../helpers/constants';
import { IWaterloanConfiguration, eEthereumNetwork } from '../../helpers/types';

import { CommonsConfig } from './commons';
import {
  strategyUSDT,
  strategyUSDC,
  strategyDAI,
  strategyWCET,
  strategyONES,
  strategyIFT,
} from './reservesConfigs';

// ----------------
// POOL--SPECIFIC PARAMS
// ----------------

export const WaterloanConfig: IWaterloanConfiguration = {
  ...CommonsConfig,
  MarketId: 'Aave Waterloan market',
  ProviderId: 1,
  ReservesConfig: {
    USDT: strategyUSDT,
    USDC: strategyUSDC,
    DAI: strategyDAI,
    WCET: strategyWCET,
    ONES: strategyONES,
    IFT: strategyIFT,
  },
  ReserveAssets: {
    [eEthereumNetwork.buidlerevm]: {},
    [eEthereumNetwork.hardhat]: {},
    [eEthereumNetwork.coverage]: {},
    [eEthereumNetwork.kovan]: {},
    [eEthereumNetwork.ropsten]: {
      USDT: '0xaca4c863dFeAC178d206932f0Dca330649A50f31',
      USDC: '0xF62915Ee8C6a233b5Ef0E7Fe123aD772C7FC09A0',
      DAI: '0x1570BFc5273F66f5B2711f7ec0eAF4Be444e8621',
      WCET: '0x9A374E27A53c3fd2344251CBBa0513D72d72f66b',
      ONES: '0x3C6E1683Fe81cf46e61aC0c141A9A7176B48E880',
      IFT: '0x5b82789D38DCa5b60874D0379D1Fb1cFdAFFb5f7',
    },
    [eEthereumNetwork.main]: {
      USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
      IFT: '0x2731d151CBDf84A8A4C6d9D0BaE74012Db51E428',
      CET: '0x081f67afa0ccf8c7b17540767bbe95df2ba8d97f',
      ONES: '0x0b342c51d1592c41068d5d4b4da4a68c0a04d5a4',
    },
    [eEthereumNetwork.tenderlyMain]: {
      USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
      IFT: '0x2731d151CBDf84A8A4C6d9D0BaE74012Db51E428',
      CET: '0x081f67afa0ccf8c7b17540767bbe95df2ba8d97f',
      ONES: '0x0b342c51d1592c41068d5d4b4da4a68c0a04d5a4',
    },
    [eEthereumNetwork.coinexTest]: {
      USDT: '0xFC4F6E92143621D1ff144C1ff5b7f14ec53535A1',
      USDC: '0x6bb92A5E17e28E9D3f7Eb2B58E9DA4E5278Da0bC',
      DAI: '0xbf0A736F6107D10fCE53d056C95fD73d266283Bb',
      WCET: '0xeEDEEB1fCa6749FaCF0f3326C2B170a3D602bA97',
      ONES: '0x6db1736656Ed09cAC5957d7B14e703e6268D1337',
      IFT: '0xFAc4efD2C26D8ecB63437827B5F79D661DDc0e4c',
    },
    [eEthereumNetwork.coinex]: {
      USDT: '',
      USDC: '',
      DAI: '',
      WCET: '',
      ONES: '',
      IFT: '',
    },
  },
};

export default WaterloanConfig;
