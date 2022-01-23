
const setHasMetamask = (state: any, action: any) => {
  return {
    ...state,
    hasMetamask: action.payload.hasMetamask,
  }
}

const setCurrentAccount = (state: any, action: any) => {
  return {
    ...state,
    currentAccount: action.payload.currentAccount,
  }
}

const setLoading = (state: any, action: any) => {
  return {
    ...state,
    loading: action.payload.loading,
  }
}

const setTweets = (state: any, action: any) => {
  return {
    ...state,
    tweets: action.payload.tweets,
  }
}

export const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'SET_HAS_METAMASK':
      console.log('SET_HAS_METAMASK')
      return setHasMetamask(state, action);
    case 'SET_CURRENT_ACCOUNT':
      return setCurrentAccount(state, action);
    case 'SET_LOADING':
      return setLoading(state, action);
    case 'SET_TWEETS':
      return setTweets(state, action);
    default:
      return state;
    }       
}