import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import { Toaster } from "react-hot-toast";
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#4ade80",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#f87171",
              color: "#fff",
            },
          },
        }}
      />

    </BrowserRouter>
  </StrictMode>,
)
