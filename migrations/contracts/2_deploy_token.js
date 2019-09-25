/*
/**
 * Migration
 */

const MADANA = artifacts.require('./MADANA/MADANA.sol');

module.exports = function (deployer, network, accounts) { // eslint-disable-line

  deployer.deploy(MADANA);
};

