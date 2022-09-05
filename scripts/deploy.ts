// import
import { ethers, run, network } from "hardhat"; //input ethers from hardhat not npm ether package. Without that hardhat wont neccesarily know about contrac factories in different places and pieces
// {run} allows us run hardhat tasks (run.address )

// define async main
async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
  // if we use just ethers from npm ethers, ethers doesnt know contract folder and so we need to define abi binary and also wallet (new ethers.ContractFactory(abi, binary, wallet))
  // on the other hand, ethers inside the hardhat package knows the contract and knows that we compiled the code (wallet rpc all of them are bundled in the hardhat.)
  console.log("Deploying, please wait...");
  const simpleStorage = await SimpleStorageFactory.deploy(); // deploys on the blockchain
  await simpleStorage.deployed();
  // what is the private key and rpc url?
  console.log(`Deployed contract to ${simpleStorage.address}`);
  // what happens when we deploy to our hardhat network
  if (network.config.chainId === 80001 && process.env.ETHERSCAN_API_KEY) {
    // mumbai and etherscan_api_key is not undefined
    console.log("Waiting block confirmations...");
    await simpleStorage.deployTransaction.wait(6); // We need to wait at least 5 blocks for etherscan verification
    await verify(simpleStorage.address, []);
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`Current Value is: ${currentValue}`);

  // Update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log(`Updated Value is: ${updatedValue}`);
}

// verify code on block explorers (mainnet or testnet usage only)
async function verify(contractAddress: string, args: string[]) {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.log(e);
    }
  }
}

// call main
main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
