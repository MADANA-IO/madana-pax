/**
 * @title MADANA PAX Token Contract
 */
pragma solidity 0.5.10;

import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../token/ERC20/ERC20Burnable.sol";
import "../token/ERC20/ERC20MultiTransfer.sol";
import "../utils/Reclaimable.sol";


contract MADANA is
    Reclaimable,
    ERC20Detailed,
    ERC20Burnable,
    ERC20MultiTransfer {

    string private constant _name = "MADANA PAX";
    string private constant _symbol = "MDN";
    uint8 private constant _decimals = 18;
    address private constant _owner = 0x445cB41f5CD66b00c9BAc837f7A2c5db4132099C;
    uint256 private constant _initialBalance = 100 * 10**6 * 10**18; // 100 million MDN

    /**
    * @dev Constructor of MADANA PAX token that instantiates a new token
    */
    constructor()
        public
        ERC20Detailed(_name, _symbol, _decimals) {
            transferOwnership(_owner);
            _mint(_owner, _initialBalance);
        }

    /** OVERRIDE - only owner role can call
     * @notice Burn tokens of one account
     * @param account The address whose tokens are to be burnt
     * @param value The amount of tokens to be burnt
     */
    function _burn(address account, uint256 value) internal onlyOwner {
        super._burn(account, value);
    }
}
