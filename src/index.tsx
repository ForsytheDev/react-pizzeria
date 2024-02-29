import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { App } from './components/App'

import { store } from './redux/store'

import './styles/normalize.scss'
import './styles/global.scss'

const root = document.getElementById('root')

if (root) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}
