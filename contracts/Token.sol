//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract Token {
    string public name = "Hardhat Token";
    string public symbol = "HDHT";
    uint public totalSupply = 10000;
    address public owner;

    mapping(address => uint) balances;

    constructor() payable {
        // balances[msg.sender] = totalSupply; // msg.sender = Owner since this is constructor, one who deploys is msg.sender
        owner = msg.sender;
    }

    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    function addEtherToContract(string memory var1) external payable{
        require(msg.value >= 1000 * 1e18,"Atleast 100 Ethers");
    }

    function transfer(address to) external payable {
        require(msg.value>1,"Atleast 1 Ether to transfer");
        payable(address(to)).transfer(msg.value);
    }

    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }

    // fallback() external payable {
        
    // }

    receive() external payable {
        
    }
}
