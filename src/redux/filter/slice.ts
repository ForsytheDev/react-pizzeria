import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum SorteryEnum {
  RATING = '-rating',
  NAME = 'name',
  PRICE = '-prices',
}

export type SorteryType = {
  type: string
  property: SorteryEnum
}

export interface IFilterState {
  search: string
  category: number
  sortery: SorteryType
}

const initialState: IFilterState = {
  search: '',
  category: 0,
  sortery: {
    type: 'популярности',
    property: SorteryEnum.RATING,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload
    },
    setSortery(state, action: PayloadAction<SorteryType>) {
      state.sortery = action.payload
    },
    setFilters(state, action: PayloadAction<IFilterState>) {
      if (Object.keys(action.payload).length) {
        state.search = String(action.payload.search)
        state.category = Number(action.payload.category)
        state.sortery = action.payload.sortery
      } else {
        state.search = ''
        state.category = 0
        state.sortery = {
          type: 'популярности',
          property: SorteryEnum.RATING,
        }
      }
    },
  },
})

export const { setSearch, setCategory, setSortery, setFilters } = filterSlice.actions

export default filterSlice.reducer
