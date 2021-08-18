# WaterLoan V2

WaterLoan bank protocol on ethereum and CSC

## Interact

### Start docker and run bash

```
# Start docker
docker-compose up
# Use bash in docker
docker-compose run contracts-env bash
```

### Commands

```
# Running hardhat node
npm run local:node

# Start hardhat local console
npm run local:console

# Running tests
npm run test

# Migrate dev on local node
npm run local:dev

# Send test tokens to address
npm run local:tokens <your address here>

# Deploy mock aggregators and price oracle
npm run coinexTest:hardhat deploy-mock-aggregators -- --pool Waterloan
```

### Commands in Console

```
// Run migration of waterloan:dev
await run('waterloan:dev')

// Send test tokens to address
await run('your-custom-task');
await run('send-test-tokens', { address: 'your address here' });

// After you initialize the HRE via 'set-DRE' task, you can import any TS/JS file
run('set-DRE');

// Import contract getters to retrieve an Ethers.js Contract instance
const getters = require('./helpers/contracts-getters'); // Import a TS/JS file

// Get signer which represents account in Ethers
const signer = await ethers.provider.getSigner();

// Get token contract
const TOKEN = await getters.getIErc20Detailed(tokenAddress);

// Lending pool instance
const lendingPool = await getters.getLendingPool();

// Deposit 1000 TOKEN with approval
await TOKEN.approve(lendingPool.address, ethers.utils.parseUnits('1000'));
await lendingPool.connect(signer).deposit(TOKEN.address, ethers.utils.parseUnits('100'), await signer.getAddress(), '0');

// Query incentives
const controller = await getters.getTokenIncentivesController();
let reward = await controller.getUserUnclaimedRewards(await signer.getAddress());
ethers.utils.formatEther(reward);
```

## Configuration

Every market have one `LendingPoolAddressProvider` and there are only one `LendingPoolAddressProviderRegistry` which record registers across all markets.

### Admin and contracts address

Located at `markets/xxx/commons.ts`

* `PoolAdmin` can operate LendingPoolConfigurator which will invoke LendingPool sometimes. Default to `accounts[0]`
* `EmergencyAdmin` can pause all operations of LendingPool including transfer of aToken. Default to `accounts[1]`
* `ReserveFactorTreasuryAddress` reserve token will go to this address
* `ChainlinkAggregator` aggregator address of according token

Located at `markets/xxx/index.ts`

* `ReserveConfig` configuration of reserve interest rate strategy
* `ReserveAssets` token contract addresses

Located at `markets/xxx/reservesConfigs.ts`

* LTV
* liquidation bonus and threshold

etc.

Check parameters section below for more detail.

### Oracles

There are two types of oracle supported in this protocol. PriceOracle for accessing asset price and LendingRateOracle for accessing average market borrow rate to be used as a base for the stable borrow rate calculations. By default, there will be mock LendingRateOracle which has initial lending rates based on configuration of `LendingRateOracleRatesCommon` section in `markets/waterloan/common.ts`. 

For every token supported in reserve, we need a oracle for it. If there are no existed ChainlinkAggregator for it, then we need to set up an ChainLink node and deploy our own according oracles on it.

#### Set up ChainLink node

[Doc](https://docs.chain.link/chainlink-nodes/)

* Running ChainLink node
* Deploy Oracle
* Add job to node which descibe when to initiate and what to do. Can define minPayment requirement for LINK token.
* Test request to Oracle

### Add new reserve with new token 

* Risk evaluate based on [this](https://docs.aave.com/risk/asset-risk/methodology)
* Prepare ChainLink price feeds

#### Parameters

[Borrow Interest Rate](https://docs.aave.com/risk/liquidity-risk/borrow-interest-rate)

```
// rateStrategies.ts
// USDC USDT
export const rateStrategyStableThree: IInterestRateStrategyParams = {
  name: "rateStrategyStableThree",
  //  90%
  optimalUtilizationRate: new BigNumber(0.9).multipliedBy(oneRay).toFixed(),
  //   0%
  baseVariableBorrowRate: new BigNumber(0).multipliedBy(oneRay).toFixed(),
  //   4%
  variableRateSlope1: new BigNumber(0.04).multipliedBy(oneRay).toFixed(),
  //  60%
  variableRateSlope2: new BigNumber(0.60).multipliedBy(oneRay).toFixed(),
  //   2%
  stableRateSlope1: new BigNumber(0.02).multipliedBy(oneRay).toFixed(),
  //  60%
  stableRateSlope2: new BigNumber(0.60).multipliedBy(oneRay).toFixed(),
}

// reservesConfigs.ts
export const strategyUSDC: IReserveParams = {
  strategy: rateStrategyStableThree,
  //  80%
  baseLTVAsCollateral: '8000',
  //  85%
  liquidationThreshold: '8500',
  // 105%
  // repay 100 debt and got 105 collateral
  liquidationBonus: '10500',
  borrowingEnabled: true,
  stableBorrowRateEnabled: true,
  reserveDecimals: '6',
  aTokenImpl: eContractid.AToken,
  //  10%
  // Everytime reserve update state, 10% of totalDebt will mint to treasury account
  reserveFactor: '1000'
};
```

#### Deploy contracts

> Prepare aToken, DebtToken, InterestRateStrategy(with configuration of risk parameters) contracts. [Ref](https://docs.aave.com/developers/protocol-governance/governance/propose-your-token-as-new-aave-asset)

* add your token addresses to markets/aave/index.ts 
* create your reserve parameters inside markets/aave/reservesConfigs.ts 
* update the types to include your token in /helpers/types 
* add the current price in the MOCK_CHAINLINK_AGGREGATORS_PRICES object in markets/aave/commons.ts 
* SYMBOL="Your Symbol" npm run external:deploy-assets-main to deploy on mainnet

#### Initiate reserve

* Invoke function below with according parameters

`LendingPoolConfigurator.batchInitReserver (onlyPoolAdmin)` which invoke `LendingPoolConfigurator._initReserver (internal)` which invoke `LendingPool.initReserver (onlyPoolConfigurator)`.

## AAVE Mechanics

### AAVE distribution

[AIP 1: LEND/AAVE migration and activation of the Safety Module](https://aave.github.io/aip/AIP-1/) mint 13M AAVE to LendToAaveMigrator contract, and mint 3M AAVE to IncentiveVault.

[Economy Reserve (IncentiveVault)](https://etherscan.io/address/0x25f2226b597e8f9514b3f68f00f494cf4f286491), [3M AAVE](https://etherscan.io/address/0x25f2226b597e8f9514b3f68f00f494cf4f286491#code#F1#L99) are minted to the incentives vault, and it [approved](https://etherscan.io/address/0x25f2226b597e8f9514b3f68f00f494cf4f286491#code#F1#L109) stkAAVE(Safety Module) to pull AAVE funds to distribute as incentives.

Safety Module (stkAAVE, stkBPT in Insurance Pool), stake AAVE or AAVE-ETH (LP token 80/20 AAVE/ETH Balancer) to acure interest from ecosystem reserve, used as insurance. 

[Economy Collector](https://etherscan.io/address/0x464c71f6c2f760dda6093dcb91c24c39e5d6e18c), allocates a share of the protocol's interests, used to sustain the DAO and pay protocol contributors.

### AAVE incentive

[AIP 16: introduce Liquidity Incentives for Aave v2](https://aave.github.io/aip/AIP-16/) Distribute 2,200 stkAAVE daily from the Ecosystem Reserve to borrowers and lenders. 

[Detailed proposal code](https://etherscan.io/address/0x5778DAee2a634acd303dC9dC91e58D57C8FFfcC8#code#F1#L1)

[StakedTokenIncentivesController.sol](https://etherscan.io/address/0x83d055d382f25e6793099713505c68a5c7535a35#code#F1#L1)
