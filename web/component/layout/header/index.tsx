import { useEffect, useState, useCallback } from "react";
import { BsTwitter } from "react-icons/bs";
import { ethers } from "ethers";

import styles from "./index.module.scss"

declare let window: any;

const Header = () => {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setHasMetamask(false);
      } else {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('provider', provider);
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
    } catch (err) {
      // Router to error page
    }
  }, [setCurrentAccount, currentAccount])

  const HeaderNavigation = useCallback(() => {
    if (!hasMetamask) {
      return (
        <ul>
          <li>
            <a href="#">Please Install Metamask</a>
          </li>
        </ul>
      )
    }

    if (!currentAccount) {
      return (
        <ul>
          <li>
            <a href="#" onClick={connectWallet}>Please Connect Account from Metamask</a>
          </li>
        </ul>
      )
    }

    // const checkNetwork = useCallback(async () => {
    //   try {
    //     if (window.ethereum.networkVersion !== '4') {
    //       alert("Please connect to Rinkeby!")
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }, []) 

    return (
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
      </ul>
    )
  }, [hasMetamask, currentAccount])

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <header className={styles.header}>
      <div>
        <BsTwitter />
      </div>
      <nav className={styles.headerNav}>
        <HeaderNavigation />
      </nav>
    </header>
  )
};

export default Header;