import { ethers } from "ethers";
import Twitter from '../../artifacts/contracts/Twitter.sol/Twitter.json'

export const getContract = async (ethereum: any) => {
  try {
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract('0x235b6c2277a47f39058Aa9EA7AC423c4Ff4dc876', Twitter.abi, signer);
      console.log('Connected to contract', connectedContract);
      return connectedContract;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}