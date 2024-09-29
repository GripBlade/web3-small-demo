// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";
import "./Lib.sol";

contract GLD is ERC20 {
    using ECDSA for bytes32;
    mapping (address => mapping (address => uint256)) private _allowances;


    constructor(uint256 initial) ERC20("Gold", "GLD") {
        _mint(msg.sender, initial);
    }
    // approve
    function approve(address spender, uint256 amount) public override returns (bool) {
        console.log("Approve", msg.sender, spender, amount);
        return super.approve(spender, amount);
    }
    // transferFrom
    function transferFrom(address sender, address recipient, uint256 amount)
    public override returns (bool) {
        console.log("TransferFrom", sender, recipient, amount);
        return super.transferFrom(sender, recipient, amount);
    }

    function getB() public view returns (uint256) {
        return balanceOf(msg.sender);

    }


    
    function recoverSigner(bytes32 messageHash, bytes memory signature) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // 从签名中提取 r, s, v
        assembly {
            r := mload(add(signature, 32))
            s := mload(add(signature, 64))
            v := byte(0, mload(add(signature, 96)))
        }

        // 使用 ecrecover 恢复签名者的地址
        return ecrecover(messageHash, v, r, s);
    }

    // 验证签名方法（ 需要三个参数，消息哈希，签名，地址  ）
    // 其中 通过消息哈希和签名，可以恢复出签名者的地址
    function verifySignature(bytes32 messageHash, bytes memory signature, address expectedSigner) public pure returns (bool) {
        // 恢复签名者的地址
        address recoveredAddress = recoverSigner(messageHash, signature);
        // bytes32 hash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash));
        
        // 验证恢复出的地址是否与预期的签名者地址一致
        return recoveredAddress == expectedSigner;
    }
}
