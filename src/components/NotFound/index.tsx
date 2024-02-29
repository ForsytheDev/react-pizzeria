import React from 'react'

import styles from './NotFound.module.scss'

interface ITypes {
  type: string
  message: string
  description: string
}

const types: ITypes[] = [
  {
    type: 'error',
    message: 'Произошла ошибка',
    description:
      'К сожалению, не удалось получить информацию о пиццах. Не волнуйтесь, в ближайшее время мы все починим!',
  },
  {
    type: '404',
    message: 'Ничего не найдено',
    description: 'Похоже, по вашему запросу не было ничего найдено.',
  },
]

interface INotFound {
  type: string
}

export const NotFound: React.FC<INotFound> = ({ type }) => {
  const targetType = types.find((object) => object.type === type)

  return (
    <div className={styles.root}>
      <h5 className={styles.head}>{targetType?.message}</h5>
      <p className={styles.description}>{targetType?.description}</p>
    </div>
  )
}
