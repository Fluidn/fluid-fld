require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    polygon: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.DEPLOYER_PRIVATE_KEY],
    },
  },
};
