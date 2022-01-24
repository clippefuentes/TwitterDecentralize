import { useRouter } from "next/router";

const TweetPage = () => {
  const router = useRouter()

  const { tweetId } = router.query;

  return (
    <div>
      <h1>Tweet Page</h1>
      <p>Tweet ID: {tweetId}</p>
    </div>
  )
} 

export default TweetPage;