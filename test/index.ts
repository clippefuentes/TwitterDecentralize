import { expect } from "chai";
import { ethers } from "hardhat";

describe("Twitter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Twitter = await ethers.getContractFactory("Twitter");
    const twitter = await Twitter.deploy();
    await twitter.deployed();
  });
});
