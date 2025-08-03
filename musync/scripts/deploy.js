const hre = require("hardhat");

async function main() {
  const [_, treasury] = await hre.ethers.getSigners();
  const Market = await hre.ethers.getContractFactory("SampleMarket");
  const market  = await Market.deploy(treasury.address);
  await market.deployed();
  console.log("SampleMarket deployed to:", market.address);
}

main().catch(e => {
  console.error(e);
  process.exitCode = 1;
});
