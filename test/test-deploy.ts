import { ethers, network, run } from "hardhat";
import { expect, assert } from "chai";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";

describe("SimpleStorage", () => {
  let simpleStorageFactory: SimpleStorage__factory;
  let simpleStorage: SimpleStorage;
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve(); // BigNumber. We should use string for compare BigNumber variables
    const expectedValue = "0";
    // assert
    assert.equal(currentValue.toString(), expectedValue);
  }); // do check

  it("Should update when we call store", async function () {
    const expectedValue = "5";
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    // expect
    expect(currentValue.toString()).to.equal(expectedValue);
  });

  if (network.name != "hardhat")
    it("Should get 'already verified' message when we verify code twice on block explorer", async function () {
      const expectedError = "already verified";
      await run("verify:verify", {
        address: simpleStorage.address,
        constructorArguments: [],
      })
        .then(
          await run("verify:verify", {
            address: simpleStorage.address,
            constructorArguments: [],
          })
        )
        .catch((error) => expect(error.toString()).to.equal(expectedError));
    });
});
