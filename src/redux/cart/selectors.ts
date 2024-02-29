import { RootState } from '../store'

export const getCart = (state: RootState) => state.cart

export const getCartItem = (id: string, type: string, size: number) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id && item.type === type && item.size === size)
