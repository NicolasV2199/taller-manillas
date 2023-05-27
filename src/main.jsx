import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/styles/styles.css'
import { BraceletsApp } from './BraceletsApp'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <BraceletsApp />
    </React.StrictMode>,
  </BrowserRouter>
)
