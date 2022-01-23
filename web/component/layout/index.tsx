import { useEffect, useCallback, useContext } from "react";
import { ethers } from "ethers";
import { AppContext } from '../../context'
import Twitter from '../../../artifacts/contracts/Twitter.sol/Twitter.json'

import Header, { HeaderProps } from './header';

export interface LayoutProps {
  header: HeaderProps;
  children: React.ReactNode;
}

declare let window: any;

const Layout = (props: any) => {
  const {
    currentAccount,
    setAccount: setCurrentAccount,
    setHasMetamask,
    setLoading,
    setTweets,
    tweets
  } = useContext(AppContext);

  const { children } = props;

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false);
      } else {
        const { ethereum } = window;
        setHasMetamask(true);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
      setLoading(false);
    } catch (err) {
      // Router to error page
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false);
      } else {
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0]);
      }
      setLoading(false);
    } catch (err) {
      // Router to error page
    }
  }, [setCurrentAccount, currentAccount, setLoading])

  const getTwitterTweets = useCallback(async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', Twitter.abi, signer);
        const tweetsLength = await connectedContract.getTweetLength();
        const tweets = await connectedContract.tweets;

        const tweetsArray = [];

        for (let i = 0; i < tweetsLength; i++) {
          const tweet = await tweets(i);
          console.log('tweet', tweet);
          const [id, tweetInfo, author, timestamp, likes] = tweet;
          const tweetObject = {
            id: id.toString(),
            tweetInfo,
            author,
            timestamp: new Date(timestamp.toNumber() * 1000),
            likes: likes.toNumber(),
          };
          tweetsArray.push(tweetObject);
          console.log('tweetObject', tweetObject)
        }

        setTweets(tweetsArray);
      }
    } catch (err) {
      // Router to error page
      console.error('err', err);
    }
  }, [tweets, setTweets])


  useEffect(() => {
    checkIfWalletIsConnected();
    getTwitterTweets();
  }, [])

  return (
    <>
      <Header connectWallet={connectWallet} />
      <main>{children}</main>
    </>
  )
}

export default Layout;