# Domain-Naming-Service
<img width="1439" alt="Screenshot 2023-11-28 at 5 23 06 PM" src="https://github.com/shreyasrajiv327/Domain-Naming-Service/assets/131350902/3eb1ef3a-6e67-4b2a-a70d-1e6ef8f7cfdb">

## Overview

This project is a decentralized naming service using Solidity for the backend smart contracts and React for the frontend interface. It allows users to register and manage unique names associated with Ethereum addresses on the Polygon network.

### Features

### Features

- **Name Registration:** Users can register unique names tied to their Ethereum addresses on the Polygon network.
- **Frontend Interface:** Built with React to interact with the Solidity smart contracts.

## Installation

### Prerequisites

- Node.js & npm installed
- Metamask extension or any Ethereum-enabled browser

### Backend (Solidity)

1. Navigate to the `Solidity` directory.
2. Install dependencies with `npm install`.
3. Compile the Solidity contracts using a Solidity compiler like `solc`.

   ```bash
   npx hardhat compile
4. Deploy the contracts to the Polygon Mumbai testnet using Hardhat
    ```bash
    npx hardhat run scripts/deploy.js --network mumbai
### Frontend (React) 
1. Navigate to the `React` directory.
2. Install dependencies with `npm install`.
3. Start the development server.

## Deploying to Mainnet
