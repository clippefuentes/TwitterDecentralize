import { useCallback, useContext, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

import styles from "./index.module.scss";
import { AppContext } from "../../../context/";

export interface HeaderProps {
  connectWallet: () => void;
};

const Header = (props: HeaderProps) => {
  const {
    hasMetamask,
    currentAccount,
    loading,
  } = useContext(AppContext);

  const { connectWallet } = props;

  const HeaderNavigation = useCallback(() => {
    if (loading || loading === undefined) {
      return null;
    }
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
  }, [hasMetamask, currentAccount, loading])

  useEffect(() => {
    console.log('CHANGING loading', loading)
  }, [loading])


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