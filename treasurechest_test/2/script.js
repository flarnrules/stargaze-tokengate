async function connectWallet() {
    try {
        if (window.keplr) {
            // Request Keplr to enable the Stargaze chain
            await window.keplr.enable('stargaze');
            const offlineSigner = window.getOfflineSigner('stargaze');
            const accounts = await offlineSigner.getAccounts();
            return accounts[0].address; // Returns the wallet address
        } else {
            alert("Keplr wallet not detected. Please install the Keplr extension.");
            return null;
        }
    } catch (error) {
        console.error('Error connecting to Keplr wallet:', error);
        alert('Failed to connect Keplr wallet. See console for more details.');
        return null;
    }
}

async function checkNFTOwnership(walletAddress, nftContractAddress, tokenId) {
    try {
        // Initialize your blockchain client
        const stargazeClient = new StargazeClient(/* parameters */);

        // Query the smart contract to check for ownership
        const ownerAddress = await stargazeClient.queryContractSmart(nftContractAddress, {
            "owner_of": {
                "token_id": tokenId
            }
        });

        // Compare the returned owner address with the user's wallet address
        return ownerAddress === walletAddress;
    } catch (error) {
        console.error('Error querying NFT ownership:', error);
        return false;
    }
}

document.getElementById('connectWalletButton').addEventListener('click', async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) {
        // Replace with actual contract address and token ID
        const ownsNFT = await checkNFTOwnership(walletAddress, 'nft_contract_address', 'token_id');
        if (ownsNFT) {
            document.getElementById('nftContent').style.display = 'block';
        } else {
            alert('You do not own the required NFT.');
        }
    }
});

