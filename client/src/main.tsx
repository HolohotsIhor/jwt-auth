import { createContext } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Store from './store/store.ts'

const store = new Store()

interface IStoreContext {
    store: Store
}

// создаём контекст (по умолчанию null, чтобы не было ошибки)
export const Context = createContext<IStoreContext | null>(null)

createRoot(document.getElementById('root')!).render(
    <Context.Provider value={{ store }}>
        <App />
    </Context.Provider>
)
