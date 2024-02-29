import { calcCartTotal } from './calcCartTotal'
import { calcCartQuantity } from './calcCartQuantity'

export const getCartData = () => {
  const data = localStorage.getItem('cart')
  const items = data ? JSON.parse(data) : []
  return {
    items,
    total: calcCartTotal(items),
    quantity: calcCartQuantity(items),
  }
}
