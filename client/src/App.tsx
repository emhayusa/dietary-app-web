
import './App.css'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from './context/ToastContext'

function App() {
    return (
        <ToastProvider>
            <div className="app-main">
                <AppRoutes />
            </div>
        </ToastProvider>
    )
}

export default App
