// SPDX-License-Identifier: UNLICENSED

// 此合约的只要目的是给予用户空投奖励

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Airdrop {
    uint256 public constant TOKENS_PER_CLAIM = 2; // 一次的额度
    ERC20 public GLDToken;
    uint256 public totalTokensWithdrawn;

    constructor(address tokens) {
        GLDToken = ERC20(tokens);
    }

    event TokensAirdropped(address beneficiary);

    // 空投奖励
    function getAirdrop() public {

        address beneficiary = msg.sender;

        // 确保合约中有足够的代币

        // 执行代币转账
        bool status = GLDToken.transfer(beneficiary, TOKENS_PER_CLAIM);
        require(status, "Token transfer failed.");

        // 更新状态
        totalTokensWithdrawn += TOKENS_PER_CLAIM;

        // 触发事件
        emit TokensAirdropped(beneficiary);
    }
}

