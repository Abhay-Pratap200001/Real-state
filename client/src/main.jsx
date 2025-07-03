import React from 'react' // step 2 cover app.jsx to provider
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {persistor, store } from './redux/store.js'// Import the Redux store and persistor from the store file

import {Provider} from 'react-redux'// Import Provider to make Redux store available to the app

import { PersistGate } from 'redux-persist/integration/react'// Import PersistGate to delay rendering until persisted state is loaded

createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  <PersistGate loading={null} persistor={persistor}>{/* PersistGate ensures that Redux Persist loads saved state before showing the app */}
  <App />
  </PersistGate>
  </Provider>,// wraps your entire app and gives access to the Redux store.
)
