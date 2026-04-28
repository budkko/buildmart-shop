import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation/Navigation'
import PageFooter from './components/PageFooter/PageFooter'
import StorePage from './pages/StorePage'
import ItemDetailsPage from './pages/ItemDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navigation />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<StorePage />} />
                    <Route path="/product/:id" element={<ItemDetailsPage />} />
                    <Route path="/cart" element={<CheckoutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <PageFooter />
        </div>
    )
}

export default App