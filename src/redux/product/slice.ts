import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getProducts } from './actions'

export type ProductParamsType = {
  categoryBy: string
  searchBy: string
  sortBy: string
}

export type ProductType = {
  id: string
  imageUrl: string
  name: string
  types: number[]
  sizes: number[]
  grams: number[][]
  prices: number[]
  description: string
  category: number[]
  rating: number
}

export enum StatusEnum {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

interface IProductState {
  items: ProductType[]
  status: StatusEnum
}

const initialState: IProductState = {
  items: [],
  status: StatusEnum.LOADING,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<ProductType[]>) {
      state.items = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.status = StatusEnum.LOADING
      state.items = []
    })
    builder.addCase(getProducts.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
      state.status = StatusEnum.SUCCESS
      state.items = action.payload
    })
    builder.addCase(getProducts.rejected, (state) => {
      state.status = StatusEnum.ERROR
      state.items = []
    })
  },
})

export const { setItems } = productSlice.actions

export default productSlice.reducer
