import { useState, useMemo } from 'react'
import { inventory } from '../data/inventory'
import ItemCard from '../components/ItemCard/ItemCard'

function Notification({ text }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl border border-gray-100 px-5 py-3 flex items-center gap-3 animate-bounce">
            <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <span className="font-medium text-gray-900 text-sm">Added {text} to cart</span>
        </div>
    )
}

function StorePage() {
    const [orderBy, setOrderBy] = useState('name-asc')
    const [filtersVisible, setFiltersVisible] = useState(false)
    const [ratingFilter, setRatingFilter] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(400)
    const [notification, setNotification] = useState(null)

    const handleItemAdded = (itemName) => {
        setNotification(itemName)
        setTimeout(() => setNotification(null), 2500)
    }

    const filteredItems = useMemo(() => {
        let results = [...inventory]
        results = results.filter(item => item.price >= minPrice && item.price <= maxPrice)
        if (ratingFilter > 0) results = results.filter(item => item.rating >= ratingFilter - 0.5)
        if (orderBy === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name))
        if (orderBy === 'name-desc') results.sort((a, b) => b.name.localeCompare(a.name))
        if (orderBy === 'price-asc') results.sort((a, b) => a.price - b.price)
        if (orderBy === 'price-desc') results.sort((a, b) => b.price - a.price)
        return results
    }, [orderBy, ratingFilter, minPrice, maxPrice])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            {/* Toast уведомление */}
            {notification && <Notification text={notification} />}

            {/* Заголовок */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900">Building Materials</h1>
                <p className="text-gray-500 mt-1">Premium construction supplies for all your projects</p>
            </div>

            {/* Панель управления */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setFiltersVisible(!filtersVisible)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                        </svg>
                        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
                    </button>
                    <span className="text-sm text-gray-500">Showing {filteredItems.length} products</span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select
                        value={orderBy}
                        onChange={e => setOrderBy(e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500 cursor-pointer"
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
            </div>

            {/* Фильтры */}
            {filtersVisible && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 flex flex-col sm:flex-row gap-8">

                    {/* Рейтинг */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                        <div className="flex items-center gap-4">
                            {[5, 4, 3].map(rating => (
                                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                                    <div
                                        onClick={() => setRatingFilter(ratingFilter === rating ? 0 : rating)}
                                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors
                                            ${ratingFilter === rating ? 'border-orange-500' : 'border-gray-300'}`}
                                    >
                                        {ratingFilter === rating && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                                    </div>
                                    <span className="text-sm text-gray-700">{rating}+ Stars</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Цена */}
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                        <div className="relative h-5 flex items-center">
                            {/* Track background */}
                            <div className="absolute w-full h-1 bg-gray-200 rounded" />
                            {/* Active track */}
                            <div
                                className="absolute h-1 bg-gray-900 rounded"
                                style={{
                                    left: `${(minPrice / 400) * 100}%`,
                                    right: `${100 - (maxPrice / 400) * 100}%`
                                }}
                            />
                            {/* Min thumb */}
                            <input
                                type="range"
                                min={0}
                                max={400}
                                value={minPrice}
                                onChange={e => {
                                    const val = Number(e.target.value)
                                    if (val < maxPrice) setMinPrice(val)
                                }}
                                className="price-range-slider absolute w-full"
                            />
                            {/* Max thumb */}
                            <input
                                type="range"
                                min={0}
                                max={400}
                                value={maxPrice}
                                onChange={e => {
                                    const val = Number(e.target.value)
                                    if (val > minPrice) setMaxPrice(val)
                                }}
                                className="price-range-slider absolute w-full"
                            />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>${minPrice}</span>
                            <span>${maxPrice}</span>
                        </div>
                    </div>

                    {/* Сброс */}
                    <div className="flex items-end">
                        <button
                            onClick={() => { setRatingFilter(0); setMinPrice(0); setMaxPrice(400) }}
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors cursor-pointer"
                        >
                            Clear All Filters
                        </button>
                    </div>

                </div>
            )}

            {/* Сетка товаров */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-20 text-gray-400 text-lg">
                    No products found 😔
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map(item => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onItemAdded={handleItemAdded}
                        />
                    ))}
                </div>
            )}

        </div>
    )
}

export default StorePage
