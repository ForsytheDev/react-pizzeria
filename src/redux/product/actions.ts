import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

import { ProductParamsType, ProductType } from './slice'

export const getProducts = createAsyncThunk<ProductType[], ProductParamsType>(
  'product/getProducts',
  async (params) => {
    const { categoryBy, searchBy, sortBy } = params
    const { data } = await axios.get(
      `https://4edf14884e09b2ff.mokky.dev/products?${categoryBy}&${searchBy}&${sortBy}`
    )
    return data
  }
)
