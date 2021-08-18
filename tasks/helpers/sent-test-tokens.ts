import { task } from 'hardhat/config';
import {
  getFirstSigner,
  getAllMockedTokens,
} from '../../helpers/contracts-getters';
import { DRE } from '../../helpers/misc-utils';
import { utils } from 'ethers';

task('send-test-tokens', 'Mint and transfer various test tokens to designated address')
  .addParam('address', 'to which address we transfer')
  .addOptionalParam("amount", "amount of token will be transfer", "10000")
  .setAction(async ({ address, amount }, localBRE) => {
    await localBRE.run('set-DRE');

    const units = utils.parseUnits(amount);
    const signer = await getFirstSigner();

    const mockTokens = await getAllMockedTokens();
    console.log(`Sending tokens to ${address}`);

    const entries = Object.entries(mockTokens);
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      let symbol = entry[0];
      let token = entry[1];
      await token.connect(signer).mint(units);
      await token.connect(signer).transfer(address, units);
      console.log(`Sent ${amount} ${symbol}(${token.address})`);
    }
  });
