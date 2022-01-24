import type { NextPage } from 'next'
import styles from './index.module.scss'
import { 
  // useContext, useEffect, 
  useCallback, useState 
} from 'react';
// import { AppContext } from '../../../context';
import { getContract } from '../../../utils';

declare let window: any;

const TweetForm: NextPage = () => {
  const [tweetMsg, setTweetMsg] = useState('');
  // const { currentAccount } = useContext(AppContext);

  const addTweetToNetwork = useCallback(async () => {
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
  }, [tweetMsg, setTweetMsg]);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetMsg(e.target.value);
  }, [setTweetMsg]);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <textarea className={styles.input} maxLength={300} onChange={handleOnChange} value={tweetMsg}></textarea>
        <button className={styles.button} onClick={addTweetToNetwork}>Tweet</button>
      </div>
    </div>
  )
}

export default TweetForm
