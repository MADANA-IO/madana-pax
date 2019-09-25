/**
 * @title ERC20Burnable
 * @dev Allows owner to destroy their own tokens
 */

pragma solidity 0.5.10;

import "../../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract ERC20Burnable is ERC20 {
    /**
     * @dev Destroys tokens from the owner account
     * @param amount Amount of tokens to be destroyed and subtracted from `totalSupply`
     */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}