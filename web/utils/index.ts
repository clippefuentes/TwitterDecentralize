import { ethers } from "ethers";
import Twitter from '../../artifacts/contracts/Twitter.sol/Twitter.json'

export const getContract = async (ethereum: any) => {
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', Twitter.abi, signer);
      console.log('Connected to contract', connectedContract);
      return connectedContract;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}