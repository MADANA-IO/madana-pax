# MADANA PAX Token Contract

## Specifications
* Initial balance: 100 million MDN tokens to be held by the owner account
* Token standard: ERC-20
* ERC20Detailed
    * Name: MADANA PAX
    * Symbol: MDN
    * Decimals: 18
* ERC20Burnable
    * Supply can be decreased by the owner only by calling the `burn` function to burn tokens from its own account
    **Note: token holders are not able to burn their tokens**
* Reclaimable
    * Allows to recover any ERC20 tokens accidentally sent to the smart contract by calling the `reclaimToken` function. The recovered tokens will be sent to the owner account. The owner can then send those tokens to the account claiming them. This functionality will only be available to the owner account
* ERC20MultiTransfer
    * A token holder can distribute their tokens to multiple accounts at once using the `multiTransfer` functionality

### Roles
* Owner Role
    * Can decrease the total supply
    * Can reclaim ERC20 tokens accidentally sent to the MDN token smart contract
    **Note: The owner can transfer the ownership to a different account if required**

## Deployment Instructions
* Deploy `MADANA` contract
    * record contract address

# Tool-chain Update:
When running the coverage command, the `solidity-coverage` package does not fully support
all syntex of Solidity v5.0+. Keywords such as `calldata`, `payable` are cannot be parsed
properly.
When waiting for the update of the `solidity-coverage` package, the workaround of this issue
is:
1. Replace the content of `/node_modules/solidity-parser-sc/build/parser.js` with code
written by @maxsam4 at `https://raw.githubusercontent.com/maxsam4/solidity-parser/solidity-0.5/build/parser.js`.
2. This piece of code can also be found at `tools/parser.js` in case online source is updated or unavailable.

## Linter
Please use this [solidity VSCode plugin](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) to ensure your contracts follows the solidity style and security guides.
__`yarn test` only runs, if no linter issues detected!__

All security rules should be implemented according [ConsenSys Guide for Smart Contracts](https://consensys.github.io/smart-contract-best-practices/recommendations/).

All style guide rules should be implemented according [Solidity Style Guide](http://solidity.readthedocs.io/en/develop/style-guide.html).

For more information look into the [Solhint docs](https://github.com/protofire/solhint).

## Requirements
The server side scripts requires NodeJS 8 to work properly.
Go to [NVM](https://github.com/creationix/nvm) and follow the installation description.

### Use correct NodeJS version for this project
Before installing any dependencies (yarn install), ensure, you are using the right node version.
```
nvm install
nvm use
```

NVM supports both Linux and OS X, but that’s not to say that Windows users have to miss out. There is a second project named [nvm-windows](https://github.com/coreybutler/nvm-windows) which offers Windows users the possibility of easily managing Node environments.

__nvmrc support for windows users is not given, please make sure you are using the right Node version (as defined in .nvmrc) for this project!__

Yarn is required to be installed globally to minimize the risk of dependency issues.
Go to [Yarn](https://yarnpkg.com/en/docs/install) and choose the right installer for your system.

For the Rinkeby and MainNet deployment, you need Geth on your machine.
Follow the [installation instructions](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum) for your OS.

Depending on your system the following components might be already available or have to be provided manually:
* [Python](https://www.python.org/downloads/windows/) 2.7 Version only! Windows users should put python into the PATH by cheking the mark in installation process. The windows build tools contain python, so you don't have to install this manually.
* GIT, should already installed on *nix systems. Windows users have to install [GIT](http://git-scm.com/download/win) manually.
* On Windows systems, PowerShell is mandatory
* On Windows systems, windows build tools are required (already installed via package.json)
* make (on Ubuntu this is part of the commonly installed `sudo apt-get install build-essential`)
* On OSX the build tools included in XCode are required

__Every command must be executed from within the projects base directory!__

## Setup
Open your terminal and change into your project base directory. From here, install all needed dependencies.
```
yarn install
```
This will install all required dependencies in the directory _node_modules_.

## Compile, migrate, test and coverage
To compile, deploy and test the smart contracts, go into the projects root directory and use the task runner accordingly.
```
# Compile contract
yarn compile

# Migrate contract
yarn migrate

# Test the contract
yarn test

# Run coverage tests
yarn coverage
```

## Infura Testnet Deployment - Ropsten, Rinkeby, & Kovan
create a `.secrets.json` file in the config directory of this project and insert the following with your Infura API key and mnemonic. Double check and make sure that file name is included in the `.gitignore` file list.
__Never commit and push your mnemonics!__
```
{
    "rinkeby": {
        "host": "https://rinkeby.infura.io/<APIKEY>",
        "mnemonic": "<MNEMONIC>"
    }
}
```

### Contract Verification
The final step for the Rinkeby / MainNet deployment is the contract verification.

This can be dome on [Etherscan](https://etherscan.io/address/<REAL_ADDRESS_HERE>) or [Rinkeby Etherscan](https://rinkeby.etherscan.io/address/<REAL_ADDRESS_HERE>).
- Click on the `Contract Creation` link in the `to` column
- Click on the `Contract Code` link

Fill in the following data.
```
Contract Address:       <CONTRACT_ADDRESS>
Contract Name:          <CONTRACT_NAME>
Compiler:               v0.5.10+commit.5a6ea5b1
Optimization:           YES
Solidity Contract Code: <Copy & Paste from ./build/bundle/flattened_MADANA.sol>
Constructor Arguments:  <ABI from deployment output>
```
Visit [Solc version number](https://github.com/ethereum/solc-bin/tree/gh-pages/bin) page for determining the correct version number for your project.

- Confirm you are not a robot
- Hit `verify and publish` button

Now your smart contract is verified.
