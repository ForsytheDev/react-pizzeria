import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getCartData } from '../../utils/getLocalStorageData'
import { calcCartTotal } from '../../utils/calcCartTotal'
import { calcCartQuantity } from '../../utils/calcCartQuantity'

export type CartItemType = {
  id: string
  imageUrl: string
  name: string
  type: string
  size: number
  grams: number
  price: number
  quantity: number
  description: string
  category: number
  rating: number
}

interface ICartState {
  total: number
  quantity: number
  items: CartItemType[]
}

const { items, total, quantity } = getCartData()

const initialState: ICartState = {
  items,
  total,
  quantity,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const replica = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (replica) {
        replica.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total = calcCartTotal(state.items)
      state.quantity = calcCartQuantity(state.items)
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      const replica = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (replica) {
        replica.quantity--
      }
      state.total = calcCartTotal(state.items)
      state.quantity = calcCartQuantity(state.items)
    },
    dropItem(state, action: PayloadAction<CartItemType>) {
      const replica = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size
      )
      if (replica) {
        state.items = state.items.filter(
          (item) =>
            item.id !== action.payload.id ||
            item.type !== action.payload.type ||
            item.size !== action.payload.size
        )
      }
      state.total = calcCartTotal(state.items)
      state.quantity = calcCartQuantity(state.items)
    },
    clearItems(state) {
      state.items = []
      state.total = 0
      state.quantity = 0
    },
  },
})

export const { addItem, removeItem, dropItem, clearItems } = cartSlice.actions

export default cartSlice.reducer
