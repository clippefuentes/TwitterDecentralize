import { createContext, useMemo, useReducer, useEffect } from 'react';

import { Action } from './action';
import { reducer } from './reducer';

interface AppProps {
  children: React.ReactNode;
}

export const AppContext = createContext({
  hasMetamask: false,
  currentAccount: null,
  loading: true,
  setAccount: (add: string) => {},
  setHasMetamask: (hasMetamask: boolean) => {},
  setLoading: (loading: boolean) => {},
});

const AppContextProvider = ({ children }: AppProps) => {

  const [state, dispatch] = useReducer(reducer, AppContext);

  const ProviderValue = useMemo(() => {
    return {
      hasMetamask: state.hasMetamask,
      currentAccount: state.currentAccount,
      loading: state.loading,
      setAccount: (address: string) => { 
        Action.setAccount(dispatch, address);
      },
      setHasMetamask: (hasMetamask: boolean) => {
        Action.setHasMetamask(dispatch, hasMetamask);
      },
      setLoading: (loading: boolean) => {
        Action.setLoading(dispatch, loading);
      },
    }
  }, [
    state.hasMetamask,
    state.currentAccount,
    state.loading,
  ]);
  
  return (
    <AppContext.Provider value={ProviderValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;