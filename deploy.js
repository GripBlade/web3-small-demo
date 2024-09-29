const hre = require('hardhat');
const {writeFileSync} = require("node:fs");


async function deploy() {
    // 部署GLD合约
    const GLD = await hre.ethers.getContractFactory('GLD');
    const gld = await GLD.deploy(10000000);

    await gld.waitForDeployment();
    console.log("GLD deployed to: ", gld.target);

    //  部署airdrop合约
     const Airdrop = await hre.ethers.getContractFactory('Airdrop');
     const airdrop = await Airdrop.deploy(gld.target)
     await airdrop.waitForDeployment();
     console.log("airdrop deployed to: ", airdrop.target);

    let tx = await gld.transfer(airdrop.target, 10000);

    const balance = await gld.balanceOf(airdrop.target);
    console.log("Airdrop balance of C2N token: ", balance);

    // 写入地址到文件
    const addresses = {
        tokenAddress: gld.target,
        airdropAddress: airdrop.target,
    };

    writeFileSync('./front/src/contractAddresses.json', JSON.stringify(addresses, null, 2));
}

async function main() {
    await deploy();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });