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

async function checkNFTOwnership(walletAddress) {
    // Placeholder for NFT ownership logic
    // In a real-world scenario, you would query the Stargaze blockchain here

    // Simulated ownership check (replace with actual logic)
    const ownsNFT = true; // Simulate that the user owns the NFT

    if (ownsNFT) {
        document.getElementById('nftContent').style.display = 'block';
    } else {
        alert('The connected wallet does not own the required NFT.');
    }
}

document.getElementById('connectWalletButton').addEventListener('click', async () => {
    const walletAddress = await connectWallet();
    if (walletAddress) {
        checkNFTOwnership(walletAddress);
    }
});

