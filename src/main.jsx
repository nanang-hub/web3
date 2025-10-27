// Ini adalah titik masuk ke Website React, dimana saya merender komponen App ke dalam DOM atau index.html.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
