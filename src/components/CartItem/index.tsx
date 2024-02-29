import React from 'react'

import { MdClear } from 'react-icons/md'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { CartItemType } from '../../redux/cart/slice'
import { addItem, removeItem, dropItem } from '../../redux/cart/slice'

import styles from './CartItem.module.scss'

interface ICartItem {
  item: CartItemType
}

export const CartItem: React.FC<ICartItem> = ({ item }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.item}>
      <div className={styles.description}>
        <img src={item.imageUrl} alt={item.name} />
        <div className={styles.name}>
          <h5>{item.name}</h5>
          <span>
            {item.type} тесто, {item.size} см.
          </span>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.count}>
          <button onClick={() => dispatch(removeItem(item))} disabled={item.quantity < 2}>
            <FaMinus />
          </button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(addItem(item))}>
            <FaPlus />
          </button>
        </div>
        <span>{item.price} ₽</span>
        <button className={styles.remove} onClick={() => dispatch(dropItem(item))}>
          <MdClear />
        </button>
      </div>
    </div>
  )
}
