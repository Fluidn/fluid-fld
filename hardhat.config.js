require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "polygon",
  networks: {
    polygon: {
      url: process.env.ALCHEMY_POLYGON_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: { // testnet
      url: process.env.ALCHEMY_POLYGON_URL.replace("polygon-mainnet", "polygon-mumbai"),
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
