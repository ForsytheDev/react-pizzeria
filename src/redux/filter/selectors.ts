import { RootState } from '../store'

export const getFilters = (state: RootState) => state.filter

export const getSearch = (state: RootState) => state.filter.search

export const getCategory = (state: RootState) => state.filter.category

export const getSortery = (state: RootState) => state.filter.sortery
