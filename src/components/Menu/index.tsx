import React from 'react'

import { useSelector } from 'react-redux'
import { getFilters } from '../../redux/filter/selectors'
import { getProduct } from '../../redux/product/selectors'

import { Card, Skeleton, NotFound } from '../../components'

import styles from './Menu.module.scss'

export const Menu: React.FC = () => {
  const { search } = useSelector(getFilters)
  const { items, status } = useSelector(getProduct)

  return (
    <div className={styles.root}>
      <h2>{search ? `Найдено по запросу: «${search}»` : 'Пиццы'}</h2>
      {status === 'ERROR' && <NotFound type="error" />}
      {status === 'SUCCESS' && items.length < 1 && <NotFound type="404" />}
      <div className={styles.list}>
        {status === 'LOADING'
          ? [...new Array(4)].map((item, index) => <Skeleton key={index} />)
          : items.map((item) => <Card key={item.id} {...item} />)}
      </div>
    </div>
  )
}
