import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import React from 'react'
import Mainstore from './Reduxwork/Mainstore.js'


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={Mainstore}>
    <App />
    </Provider>
  </StrictMode>,
)
