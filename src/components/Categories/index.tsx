import React from 'react'

import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { setCategory } from '../../redux/filter/slice'

import styles from './Categories.module.scss'

import { categories } from '../../pages/Home'

interface ICategories {
  category: number
}

export const Categories: React.FC<ICategories> = React.memo(({ category }) => {
  const dispatch = useDispatch()

  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {categories.map((value, index) => (
          <li key={index}>
            <button
              className={cn(styles.item, { [styles.selected]: category === index })}
              onClick={() => dispatch(setCategory(index))}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})
