/**
 * Test for MADANA PAX token
 *
 */

import {expectThrow, getEvents, ZERO_ADDRESS, ZERO} from '../../helpers/tools';
const {BN, should} = require('openzeppelin-test-helpers');

const cnf = require('../../../config/contract.json');
const MADANA = artifacts.require('./MADANA/MADANA.sol');
const ERC20Token = artifacts.require('./mocks/ERC20Token.sol');

/**
 * MADANA contract
 */
contract('MADANA', ([deployer, owner, holder1, holder2, anotherAccount]) => {
  // owner account as a placeholder in MADANA.sol to be replaced for deployment
  console.log('owner account: ' + owner);

  const {NAME, SYMBOL} = cnf;
  const DECIMALS = new BN(cnf.DECIMALS);
  const INITIAL_BALANCE = new BN(cnf.INITIAL_BALANCE);
  const ONE = new BN('1');
  const TWO = new BN('2');

  let tokenInstance;
  let ownerBalance;

  describe('deployment', () => {
    it('deploys sucessfully', async () => {
      tokenInstance = await MADANA.deployed();

      assert.isDefined(tokenInstance);
    });
  });

  describe('when instantiated', () => {
    it('has the right name', async () => {
      (await tokenInstance.name()).should.be.equal(NAME);
    });
    it('has the right symbol', async () => {
      (await tokenInstance.symbol()).should.be.equal(SYMBOL);
    });
    it('has the right decimals', async () => {
      (await tokenInstance.decimals()).should.be.bignumber.equal(DECIMALS);
    });
    it('has the right total supply', async () => {
      (await tokenInstance.totalSupply()).should.be.bignumber.equal(INITIAL_BALANCE);
    });
    it('has the right owner', async () => {
      (await tokenInstance.isOwner({from: owner})).should.equal(true);
    });
  });

  describe('transfer', () => {
    context('when the sender does not have enough balance', () => {
      it('checks right balance', async () => {
        (await tokenInstance.balanceOf(owner)).should.be.a.bignumber.that.equals(INITIAL_BALANCE);
      });

      it('fails', async () => {
        const sendAmout = INITIAL_BALANCE.add(ONE);
        await expectThrow(tokenInstance.transfer(holder1, sendAmout, {from: owner}));

        (await tokenInstance.balanceOf(holder1)).should.be.a.bignumber.that.equals(ZERO);
      });
    });

    context('when the sender has enough balance', () => {
      context('when recipient is zero address', () => {
        it('fails', async () => {
          await expectThrow(tokenInstance.transfer(ZERO_ADDRESS, TWO, {from: owner}));

          (await tokenInstance.balanceOf(ZERO_ADDRESS)).should.be.a.bignumber.that.equals(ZERO);
        });
      });

      context('when recipient is different to zero address', () => {
        let tx;

        before(async () => {
          tx = await tokenInstance.transfer(holder1, TWO, {from: owner});
        });

        it('transfers requested amount', async () => {
          ownerBalance = INITIAL_BALANCE.sub(TWO);
          (await tokenInstance.balanceOf(owner)).should.be.a.bignumber.that.equals(ownerBalance);
          (await tokenInstance.balanceOf(holder1)).should.be.a.bignumber.that.equals(TWO);
        });

        it('emits a Transfer event', async () => {
          const events = getEvents(tx, 'Transfer');

          events[0].from.should.be.equal(owner);
          events[0].to.should.be.equal(holder1);
          events[0].value.should.be.a.bignumber.that.equals(TWO);
        });
      });
    });
  });

  describe('approve', () => {
    context('when spender is zero address', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.approve(ZERO_ADDRESS, ONE, {from: holder1}));

        (await tokenInstance.allowance(holder1, ZERO_ADDRESS)).should.be.a.bignumber.that.equals(ZERO);
      });
    });

    context('when spender is different to zero address', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.approve(anotherAccount, ONE, {from: holder1});
      });

      it('approves the requested amount', async () => {
        (await tokenInstance.allowance(holder1, anotherAccount)).should.be.a.bignumber.that.equals(ONE);
      });

      it('emits an Approval event', async () => {
        const events = getEvents(tx, 'Approval');
        events[0].owner.should.be.equal(holder1);
        events[0].spender.should.be.equal(anotherAccount);
        events[0].value.should.be.a.bignumber.that.equals(ONE);
      });
    });
  });

  describe('transferFrom', () => {
    context('when spender does not have enough approved balance', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.transferFrom(holder1, holder2, TWO, {from: anotherAccount}));
      });
    });

    context('when spender has enough approved balance', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.transferFrom(holder1, holder2, ONE, {from: anotherAccount});
      });

      it('updates allowance', async () => {
        (await tokenInstance.allowance(holder1, anotherAccount)).should.be.a.bignumber.that.equals(ZERO);
      });

      it('transfers the requested amount', async () => {
        (await tokenInstance.balanceOf(holder1)).should.be.a.bignumber.that.equals(ONE);
        (await tokenInstance.balanceOf(holder2)).should.be.a.bignumber.that.equals(ONE);
      });

      it('emits a transfer event', async () => {
        const events = getEvents(tx, 'Transfer');
        events[0].from.should.be.equal(holder1);
        events[0].to.should.be.equal(holder2);
        events[0].value.should.be.a.bignumber.that.equals(ONE);
      });
    });
  });

  describe('increaseAllowance', () => {
    context('when spender is zero address', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.increaseAllowance(ZERO_ADDRESS, ONE, {from: holder1}));
      });
    });

    context('when spender is different to zero address', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.increaseAllowance(anotherAccount, ONE, {from: holder1});
      });

      it('increases allowance', async () => {
        (await tokenInstance.allowance(holder1, anotherAccount)).should.be.a.bignumber.that.equals(ONE);
      });

      it('emits an Approval event', async () => {
        const events = getEvents(tx, 'Approval');
        events[0].owner.should.be.equal(holder1);
        events[0].spender.should.be.equal(anotherAccount);
        events[0].value.should.be.a.bignumber.that.equals(ONE);
      });
    });
  });

  describe('decreaseAllowance', () => {
    context('when spender is zero address', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.decreaseAllowance(ZERO_ADDRESS, ONE, {from: holder1}));
      });
    });

    context('when spender is different to zero address', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.decreaseAllowance(anotherAccount, ONE, {from: holder1});
      });

      it('decreases allowance', async () => {
        (await tokenInstance.allowance(holder1, anotherAccount)).should.be.a.bignumber.that.equals(ZERO);
      });

      it('emits an Approval event', async () => {
        const events = getEvents(tx, 'Approval');
        events[0].owner.should.be.equal(holder1);
        events[0].spender.should.be.equal(anotherAccount);
        events[0].value.should.be.a.bignumber.that.equals(ZERO);
      });
    });
  });

  describe('burn', () => {
    context('when called by a non-owner account', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.burn(ONE, {from: holder1}));
      });
    });

    context('when called by the owner account', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.burn(ONE, {from: owner});
      });

      it('burns the requested amount', async () => {
        ownerBalance = ownerBalance.sub(ONE);
        (await tokenInstance.totalSupply()).should.be.a.bignumber.that.equals(INITIAL_BALANCE.sub(ONE));
        (await tokenInstance.balanceOf(owner)).should.be.a.bignumber.that.equals(ownerBalance);
      });

      it('emits a Transfer event', async () => {
        const events = getEvents(tx, 'Transfer');
        events[0].from.should.be.equal(owner);
        events[0].to.should.be.equal(ZERO_ADDRESS);
        events[0].value.should.be.a.bignumber.that.equals(ONE);
      });
    });
  });

  describe('multiTransfer', () => {
    context('when the arrays have different length', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.multiTransfer([holder1, holder2], [ONE], {from: owner}));
      });
    });

    context('when the arrays have the same length', () => {
      context('when the sender has not enough balance', () => {
        it('fails', async () => {
          await expectThrow(tokenInstance.multiTransfer([holder1, holder2], [ownerBalance, ONE], {from: owner}));
        });
      });

      context('when the sender has enough balance', () => {
        let tx;
        let beforeBalanceFrom;
        let beforeBalanceTo1;
        let beforeBalanceTo2;

        before(async () => {
          beforeBalanceFrom = await tokenInstance.balanceOf(owner);
          beforeBalanceTo1 = await tokenInstance.balanceOf(holder1);
          beforeBalanceTo2 = await tokenInstance.balanceOf(holder2);

          tx = await tokenInstance.multiTransfer([holder1, holder2], [ONE, ONE], {from: owner});
        });

        it('transfers requested amount', async () => {
          (await tokenInstance.balanceOf(owner)).should.be.a.bignumber.that.equals(beforeBalanceFrom.sub(TWO));
          (await tokenInstance.balanceOf(holder1)).should.be.a.bignumber.that.equals(beforeBalanceTo1.add(ONE));
          (await tokenInstance.balanceOf(holder2)).should.be.a.bignumber.that.equals(beforeBalanceTo2.add(ONE));
        });

        it('emits a Transfer event', async () => {
          const events = getEvents(tx, 'Transfer');

          events[0].from.should.be.equal(owner);
          events[0].to.should.be.equal(holder1);
          events[0].value.should.be.a.bignumber.that.equals(ONE);

          events[1].from.should.be.equal(owner);
          events[1].to.should.be.equal(holder2);
          events[1].value.should.be.a.bignumber.that.equals(ONE);
        });
      });
    });
  });

  describe('reclaimToken', () => {
    context('MDN token contract accidentally received another token', () => {
      let anotherTokenInstance;

      before(async () => {
        anotherTokenInstance = await ERC20Token.new('NAME', 'SYMBOL', 18, {from: deployer});
        await anotherTokenInstance.mint(holder2, ONE, {from: deployer});

        await anotherTokenInstance.transfer(tokenInstance.address, ONE, {from: holder2});
      });

      context('when called by a non-owner account', () => {
        it('fails', async () => {
          await expectThrow(tokenInstance.reclaimToken(anotherTokenInstance.address, {from: anotherAccount}));
        });
      });

      context('when called by the owner account', () => {
        before(async () => {
          await tokenInstance.reclaimToken(anotherTokenInstance.address, {from: owner});
        });

        it('recovers tokens successfully', async () => {
          (await anotherTokenInstance.balanceOf(owner)).should.be.a.bignumber.that.equals(ONE);
          (await anotherTokenInstance.balanceOf(tokenInstance.address)).should.be.a.bignumber.that.equals(ZERO);
        });
      });
    });
  });

  describe('transferOwnership', () => {
    context('when new owner is zero address', () => {
      it('fails', async () => {
        await expectThrow(tokenInstance.transferOwnership(ZERO_ADDRESS, {from: owner}));
      });
    });

    context('when new owner is different to zero address', () => {
      let tx;

      before(async () => {
        tx = await tokenInstance.transferOwnership(anotherAccount, {from: owner});
      });

      it('transfer the ownership', async () => {
        (await tokenInstance.isOwner({from: anotherAccount})).should.equal(true);
      });

      it('emits an OwnershipTransferred event', async () => {
        const events = getEvents(tx, 'OwnershipTransferred');
        events[0].previousOwner.should.be.equal(owner);
        events[0].newOwner.should.be.equal(anotherAccount);
      });
    });
  });
});
