require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: "0.8.20",
  networks: {
    mumbai: {
      url: "https://cool-wiser-night.matic-testnet.quiknode.pro/169a41fbc39f4b9578f72cae2937fc652d894485/",
      accounts: [process.env.WALLET_PRIVATE_KEY],
    }
  }
};