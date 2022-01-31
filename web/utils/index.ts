import { ethers } from "ethers";
import Twitter from '../../artifacts/contracts/Twitter.sol/Twitter.json'

export const getContract = async (ethereum: any) => {
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract('0x570880fB1B268d2B589cA257D1C3aeA4B82C36AD', Twitter.abi, signer);
      console.log('Connected to contract', connectedContract);
      return connectedContract;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}