/**
 * @title ERC20 MultiTransfer Token
 */

pragma solidity 0.5.10;

import "../../../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract ERC20MultiTransfer is ERC20 {

    /**
     * @dev Allows the transfer of token amounts to multiple addresses
     * @param beneficiaries Array of addresses that receive the tokens
     * @param amounts Array of amounts to be transferred per beneficiary
     */
    function multiTransfer(address[] calldata beneficiaries, uint256[] calldata amounts) external {
        uint256 length = beneficiaries.length;
        require(length == amounts.length, "lenghts are different");

        for (uint256 i = 0; i < length; i++) {
            super.transfer(beneficiaries[i], amounts[i]);
        }
    }
}