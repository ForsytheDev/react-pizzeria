import { CartItemType } from '../redux/cart/slice'

export const calcCartTotal = (items: CartItemType[]) => {
  return items.reduce((sum, item) => item.price * item.quantity + sum, 0)
}
