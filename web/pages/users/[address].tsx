import { useRouter } from "next/router";
import { useEffect, useCallback, useState } from "react";
import { getContract } from "../../utils";
import styles from '../../styles/UserPage.module.scss';
import { Tweets } from '../../context';
import TweetComponent from '../../component/ui/TweetComponent'

declare let window: any;

const TweetPage = () => {
  const [loading, setLoading] = useState(true)
  const [tweets, SetTweets] = useState<Tweets[]>([])
  const router = useRouter();
  const { address } = router.query;

  const getUserTweets = useCallback(async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const connectedContract = await getContract(ethereum);
        if (connectedContract) {
          let tweetIds = await connectedContract.getUserTweets(address);
          tweetIds = tweetIds.map((tweetId: any) => Number(tweetId.toString()));
          console.log('tweetIds', tweetIds)

          const tweets: Tweets[] = await Promise.all(
            tweetIds.map(async (tweetId: number) => {
              const tweet = await connectedContract.tweets(tweetId);
              const [id, tweetInfo, author, timestamp, likes] = tweet;
              return {
                id: Number(id.toString()),
                tweetInfo: tweetInfo.toString(),
                author,
                timestamp: new Date(timestamp.toNumber() * 1000),
                likes: Number(likes.toString()),
              };
            })
          );
          console.log('tweets', tweets)
          SetTweets(tweets);
          setLoading(false)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }, [address]);


  useEffect(() => {
    console.log('address', address);
    if (!address) {
      setLoading(true)
      // router.push('/')
    } else {
      getUserTweets();
    }
  }, [address, router]);

  return (
    <div className={styles.userPageContainer}>
      {loading && <div> Loading... </div>}
      {!loading && <>
        <h1>{address}</h1>
        <h3>Tweets </h3>
        <div className={styles.userTweetsContainter}>
          {tweets.map((tweet: Tweets) => (
            <TweetComponent key={tweet.id} {...tweet} />
          ))}
        </div>
      </>}
     
    </div>
  )
}

export default TweetPage