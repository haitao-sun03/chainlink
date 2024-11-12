/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("@chainlink/env-enc").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL

module.exports = {
  solidity: "0.8.27",
  namedAccounts: {
    firstAccount: {
      default: 0
    }
  },

  networks: {
    sepolia: {
      accounts : [PRIVATE_KEY],
      url : SEPOLIA_RPC_URL,
      chainId :11155111,
    }
  }
};
