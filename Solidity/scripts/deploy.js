const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("Syndicate");
  //await domainContract.deployed();

  console.log("Contract deployed to:", await domainContract.getAddress());

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("Shreyas",  {value: hre.ethers.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain Shreyas.Syndicate");

  txn = await domainContract.setRecord("Shreyas", "Exploring Tech");
  await txn.wait();
  console.log("Set record for Shreyas.Syndicate");

  const address = await domainContract.getAddress("Shreyas");
  console.log("Owner of domain Syndicate:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.getAddress());
  console.log("Contract balance:", hre.ethers.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();