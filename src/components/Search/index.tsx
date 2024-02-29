import React from 'react'

import debounce from 'lodash.debounce'
import { MdClear } from 'react-icons/md'
import { BsSearch } from 'react-icons/bs'

import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../redux/filter/slice'
import { getSearch } from '../../redux/filter/selectors'

import styles from './Search.module.scss'

export const Search: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const search = useSelector(getSearch)
  const [value, setValue] = React.useState<string>(search || '')

  const searchRef = React.useRef<HTMLInputElement>(null)

  const onSearch = React.useCallback(
    debounce((str) => {
      dispatch(setSearch(str.toLowerCase().trim()))
    }, 700),
    []
  )

  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    onSearch(event.target.value)
  }

  const onClear = () => {
    setValue('')
    dispatch(setSearch(''))
    searchRef.current?.focus()
  }

  return (
    <div className={styles.root}>
      <BsSearch className={styles.icon} />
      <input
        className={styles.searchbar}
        ref={searchRef}
        value={value}
        onChange={onChangeValue}
        type="text"
        spellCheck="false"
        autoComplete="off"
        placeholder="Поиск товара..."
      />
      {value && (
        <button className={styles.clear} onClick={onClear}>
          <MdClear className={styles.icon} />
        </button>
      )}
    </div>
  )
})
