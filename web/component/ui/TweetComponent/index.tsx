import { forwardRef } from 'react';
import Link from 'next/link'
import styles from './index.module.scss'

interface TweetProps {
  tweetInfo: string;
  id: string;
  author: string;
  timestamp: Date;
  likes: number;
}

const Tweet = (props: TweetProps) => {
  const {
    tweetInfo,
    author,
    timestamp,
    likes,  
    id,  
  } = props;

  const TweetComponent = forwardRef<any, any>(({ onClick }, ref) => {
    return (
      <div className={styles.tweetContainer} onClick={onClick} ref={ref}>
        <div className={styles.headerTweet}>
          <h4>{author}</h4>
        </div>
        <div className={styles.bodyTweet}>
          <p>{tweetInfo}</p>
        </div>
        <div className={styles.footerTweet}>
          <p>{timestamp.toLocaleString()}</p>
          <p>Likes: {likes}</p>
        </div>
      </div>
    )
  })

  return (
    <Link href={{
      pathname: '/tweets/[tweetId]',
      query: {
        tweetId: id,
      },
    }}>
      <TweetComponent />
    </Link>
  )
}

export default Tweet;