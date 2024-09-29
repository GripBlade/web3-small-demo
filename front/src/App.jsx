import './App.css'
import {useWeb3React} from '@web3-react/core';
import {useEffect, useState} from 'react';
import {useContract} from './useContract';
import {Web3} from 'web3'
import {hashMessage, keccak256, toUtf8Bytes} from 'ethers';
import {concat} from 'ethers';

function App() {
    const {isActive, account, connector, provider,} = useWeb3React();
    const {approve, transfer, balanceOf, balance, verify, getB, getAirDrop} = useContract();
    const [sign, setSign] = useState('');
    const message = 'hello';

    useEffect(() => {
        setTimeout(() => {
            const active = connector.activate();
            active.then((r) => {
                console.log("active", r);
            })
        }, 1000)
    }, [provider, connector, account])


    const signByWallet = async () => {
        try {
            const from = account;
            const sign = await ethereum // Or window.ethereum if you don't support EIP-6963.
                .request({
                    method: "personal_sign",
                    params: [message, from],
                });
            console.log(sign, '🐷', from)
            setSign(sign);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <p>Status: {isActive ? 'Active' : 'Not active'}</p>
            {isActive && <p>Wallet Address: {account}</p>}
            {isActive && <p>Balance: {balance}</p>}
            <button onClick={async () => {
                await connector.activate();
                console.log("active", provider);
            }}>
                connect
            </button>
            <button onClick={async () => {
                await getAirDrop();
            }}>
                getAirDrop
            </button>
            <button onClick={balanceOf}>
                balanceOf
            </button>


            {/*<button onClick={async () => {*/}
            {/*    await approve();*/}
            {/*}}>*/}
            {/*    approve*/}
            {/*</button>*/}


            {/*<button onClick={async () => {*/}
            {/*    await transfer();*/}
            {/*}}>*/}
            {/*    transfer*/}
            {/*</button>*/}


            {/*<button onClick={() => {*/}
            {/*    signByWallet()*/}
            {/*}}>*/}
            {/*    sign*/}
            {/*</button>*/}
            {/*<button onClick={() => {*/}
            {/*    verify(hashMessage(message), sign, account)*/}
            {/*}}>*/}
            {/*    verify*/}
            {/*</button>*/}

            {/*<button onClick={() => {*/}
            {/*    const web3 = new Web3(provider);*/}
            {/*    console.log(hashMessage("hello"))*/}
            {/*    console.log(toUtf8Bytes("hello"))*/}
            {/*    console.log(keccak256(toUtf8Bytes("hello")), '...');*/}
            {/*    console.log(keccak256(concat([toUtf8Bytes("\x19Ethereum Signed Message:\n"), toUtf8Bytes(String("hello".length)), toUtf8Bytes("hello")])))*/}

            {/*    console.log(web3.eth.accounts.hashMessage("hello"))*/}
            {/*}}>*/}
            {/*    用web3js签名*/}
            {/*</button>*/}
            {/*<div>*/}
            {/*    {balance}*/}
            {/*</div>*/}
        </>
    )
}

export default App;

//1.private key 服务端
//2.用户发送一些消息到服务端，服务端用私钥签名signature
//3.用户将签名发送到合约上
//4.合约根据用户的地址和消息，验证签名是否正确


