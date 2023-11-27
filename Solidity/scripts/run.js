const main = async () => {
  //getting the wallet address of the owner and some random guy called superCoder,needed for deploying into the blockchain
  const [owner, superCoder] = await hre.ethers.getSigners();
  //This will actually compile our contract and generate the necessary files we need to work with our contract 
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  //Hardhat will create a local Ethereum network for us, but just for this contract
  const domainContract = await domainContractFactory.deploy("ninja");
  //await domainContract.deployed();

  console.log("Contract owner:", await owner.getAddress());//getting the owner'saddress

  // We are registering the a16z in the smart contract
  let txn = await domainContract.register("a16z",  {value: ethers.parseEther('1234')});

  await txn.wait();

  // How much money is in here?
  const balance = await hre.ethers.provider.getBalance(await domainContract.getAddress());//the contract's address balance
  console.log("Contract balance:", hre.ethers.formatEther(balance));

  // Quick! Grab the funds from the contract! (as superCoder)
  try {
    txn = await domainContract.connect(superCoder).withdraw();
    await txn.wait();
  } catch(error){
    console.log("Could not rob contract");
  }

  // Let's look in their wallet so we can compare later
  let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
  console.log("Balance of owner before withdrawal:", hre.ethers.formatEther(ownerBalance));

  // Oops, looks like the owner is saving their money!
  txn = await domainContract.connect(owner).withdraw();
  await txn.wait();
  
  // Fetch balance of contract & owner
  const contractBalance = await hre.ethers.provider.getBalance(domainContract.getAddress());
  ownerBalance = await hre.ethers.provider.getBalance(owner.getAddress());

  console.log("Contract balance after withdrawal:", hre.ethers.formatEther(contractBalance));
  console.log("Balance of owner after withdrawal:", hre.ethers.formatEther(ownerBalance));
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
