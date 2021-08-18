// SPDX-License-Identifier: agpl-3.0
pragma solidity >=0.4.22 <=0.6.12;

import {WETH9} from '../dependencies/weth/WETH9.sol';

contract WCET9Mocked is WETH9 {

  constructor() public {
    name = 'Wrapped CET';
    symbol = 'WCET';
  }

  // Mint not backed by CET: only for testing purposes
  function mint(uint256 value) public returns (bool) {
    balanceOf[msg.sender] += value;
    emit Transfer(address(0), msg.sender, value);
  }
}