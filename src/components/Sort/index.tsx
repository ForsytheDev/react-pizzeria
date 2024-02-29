import React from 'react'

import cn from 'classnames'
import { TiArrowSortedDown } from 'react-icons/ti'
import { useDispatch } from 'react-redux'
import { SorteryType, setSortery } from '../../redux/filter/slice'

import styles from './Sort.module.scss'

import { sorteries } from '../../pages/Home'

interface ISort {
  sortery: SorteryType
}

export const Sort: React.FC<ISort> = React.memo(({ sortery }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const popupRef = React.useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()

  React.useEffect(() => {
    const subscribe = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.body.addEventListener('click', subscribe)

    return () => {
      document.body.removeEventListener('click', subscribe)
    }
  }, [])

  return (
    <div className={styles.root} ref={popupRef}>
      <div className={styles.selector}>
        <span>
          <TiArrowSortedDown /> Сортировать по
        </span>
        <button className={styles.extend} onClick={() => setIsOpen(!isOpen)}>
          {sortery.type}
        </button>
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <ul className={styles.list}>
            {sorteries.map((object, index) => (
              <li key={index}>
                <button
                  className={cn(styles.item, {
                    [styles.selected]: sortery.property === object.property,
                  })}
                  onClick={() => {
                    dispatch(setSortery(object))
                    setIsOpen(false)
                  }}
                >
                  {object.type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
})
