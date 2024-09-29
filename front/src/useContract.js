import {Contract} from '@ethersproject/contracts';
import ABI from '../../artifacts/contracts/GLD.sol/GLD.json';
import AIRDROPABI from '../../artifacts/contracts/AirDrop.sol/Airdrop.json';
import {useWeb3React} from '@web3-react/core';
import {useState} from 'react';

import addresses from './contractAddresses.json';

const tokenAddress = addresses.tokenAddress;
const airdropAddress = addresses.airdropAddress;

const a = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const b = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

/**
 * 1. a账户初始有10个代币
 * 2. a给b的账户转3个币
 *
 * 3. 切换到A的账户，授权B账户可以从A的账户转3个代币
 * 4. 切换到B的账户上，从A里面转3个代币到B账户
 *
 * 5. A有4个代币，B有6个代币
 */
export function useContract() {
    const {provider, connector, account} = useWeb3React();
    const [balance, setBalance] = useState(0);
    // useEffect(()=>{
    //     const signer = provider.getSigner();
    //     if(!provider){
    //         return;
    //     }
    //     const contract = new Contract('tokenAddress',ABI.abi,signer);
    //     contract.deployed().then((contract)=>{
    //         contract.transfer(b,3);
    //     })
    // },[provider, connector, account])

    // 该方法为授权B账户可以从A的账户转1个代币
    const approve = async () => {
        const signer = provider.getSigner();
        console.log("signer__approve", signer);
        if (!provider) {
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.approve(b, 1);
    }

    // 该方法为B账户从A的账户转1个代币到B账户
    const transfer = async () => {
        const signer = provider.getSigner();
        console.log("signer__transfer", signer);
        if (!provider) {
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        await contract.transferFrom(a, b, 1);
    }

    const getB = async () => {
        const signer = provider.getSigner();
        if (!provider) {
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);

        const balance = await contract.balanceOf(account);
        setBalance(balance.toString());
        console.log("balance", balance.toString());
    }
    const balanceOf = async () => {
        const signer = provider.getSigner();
        if (!provider) {
            return;
        }
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const balance = await contract.getB();
        setBalance(balance.toString());
        console.log("balance", balance.toString());
    }

    /**
     * 验证签名
     */
    const verify = async (messagesHash, sign, address) => {
        const signer = provider.getSigner();
        if (!provider) {
            return;
        }
        console.log("signer__verify", sign);
        console.log("messagesHash", messagesHash);
        const contract = new Contract(tokenAddress, ABI.abi, signer);
        const sig = await contract.verifySignature(messagesHash, sign, address);
        console.log("sig", sig);
    }

    /**
     * 领取空投
     */
    const getAirDrop = async () => {


        // 地址有最近的空投，允许调用智能合约方法
        const signer = provider.getSigner();
        if (!provider) {
            return;
        }
        const contract = new Contract(airdropAddress, AIRDROPABI.abi, signer);
        try {
            const getAirdrop = await contract.getAirdrop();
            console.log('成功领取空投', withdrawTokens);
            balanceOf(); // 更新余额或进行其他操作
        } catch (error) {
            console.error('调用智能合约失败', error);
        }

    }


    return {
        approve,
        transfer,
        balanceOf,
        balance,
        verify,
        getB,
        getAirDrop
    }
}

