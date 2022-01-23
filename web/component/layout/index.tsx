import { useEffect, useCallback, useContext } from "react";
import { AppContext } from '../../context'

import Header, { HeaderProps } from './header';

export interface LayoutProps {
  header: HeaderProps;
  children: React.ReactNode;
}

declare let window: any;

const Layout = (props: any) => {
  const {
    currentAccount,
    setAccount: setCurrentAccount,
    setHasMetamask,
    setLoading,
  } = useContext(AppContext);

  const { children } = props;

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false);
      } else {
        const { ethereum } = window;
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        setHasMetamask(true);

        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found an authorized account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
      setLoading(false);
    } catch (err) {
      // Router to error page
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false);
      } else {
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });
        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0]);
      }
      setLoading(false);
    } catch (err) {
      // Router to error page
    }
  }, [setCurrentAccount, currentAccount, setLoading])


  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <>
      <Header connectWallet={connectWallet} />
      <main>{children}</main>
    </>
  )
}

export default Layout;