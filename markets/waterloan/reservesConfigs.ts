import { eContractid, IReserveParams } from '../../helpers/types';

import { 
  rateStrategyUSDT,
  rateStrategyUSDC,
  rateStrategyDAI,
  rateStrategyWCET,
  rateStrategyONES,
  rateStrategyIFT,
} from './rateStrategies';

export const strategyUSDT: IReserveParams = {
  strategy: rateStrategyUSDT,
  baseLTVAsCollateral: '6000',
  liquidationThreshold: '6500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000'
};

export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyUSDC,
  baseLTVAsCollateral: '8000',
  liquidationThreshold: '8500',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000'
};

export const strategyDAI: IReserveParams = {
  strategy: rateStrategyDAI,
  baseLTVAsCollateral: '7500',
  liquidationThreshold: '8000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1000'
};

export const strategyWCET: IReserveParams = {
  strategy: rateStrategyWCET,
  baseLTVAsCollateral: '5000',
  liquidationThreshold: '6000',
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1500'
};

export const strategyONES: IReserveParams = {
  strategy: rateStrategyONES,
  baseLTVAsCollateral: '3000',
  liquidationThreshold: '4500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1500'
};

export const strategyIFT: IReserveParams = {
  strategy: rateStrategyIFT,
  baseLTVAsCollateral: '3000',
  liquidationThreshold: '4500',
  liquidationBonus: '11000',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '18',
  aTokenImpl: eContractid.AToken,
  reserveFactor: '1500'
};
