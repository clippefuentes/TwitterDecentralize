import Link from 'next/link'
import { useRouter } from "next/router";
import { useEffect, useCallback, useState } from "react";
// import { GetStaticPropsContext, GetServerSideProps } from "next";
import { getContract } from "../../utils";
import styles from '../../styles/TweetPage.module.scss'
import stylesFromForm from '../../component/form/TweetForm/index.module.scss'
import { Tweets } from '../../context'
import TweetForm from '../../component/form/TweetForm'

declare let window: any;

export interface Comment {
  commentId: string;
  comment: string;
  author: string;
  commentTimestamp: Date;
}

const TweetPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tweet, setTweet] = useState<Tweets>({
    id: '',
    tweetInfo: '',
    author: '',
    timestamp: new Date(),
    likes: 0,
  })
  const [comments, setComments] = useState<Comment[]>([])

  const { tweetId } = router.query;

  useEffect(() => {
    if (!tweetId) {
      router.push('/')
    } else {
      getTweet();
      getComments();
    }
  }, [tweetId, router])

  useEffect(() => {
    if (window.ethereum) {
      // getTweet();
      // getComments();
      setupListeners();
    }
    return () => {
      removeListeners();
    }
  }, [])

  const getTweet = useCallback(async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const connectedContract = await getContract(ethereum);
        if (connectedContract) {
          const tweet = await connectedContract.tweets(tweetId);
          const [id, tweetInfo, author, timestamp, likes] = tweet;
          const tweetObject = {
            id: id.toString(),
            tweetInfo,
            author,
            timestamp: new Date(timestamp.toNumber() * 1000),
            likes: likes.toNumber(),
          };
          setTweet(tweetObject);
          setLoading(false)
          console.log('tweet', tweet);
        }
      }
    } catch(err) {
      console.error(err)
    }
  }, [tweetId]);

  const getComments = useCallback(async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const connectedContract = await getContract(ethereum);
        if (connectedContract) {
          let comments:any[] = await connectedContract.getTweetComments(tweetId);

          comments = comments.map((com: any) => {
            const [commentId, comment, author, commentTimestamp] = com;
            const tweetObject = {
              commentId: commentId.toString(),
              comment,
              author,
              commentTimestamp: new Date(commentTimestamp.toNumber() * 1000).toLocaleString(),
            };
            return tweetObject;
          }).reverse();
          setComments(comments);
        }
      }
    } catch(err) {
      console.error(err)
    }
  }, [tweetId])

  const addCommentToTweet = useCallback(async (comment, setComment) => {
    if (!comment || comment === '') {
      alert('Please enter a tweet');
      return;
    }
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const connectedContract = await getContract(ethereum);
        console.log('tweet', comment);
        console.log('tweetId', tweetId)
        console.log('window.ethereum.selectedAddress', ethereum.selectedAddress);
        if (connectedContract) {
          await connectedContract.addComment(comment, tweetId, {
            from: window.ethereum.selectedAddress,
            gasLimit: 3000000
          });
        setComment('');
        }
      }
    } catch(err) {
      //
      console.error(err);
    }
  }, []);

  const setupListeners = useCallback(async () => {
    if (window.ethereum) {
      const { ethereum } = window;
      const connectedContract = await getContract(ethereum);
      if (connectedContract) {
        connectedContract.on('NewComment', async () => {
          console.log('NEW COMMENT');
          await getComments();
        });
      }
      console.log('setupListeners');
    }
  }, [])

  const removeListeners = useCallback(async () => {
    if (window.ethereum) {
      const { ethereum } = window;
      const connectedContract = await getContract(ethereum);
      if (connectedContract) {
        connectedContract.removeAllListeners('NewComment');
      }
      console.log('removeListeners');
    }
  }, [])

  const CommentSection = useCallback(() => {
    console.log('comments', comments);
    return (
      <div className={styles.commentContainer}>
        <TweetForm submit={addCommentToTweet} buttonText="Add Comment" />
        <h3>Comments: </h3>
        { /** TODO: Change indx */}
        {comments && comments.length ? comments.map((comment: Comment, indx: number) => {
          return (
            <div className={styles.tweetComments} key={indx}>
              <p>{comment.comment}</p>
              <h5>Comment By: {comment.author}</h5>
              <h5 suppressHydrationWarning>Tweet on: {comment.commentTimestamp}</h5>
            </div>
          )
        }) : "No Comments"}
      </div>
    )
  }, [setComments, comments])

  return (
    <div className={styles.container}>
      {loading && <div> Loading... </div>}
      {!loading && (<>
        <div className={styles.tweetContainer}>
        <p>{tweet.tweetInfo}</p>
        <div className={styles.tweetContainerFooter}>
          <h5>Tweet By: <Link href={{
              pathname: '/users/[address]',
              query: {
                address: tweet.author,
              },
            }}><span className={styles.tweetUser}>{tweet.author}</span></Link>
          </h5>
          <h5 suppressHydrationWarning>Tweet on: {tweet.timestamp.toLocaleString()}</h5>
          <h5>Likes: {tweet.likes}</h5>
        </div>
      </div>
      <button className={stylesFromForm.button}>Like</button>
      {
        CommentSection()
      }
      </>)}
    
    </div>
  )
}

export async function getServerSideProps(contextProps: any) {
  console.log('contextProps', contextProps.params)
  return {
    props: contextProps?.params
  };
}

export default TweetPage;