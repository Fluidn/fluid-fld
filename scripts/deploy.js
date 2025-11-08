const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying FluidToken with account:", deployer.address);

  const foundationWallet = "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2";
  const relayerWallet = "0x96f3d6c8e43518f1f62ff530ebf8ef8faf5b8063";
  const initialSigners = [
    "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2",
    "0x22a978289a5864be1890dac00154a7d343273342"
  ];
  const requiredApprovals = 2;

  const Token = await hre.ethers.getContractFactory("FluidToken");
  const token = await Token.deploy(foundationWallet, relayerWallet, initialSigners, requiredApprovals);

  await token.deployed();
  console.log("FluidToken deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
