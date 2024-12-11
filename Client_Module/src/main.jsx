import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import React from 'react'
import Mainstore from './Reduxwork/Mainstore.js'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'


let persistor=persistStore(Mainstore);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={Mainstore}>
      <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
  </StrictMode>,
)
