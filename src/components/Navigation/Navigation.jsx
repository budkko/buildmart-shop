import { Link } from 'react-router-dom'
import { useShopping } from '../../context/ShoppingContext'

function Navigation() {
    const { basketTotal } = useShopping()

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">BM</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">BuildMart</span>
                </Link>

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Products</Link>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Categories</Link>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Deals</Link>
                    <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">About</Link>
                </nav>

                {/* Search */}
                <div className="flex-1 max-w-xl">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-full bg-white focus:outline-none focus:border-gray-400 text-sm"
                        />
                    </div>
                </div>

                {/* Cart */}
                <Link to="/cart" className="relative flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {basketTotal > 0 && (
                        <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {basketTotal}
                        </span>
                    )}
                </Link>

            </div>
        </header>
    )
}

export default Navigation
