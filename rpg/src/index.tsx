import ReactDOM from 'react-dom/client'
import './index.css'
import './styles.scss'
import './commonStyles.scss'
import App from './App'
import store from './redux/store'
import { Provider } from 'react-redux'
import React from 'react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)
