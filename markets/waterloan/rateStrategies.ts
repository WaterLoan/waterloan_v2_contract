import BigNumber from 'bignumber.js';
import { oneRay } from '../../helpers/constants';
import { IInterestRateStrategyParams } from '../../helpers/types';

// USDT
export const rateStrategyUSDT: IInterestRateStrategyParams = {
  name: "rateStrategyUSDT",
  optimalUtilizationRate: new BigNumber(0.80).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(0.6).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(0.6).multipliedBy(oneRay).toFixed(),
}

// USDC
export const rateStrategyUSDC: IInterestRateStrategyParams = {
  name: "rateStrategyUSDC",
  optimalUtilizationRate: new BigNumber(0.80).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(0.6).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(0.6).multipliedBy(oneRay).toFixed(),
}

// DAI
export const rateStrategyDAI: IInterestRateStrategyParams = {
  name: "rateStrategyDAI",
  optimalUtilizationRate: new BigNumber(0.80).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(0.75).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(0.75).multipliedBy(oneRay).toFixed(),
}

// WCET
export const rateStrategyWCET: IInterestRateStrategyParams = {
  name: "rateStrategyWCET",
  optimalUtilizationRate: new BigNumber(0.65).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.07).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(3).multipliedBy(oneRay).toFixed(),
}

// ONES
export const rateStrategyONES: IInterestRateStrategyParams = {
  name: "rateStrategyONES",
  optimalUtilizationRate: new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(5).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(5).multipliedBy(oneRay).toFixed(),
}

// IFT
export const rateStrategyIFT: IInterestRateStrategyParams = {
  name: "rateStrategyIFT",
  optimalUtilizationRate: new BigNumber(0.45).multipliedBy(oneRay).toFixed(),
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  variableRateSlope1: new BigNumber(0.08).multipliedBy(oneRay).toFixed(),
  variableRateSlope2: new BigNumber(5).multipliedBy(oneRay).toFixed(),
  stableRateSlope1: new BigNumber(0.1).multipliedBy(oneRay).toFixed(),
  stableRateSlope2: new BigNumber(5).multipliedBy(oneRay).toFixed(),
}
