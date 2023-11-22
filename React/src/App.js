import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import {ethers} from "ethers";
import contractABI from './utils/contractABI.json';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// Add the domain you will be minting
const tld = '.ninja';
const CONTRACT_ADDRESS = "0x99C5e3070C0300f2647E17A7D054D65DCa936f82";

const App = () => {
	const [currentAccount, setCurrentAccount] = useState('');
	// Add some state data properties
	const [domain, setDomain] = useState('');
	const [loading, setLoading] = useState(false);
	const [record, setRecord] = useState('');
  
	const connectWallet = async () => {
	  try {
		const { ethereum } = window;
  
		if (!ethereum) {
		  alert("Get MetaMask -> https://metamask.io/");
		  return;
		}
  
		const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  
		console.log("Connected", accounts[0]);
		setCurrentAccount(accounts[0]);
	  } catch (error) {
		console.log(error);
	  }
	}
  
	const checkIfWalletIsConnected = async () => {
	  const { ethereum } = window;
  
	  if (!ethereum) {
		console.log('Make sure you have MetaMask!');
		return;
	  } else {
		console.log('We have the ethereum object', ethereum);
	  }
  
	  const accounts = await ethereum.request({ method: 'eth_accounts' });
  
	  if (accounts.length !== 0) {
		const account = accounts[0];
		console.log('Found an authorized account:', account);
		setCurrentAccount(account);
	  } else {
		console.log('No authorized account found');
	  }
	};
  
	const mintDomain = async () => {
	  // Don't run if the domain is empty
	  if (!domain) { return }
	  // Alert the user if the domain is too short
	  if (domain.length < 3) {
		alert('Domain must be at least 3 characters long');
		return;
	  }
	  // Calculate price based on length of domain (change this to match your contract)
	  // 3 chars = 0.5 MATIC, 4 chars = 0.3 MATIC, 5 or more = 0.1 MATIC
	  const price = domain.length === 3 ? '0.5' : domain.length === 4 ? '0.3' : '0.1';
	  console.log("Minting domain", domain, "with price", price);
	  try {
		const { ethereum } = window;
		if (ethereum) {
		  const provider = new ethers.providers.Web3Provider(ethereum);
		  const signer = provider.getSigner();
		  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  
		  console.log("Going to pop wallet now to pay gas...")
		  let tx = await contract.register(domain, { value: ethers.utils.parseEther(price) });
		  // Wait for the transaction to be mined
		  const receipt = await tx.wait();
  
		  // Check if the transaction was successfully completed
		  if (receipt.status === 1) {
			console.log("Domain minted! https://mumbai.polygonscan.com/tx/" + tx.hash);
  
			// Set the record for the domain
			tx = await contract.setRecord(domain, record);
			await tx.wait();
  
			console.log("Record set! https://mumbai.polygonscan.com/tx/" + tx.hash);
  
			setRecord('');
			setDomain('');
		  }
		  else {
			alert("Transaction failed! Please try again");
		  }
		}
	  }
	  catch (error) {
		console.log(error);
	  }
	}
  
	// Render methods
	const renderNotConnectedContainer = () => (
	  <div className="connect-wallet-container">
		<img src="https://media.giphy.com/media/3ohhwytHcusSCXXOUg/giphy.gif" alt="Ninja donut gif" />
		{/* Call the connectWallet function we just wrote when the button is clicked */}
		<button onClick={connectWallet} className="cta-button connect-wallet-button">
		  Connect Wallet
		</button>
	  </div>
	);
  
	// Form to enter domain name and data
	const renderInputForm = () => {
	  return (
		<div className="form-container">
		  <div className="first-row">
			<input
			  type="text"
			  value={domain}
			  placeholder='domain'
			  onChange={e => setDomain(e.target.value)}
			/>
			<p className='tld'> {tld} </p>
		  </div>
  
		  <input
			type="text"
			value={record}
			placeholder='whats ur ninja power'
			onChange={e => setRecord(e.target.value)}
		  />
  
		  <div className="button-container">
			{/* Call the mintDomain function when the button is clicked */}
			<button className='cta-button mint-button' onClick={mintDomain}>
			  Mint
			</button>
		  </div>
  
		</div>
	  );
	}
  
	useEffect(() => {
	  checkIfWalletIsConnected();
	}, []);
  
	return (
	  <div className="App">
		<div className="container">
		<div className="header-container">
       <header>
    <div className="left">
      <p className="title">🐱‍👤 Ninja Name Service</p>
      <p className="subtitle">Your immortal API on the blockchain!</p>
    </div>
    {/* Display a logo and wallet connection status*/}
    <div className="right">
      <img alt="Network logo" className="logo" src={ network.includes("Polygon") ? polygonLogo : ethLogo} />
      { currentAccount ? <p> Wallet: {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)} </p> : <p> Not connected </p> }
    </div>
  </header>
</div>
  
		  {!currentAccount && renderNotConnectedContainer()}
		  {/* Render the input form if an account is connected */}
		  {currentAccount && renderInputForm()}
  
		  <div className="footer-container">
			<img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
			<a
			  className="footer-text"
			  href={TWITTER_LINK}
			  target="_blank"
			  rel="noreferrer"
			>{`built with @${TWITTER_HANDLE}`}</a>
		  </div>
		</div>
	  </div>
	);
  };
  
  export default App;