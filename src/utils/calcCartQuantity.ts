import { CartItemType } from '../redux/cart/slice'

export const calcCartQuantity = (items: CartItemType[]) => {
  return items.reduce((sum, item) => item.quantity + sum, 0)
}
