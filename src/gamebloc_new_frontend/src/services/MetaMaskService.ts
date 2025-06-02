// Add a type definition for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}

class MetaMaskService {
  async isMetaMaskInstalled() {
    const isInstalled = typeof window.ethereum !== "undefined"
    return isInstalled
  }

  async getEthereumAddress() {
    console.log("Getting Ethereum address...")
    if (!(await this.isMetaMaskInstalled())) {
      alert("MetaMask is not installed.")
      throw new Error("MetaMask is not installed")
    }

    let accounts = await window.ethereum.request({ method: "eth_accounts" })

    // If accounts are empty, prompt user to unlock MetaMask
    if (accounts.length === 0) {
      accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
    }

    if (accounts.length === 0) {
      alert("Metamask is locked.")
      throw new Error("Metamask is locked.")
    }

    console.log("Ethereum address:", accounts[0])
    return accounts[0] // Returns the first account
  }

  async signMessage(message) {
    console.log("Signing message...")
    if (!(await this.isMetaMaskInstalled())) {
      alert("MetaMask is not installed.")
      throw new Error("MetaMask is not installed")
    }

    const ethereumAddress = await this.getEthereumAddress()

    const signature = await window.ethereum.request({
      method: "personal_sign",
      params: [message, ethereumAddress],
    })
    // console.log("Signature:", signature)
    return signature // Returns the signature
  }
}

export default new MetaMaskService()
