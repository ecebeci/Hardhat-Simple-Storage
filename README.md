[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test  // Does that with default network (hardhat temporary network)
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
npx hardhat run scripts/deploy.ts --network mumbai
```

Create .env file and put these variables as your variable
```bash
MUMBAI_RPC_URL=
PRIVATE_KEY=
ETHERSCAN_API_KEY=
COINMARKETCAP_API_KEY=
```