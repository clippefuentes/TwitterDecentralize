import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useContext, useEffect } from 'react';
import { AppContext } from '../context';

const Home: NextPage = () => {
  const { tweets } = useContext(AppContext);

  useEffect(() => {
    console.log('CHANGING tweets', tweets)
  }, [tweets])

  return (
    <div className={styles.container}>
      {
        tweets && tweets.map((tweet, index) => {
          return (
            <div key={index}>
              <h1>{tweet.tweetInfo}</h1>
              <p>{tweet.author}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Home
