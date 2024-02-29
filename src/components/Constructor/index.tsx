import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import cn from 'classnames'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { CartItemType, addItem } from '../../redux/cart/slice'

import { PizzaSkeleton, SelectorSkeleton } from '../../components'

import styles from './Constructor.module.scss'

interface IProportions {
  value: number
  label: string
}

const doughs: string[] = ['Традиционное', 'Тонкое']

const proportions: IProportions[] = [
  {
    value: 25,
    label: 'Маленькая',
  },
  {
    value: 30,
    label: 'Средняя',
  },
  {
    value: 35,
    label: 'Большая',
  },
]

interface IProduct {
  id: string
  imageUrl: string
  name: string
  description: string
  types: number[]
  sizes: number[]
  grams: number[][]
  prices: number[]
  category: number[]
  rating: number
}

export const Constructor: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const dispath = useDispatch()

  const [product, setProduct] = React.useState<IProduct>()
  const [targetType, setTargetType] = React.useState<number>(0)
  const [targetSize, setTargetSize] = React.useState<number>(0)

  const onFetch = async () => {
    try {
      const response = await axios.get(`https://4edf14884e09b2ff.mokky.dev/products?id=${id}`)
      const data = response.data[0]
      setProduct(data)
      setTargetType(data.types[0])
      setTargetSize(data.sizes[0])
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    onFetch()
  }, [id])

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const dough = doughs[targetType]
  const proportion = proportions[targetSize].value
  const weight = product?.grams[targetType][targetSize]

  const onClose = () => {
    navigate(`/`)
  }

  const onAdd = () => {
    dispath(
      addItem({
        id: product?.id,
        name: product?.name,
        imageUrl: product?.imageUrl,
        type: dough,
        size: proportion,
        price: product?.prices[targetSize],
      } as CartItemType)
    )
    onClose()
  }

  return (
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.inner}>
        <div className={styles.builder}>
          <div className={styles.visualizer}>
            {product ? <img src={product.imageUrl} alt={product.name} /> : <PizzaSkeleton />}
          </div>
          <div className={styles.table}>
            {product ? (
              <>
                <div className={styles.information}>
                  <h5>{product.name}</h5>
                  <span>
                    {proportion} см, {dough} тесто, {weight} г
                  </span>
                  <p>{product.description}</p>
                </div>
                <div className={styles.selector}>
                  <ul className={styles.list}>
                    {proportions.map((size, index) => (
                      <li key={size.value}>
                        <button
                          className={cn(styles.item, {
                            [styles.selected]: targetSize === index,
                            [styles.disabled]: !product.sizes.includes(index),
                          })}
                          onClick={() => setTargetSize(index)}
                          disabled={!product.sizes.includes(index)}
                        >
                          {size.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <ul className={styles.list}>
                    {doughs.map((type, index) => (
                      <li key={type}>
                        <button
                          className={cn(styles.item, {
                            [styles.selected]: targetType === index,
                            [styles.disabled]: !product.types.includes(index),
                          })}
                          onClick={() => setTargetType(index)}
                          disabled={!product.types.includes(index)}
                        >
                          {type}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={styles.add} onClick={onAdd}>
                  Добавить в корзину за {product.prices[targetSize]}
                </button>
              </>
            ) : (
              <SelectorSkeleton />
            )}
          </div>
        </div>
        <button className={styles.closer} onClick={onClose}>
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
              fill="white"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
