import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Empty.module.scss'

export const Empty: React.FC = () => {
  return (
    <div className={styles.root}>
      <h5 className={styles.head}>Корзина пустая</h5>
      <p className={styles.description}>
        Вероятнее всего, вы еще не выбрали пиццу.
        <br />
        Для того, чтобы сделать заказ, перейди на главную и добавь что-нибудь в корзину!
      </p>
      <img src="/assets/shopping.svg" alt="No items" />
      <Link className={styles.action} to="/">
        Вернуться назад
      </Link>
    </div>
  )
}
