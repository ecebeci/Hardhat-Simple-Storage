import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();
require("./tasks/block-number");

const MUMBAI_RPC_URL: string = process.env.MUMBAI_RPC_URL!;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!;

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat", // default
  networks: {
    mumbai: { url: MUMBAI_RPC_URL, accounts: [PRIVATE_KEY], chainId: 80001 },
  },
  solidity: "0.8.9",
  etherscan: { apiKey: ETHERSCAN_API_KEY },
};

export default config;
