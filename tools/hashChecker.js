const sha3      = require('web3-utils').sha3;
const fs        = require('fs');
const assert    = require('assert');

// Valid hashes using Keccak-256

const contracts = {
  Ownable         : fs.readFileSync('node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol'),
  ERC20           : fs.readFileSync('node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol'),
  IERC20          : fs.readFileSync('node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol'),
  ERC20Detailed   : fs.readFileSync('node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol'),
  SafeMath        : fs.readFileSync('node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol')
};

const hashes = {
  Ownable       : '0xf79fb10e8235770eb4aea7249034076a3cc9f9119ad944fc48705bae9c9d20dc',
  ERC20         : '0x852793a3c2f86d336a683b30d688ec3dcfc57451af5a2bf5975cda3b7191a901',
  IERC20        : '0x90e8c2521653bbb1768b05889c5760031e688d9cd361f167489b89215e201b95',
  ERC20Detailed : '0xc61b3603089b09a730d8ca72e9133a496cc4405da40e9b87c12f073245d774bf',
  SafeMath      : '0x4ccf2d7b51873db1ccfd54ca2adae5eac3b184f9699911ed4490438419f1c690'
};

Object.keys(contracts).forEach((key) => {
  try {
    assert.equal(sha3(contracts[key]), hashes[key], 'Hash mismatch: ' + key);
  } catch (error) {
    console.log(error.message + ' - Zeppelin Framework');
    console.log(key + ': ' + sha3(contracts[key]));
  }
});
