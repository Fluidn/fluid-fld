// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  // ======== Config wallets ========
  const FOUNDATION_WALLET = "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2";
  const RELAYER_WALLET = "0x96f3d6c8e43518f1f62ff530ebf8ef8faf5b8063";
  const MULTISIG_SIGNERS = [
    "0x51b88d94a23e91770b2ccc1d24ac6804551e12d2",
    "0x22a978289a5864be1890dac00154a7d343273342"
  ];
  const REQUIRED_APPROVALS = 2;

  const MARKETING_WALLET = "0xd40c17e2076a6cab4fcb4c7ad50693c0bd87c96f";
  const TEAM_WALLET = "0x22a978289a5864be1890dac00154a7d343273342";
  const DEV_WALLET = "0x4ca465f7b25b630b62b4c36b64dff963f81e27c0";

  console.log("Deploying FluidToken...");

  // ======== Deploy contract ========
  const FluidToken = await ethers.getContractFactory("FluidToken");
  const token = await FluidToken.deploy(
    FOUNDATION_WALLET,
    RELAYER_WALLET,
    MULTISIG_SIGNERS,
    REQUIRED_APPROVALS
  );

  await token.deployed();
  console.log(`FluidToken deployed to: ${token.address}`);

  // ======== Verify initial allocations ========
  console.log("\n=== Initial Token Allocations ===");

  const marketingBalance = await token.balanceOf(MARKETING_WALLET);
  const teamBalance = await token.balanceOf(TEAM_WALLET);
  const devBalance = await token.balanceOf(DEV_WALLET);

  console.log(`Marketing Wallet: ${ethers.utils.formatEther(marketingBalance)} FLD`);
  console.log(`Team Wallet: ${ethers.utils.formatEther(teamBalance)} FLD`);
  console.log(`Dev Wallet: ${ethers.utils.formatEther(devBalance)} FLD`);

  // Contract holds Sale + Airdrop + Foundation + Relayer tokens
  const contractBalance = await token.balanceOf(token.address);
  console.log(`Contract Balance (Sale + Airdrop + Foundation): ${ethers.utils.formatEther(contractBalance)} FLD`);

  // ======== Sanity check total supply ========
  const totalSupply = await token.totalSupply();
  console.log(`Total Supply: ${ethers.utils.formatEther(totalSupply)} FLD`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
