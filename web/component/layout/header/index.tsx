import Link from 'next/link'
import { forwardRef, useCallback, useContext, useEffect } from "react";
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
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          {
            
          }
          <Link href={{
            pathname: '/users/[address]',
            query: {
              address: currentAccount,
            },
          }}>
            Profile
          </Link>
        </li>
      </ul>
    )
  }, [hasMetamask, currentAccount, loading])

  useEffect(() => {
    console.log('CHANGING loading', loading)
  }, [loading])


  const TwitterLogo = forwardRef<any, any>(({ onClick }, ref) => {
    return (
      <BsTwitter style={{ cursor: 'pointer' }} onClick={onClick} />
    )
  })

  return (
    <header className={styles.header}>
      <div>
        <Link href="/">
          <TwitterLogo />
        </Link>
      </div>
      <nav className={styles.headerNav}>
        <HeaderNavigation />
      </nav>
    </header>
  )
};

export default Header;