import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Card.module.scss'

interface ICard {
  id: string
  name: string
  imageUrl: string
  prices: number[]
  description: string
}

export const Card: React.FC<ICard> = ({ id, name, imageUrl, prices, description }) => {
  return (
    <Link className={styles.root} to={`product/${id}`}>
      <div className={styles.wrapper}>
        <img src={imageUrl} alt={name} />
        <h4>{name}</h4>
        <p>{description}</p>
      </div>
      <div className={styles.details}>
        <span className={styles.price}>от {prices[0]} ₽</span>
        <button className={styles.add}>Выбрать</button>
      </div>
    </Link>
  )
}
