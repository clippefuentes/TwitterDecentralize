import type { NextPage } from 'next'
import styles from '../styles/Home.module.scss'
import { useContext, useEffect } from 'react';
import { AppContext } from '../context';

import TweetForm from '../component/form/TweetForm';
import TweetComponent from '../component/ui/TweetComponent';

const Home: NextPage = () => {
  const { tweets } = useContext(AppContext);

  useEffect(() => {
    console.log('tweets', tweets);
  }, [tweets]);
  
  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <TweetForm />
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
