import { expect } from "chai";
import { ethers } from "hardhat";

describe("Twitter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const [owner, address1] = await ethers.getSigners();
    const Twitter = await ethers.getContractFactory("Twitter");
    const twitter = await Twitter.deploy();
    await twitter.deployed();
    console.log('address1', owner.address);
    console.log('address2', address1.address);
  });
});
