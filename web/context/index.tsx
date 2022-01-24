import { createContext, useMemo, useReducer, useEffect, Dispatch } from 'react';

import { Action } from './action';
import { reducer } from './reducer';

interface AppProps {
  children: React.ReactNode;
}

export interface Tweets {
  id: string;
  tweetInfo: string;
  author: string;
  timestamp: Date;
  likes: number;
}


interface AppState {
  hasMetamask: boolean;
  currentAccount: string | null;
  loading: boolean;
  setAccount: (address: string) => void;
  setHasMetamask: (hasMetamask: boolean) => void;
  setLoading: (loading: boolean) => void;
  setTweets: (tweets: Tweets[]) => void;
  addTweet: (tweet: Tweets) => void;
  tweets: Tweets[];
}
// id: id.toString(),
//             tweetInfo,
//             author,
//             timestamp: new Date(timestamp.toNumber() * 1000),
//             likes: likes.toNumber(),

export const AppContext = createContext<AppState>({
  hasMetamask: false,
  currentAccount: null,
  loading: true,
  setAccount: (add: string) => {},
  setHasMetamask: (hasMetamask: boolean) => {},
  setLoading: (loading: boolean) => {},
  setTweets: (tweets: Tweets[]) => {},
  addTweet: (tweet: Tweets) => {},
  tweets: [],
});

const AppContextProvider = ({ children }: AppProps) => {
  const [state, dispatch] = useReducer(reducer, AppContext);

  const ProviderValue = useMemo(() => {
    return {
      hasMetamask: state.hasMetamask,
      currentAccount: state.currentAccount,
      loading: state.loading,
      tweets: state.tweets,
      setAccount: (address: string) => { 
        Action.setAccount(dispatch, address);
      },
      setHasMetamask: (hasMetamask: boolean) => {
        Action.setHasMetamask(dispatch, hasMetamask);
      },
      setLoading: (loading: boolean) => {
        Action.setLoading(dispatch, loading);
      },
      setTweets: (tweets: Tweets[]) => {
        Action.setTweets(dispatch, tweets);
      },
      addTweet: (tweet: Tweets) => {
        Action.addTweet(dispatch, tweet);
      },
    }
  }, [
    state.hasMetamask,
    state.currentAccount,
    state.loading,
    state.tweets,
  ]);
  
  return (
    <AppContext.Provider value={ProviderValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;