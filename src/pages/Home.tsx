import React from 'react'
import { Outlet } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { useAppDispatch } from '../redux/store'

import { Categories, Sort, Menu } from '../components'

import { getFilters } from '../redux/filter/selectors'
import { SorteryEnum } from '../redux/filter/slice'
import { getProducts } from '../redux/product/actions'

export interface ISorteries {
  type: string
  property: SorteryEnum
}

export const categories: string[] = ['Все', 'Мясные', 'Веганские', 'Гриль', 'Острые', 'Морские']
export const sorteries: ISorteries[] = [
  { type: 'популярности', property: SorteryEnum.RATING },
  { type: 'алфавиту', property: SorteryEnum.NAME },
  { type: 'стоимости', property: SorteryEnum.PRICE },
]

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { search, category, sortery } = useSelector(getFilters)

  const onFetch = async () => {
    const searchBy = search !== '' ? `name=*${search}` : ''
    const categoryBy = category > 0 ? `category[]=${category}` : ''
    const sortBy = `sortBy=${sortery.property}`

    dispatch(getProducts({ categoryBy, searchBy, sortBy }))

    window.scrollTo(0, 0)
  }

  React.useEffect(() => {
    onFetch()
  }, [search, category, sortery.property])

  return (
    <>
      <Outlet />
      <div className="controls">
        <Categories category={category} />
        <Sort sortery={sortery} />
      </div>
      <Menu />
    </>
  )
}
