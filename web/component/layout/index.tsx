import { useEffect, useCallback, useContext } from "react";
import { AppContext } from '../../context'
import { getContract } from "../../utils";

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
    tweets,
    addTweet
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
        const connectedContract = await getContract(ethereum);
        const tweetsLength = await connectedContract?.getTweetLength();
        const tweets = await connectedContract?.tweets;

        const tweetsArray = [];

        for (let i = 0; i < tweetsLength; i++) {
          const tweet = await tweets(i);
          const [id, tweetInfo, author, timestamp, likes] = tweet;
          const tweetObject = {
            id: id.toString(),
            tweetInfo,
            author,
            timestamp: new Date(timestamp.toNumber() * 1000),
            likes: likes.toNumber(),
          };
          tweetsArray.unshift(tweetObject);
        }

        setTweets(tweetsArray);
      }
    } catch (err) {
      // Router to error page
      console.error('err', err);
    }
  }, [tweets, setTweets])

  const setupListeners = useCallback(async () => {
    if (window.ethereum) {
      const { ethereum } = window;
      const connectedContract = await getContract(ethereum);
      if (connectedContract) {
        connectedContract.on('NewTweet', (author, tweetId, tweetMsg, timeStamp) => {
          console.log('NewTweet', author, tweetId, tweetMsg, timeStamp);
          addTweet({
            id: tweetId.toString(),
            tweetInfo: tweetMsg,
            author,
            timestamp: new Date(timeStamp.toNumber() * 1000),
            likes: 0,
          })
        });
      }
      console.log('setupListeners');
    }
  }, [])


  useEffect(() => {
    checkIfWalletIsConnected();
    getTwitterTweets();
    setupListeners();
  }, [])

  return (
    <>
      <Header connectWallet={connectWallet} />
      <main>{children}</main>
    </>
  )
}

export default Layout;