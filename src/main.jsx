// CSS imports
import './index.css'

// Library imports
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

// Component imports
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
        <Toaster/>
    </BrowserRouter>
)
