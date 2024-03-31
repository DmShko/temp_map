import React from 'react'
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './tmStore/index.ts'


import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     
    <Provider store={store}>
      
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      
    </Provider>

  </React.StrictMode>,
)
