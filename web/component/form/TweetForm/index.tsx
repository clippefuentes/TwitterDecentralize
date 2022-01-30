import styles from './index.module.scss'
import { 
  useCallback, useState 
} from 'react';

interface TweetForm {
  submit: (tweetMsg: string, setTweetMsg: any) => void;
  buttonText: string;
}

const TweetForm = (props: TweetForm) => {
  const {
    submit,
    buttonText,
  } = props;
  const [text, setText] = useState('');

  const addTweetToNetwork = useCallback(async () => {
    if (!text || text === '') {
      alert('Please enter a tweet');
      return;
    }
    try {
      submit(text, setText);
    } catch(err) {
      console.error(err);
    }
  }, [text, setText]);

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, [setText]);

  return (
    <div className={styles.container}>
      <div className={styles.postContainer}>
        <textarea className={styles.input} maxLength={300} onChange={handleOnChange} value={text}></textarea>
        <button className={styles.button} onClick={addTweetToNetwork}>{buttonText}</button>
      </div>
    </div>
  )
}

export default TweetForm
