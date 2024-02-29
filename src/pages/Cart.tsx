import React from 'react'

import { Cart, Empty } from '../components'

import { useSelector } from 'react-redux'
import { getCart } from '../redux/cart/selectors'

export const CartPage: React.FC = () => {
  const { items } = useSelector(getCart)

  return <>{items.length !== 0 ? <Cart /> : <Empty />}</>
}
