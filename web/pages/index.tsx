import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { useContext, useEffect, useCallback} from 'react';
import { AppContext } from '../context';

import TweetForm from '../component/form/TweetForm';
import TweetComponent from '../component/ui/TweetComponent';

import { getContract } from '../utils';

declare let window: any;

const Home: NextPage = () => {
  const { tweets } = useContext(AppContext);

  useEffect(() => {
    console.log('tweets', tweets);
  }, [tweets]);

  const addTweetToNetwork = useCallback(async (tweetMsg, setTweetMsg) => {
    if (!tweetMsg || tweetMsg === '') {
      alert('Please enter a tweet');
      return;
    }
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const connectedContract = await getContract(ethereum);
        console.log('tweet', tweetMsg);
        console.log('window.ethereum.selectedAddress', ethereum.selectedAddress);
        if (connectedContract) {
          await connectedContract.createTweet(tweetMsg, {
            from: window.ethereum.selectedAddress,
            gasLimit: 3000000
          });
          setTweetMsg('');
        }
      }
    } catch(err) {
      //
      console.error(err);
    }
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <TweetForm submit={addTweetToNetwork} buttonText='Tweet' />
        {
          tweets && tweets.map((tweet, index) => {
            return (
              <TweetComponent key={index} {...tweet} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
