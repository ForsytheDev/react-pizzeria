import React from 'react'
import { Link } from 'react-router-dom'

import { CartItem } from '../../components'

import { GoTrash } from 'react-icons/go'
import { PiShoppingCart } from 'react-icons/pi'
import { IoIosArrowBack } from 'react-icons/io'

import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../redux/cart/selectors'
import { clearItems } from '../../redux/cart/slice'

import styles from './Cart.module.scss'

export const Cart: React.FC = () => {
  const dispatch = useDispatch()
  const { total, quantity, items } = useSelector(getCart)

  return (
    <div className={styles.root}>
      <div className={styles.head}>
        <h2>
          <PiShoppingCart /> Корзина
        </h2>
        <button className={styles.clear} onClick={() => dispatch(clearItems())}>
          <GoTrash /> Очистить
        </button>
      </div>
      <div className={styles.body}>
        <ul className={styles.list}>
          {items.map((item, index) => (
            <li key={index}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.foot}>
        <div className={styles.details}>
          <span>
            Всего товаров: <b>{quantity} шт.</b>
          </span>
          <span className={styles.total}>
            Сумма заказа: <b>{total} ₽</b>
          </span>
        </div>
        <div className={styles.controls}>
          <Link className={styles.back} to="/">
            <IoIosArrowBack className={styles.icon} /> Вернуться назад
          </Link>
          <button className={styles.pay}>Перейти к оплате</button>
        </div>
      </div>
    </div>
  )
}
