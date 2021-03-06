/**
 * @title Reclaimable
 * @dev This contract gives owner the right to recover any ERC20 tokens accidentally sent to
 * the token contract. The recovered token will be sent to the owner of token.
 */

pragma solidity 0.5.10;

import "../../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "../../node_modules/openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";


contract Reclaimable is Ownable {
    using SafeERC20 for IERC20;

    /**
     * @notice Let the owner retrieve any tokens accidentally sent to this contract
     * @dev This function is suitable when no token of any kind shall be stored under
     * the address of the inherited contract
     * @param tokenToBeRecovered Address of the token to be recovered
     */
    function reclaimToken(IERC20 tokenToBeRecovered) external onlyOwner {
        uint256 balance = tokenToBeRecovered.balanceOf(address(this));
        tokenToBeRecovered.safeTransfer(msg.sender, balance);
    }
}
