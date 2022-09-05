import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "hardhat-gas-reporter"; // thanks to this, npx hardhat test calls that reporter automatically
import "./tasks/block-number";
import "solidity-coverage";
require("dotenv").config();

const MUMBAI_RPC_URL: string =
  process.env.MUMBAI_RPC_URL! ||
  "https://polygon-mumbai.g.alchemy.com/v2/example"; // if RPC_URL doesnt exits (undefined) it uses or
const PRIVATE_KEY = process.env.PRIVATE_KEY! || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY! || "key ";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key ";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat", // default
  networks: {
    mumbai: { url: MUMBAI_RPC_URL, accounts: [PRIVATE_KEY], chainId: 80001 },
  },
  solidity: "0.8.9",
  etherscan: { apiKey: ETHERSCAN_API_KEY },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    token: "MATIC",
    gasPriceApi:
      "https://api.polygonscan.com/api?module=proxy&action=eth_gasPrice",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
