import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Search } from '../../components'

import { useSelector } from 'react-redux'
import { getCart } from '../../redux/cart/selectors'

import styles from './Header.module.scss'

export const Header: React.FC = () => {
  const { pathname } = useLocation()
  const { items, quantity } = useSelector(getCart)

  const isMounted = React.useRef(false)

  React.useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem('cart', JSON.stringify(items))
    }

    isMounted.current = true
  }, [items])

  return (
    <header className={styles.root}>
      <nav className={styles.navbar}>
        <Link className={styles.logotype} to="/">
          <img src="/assets/LOGO.svg" alt="LOGO" />
          <div className={styles.slogan}>
            <h5>React Pizzeria</h5>
            <span>Самая реактивная пицца во вселенной</span>
          </div>
        </Link>
        {pathname !== '/cart' && (
          <div className={styles.actions}>
            <Search />
          </div>
        )}
        <Link className={styles.cart} to="cart">
          Корзина
          <div className={styles.divider}></div>
          <span>{quantity}</span>
          <svg
            width="13"
            height="11"
            viewBox="0 0 13 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 5.483h11m0 0L7.286 1M12 5.483L7.286 10"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </Link>
      </nav>
    </header>
  )
}
