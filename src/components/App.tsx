import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Header, Constructor } from '../components'
import { HomePage, CartPage } from '../pages'

export const App: React.FC = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="product/:id" element={<Constructor />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  )
}
