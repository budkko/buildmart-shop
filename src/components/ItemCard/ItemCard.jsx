import { Link } from 'react-router-dom'
import { useShopping } from '../../context/ShoppingContext'

function RatingStars({ score }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => {
                const filled = star <= Math.floor(score)
                const partial = !filled && star === Math.ceil(score) && score % 1 !== 0
                return (
                    <svg key={star} className="w-4 h-4" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id={`half-${star}-${score}`}>
                                <stop offset="50%" stopColor="#FBBF24" />
                                <stop offset="50%" stopColor="#E5E7EB" />
                            </linearGradient>
                        </defs>
                        <path
                            fill={filled ? '#FBBF24' : partial ? `url(#half-${star}-${score})` : '#E5E7EB'}
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                        />
                    </svg>
                )
            })}
            <span className="text-sm text-gray-500 ml-1">({score.toFixed(1)})</span>
        </div>
    )
}

function ItemCard({ item, onItemAdded }) {
    const { addItemToBasket, basket } = useShopping()
    const existsInBasket = basket.some(entry => entry.id === item.id)

    const handleAddClick = () => {
        addItemToBasket(item)
        if (onItemAdded) onItemAdded(item.name)
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200">

            {/* Image */}
            <Link to={`/product/${item.id}`} className="block">
                <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-72 object-cover"
                />
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">

                {/* Name */}
                <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-gray-900 text-base mb-1 leading-snug hover:text-orange-500 transition-colors">
                        {item.name}
                    </h3>
                </Link>

                {/* Rating */}
                <RatingStars score={item.rating} />

                {/* Price */}
                <p className="text-2xl font-bold text-gray-900 mt-2 mb-1">
                    ${item.price}
                </p>

                {/* Subtitle */}
                <p className="text-sm text-gray-500 mb-4 flex-1">{item.subtitle}</p>

                {/* Button */}
                <button
                    onClick={handleAddClick}
                    className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer active:scale-95
                        ${existsInBasket
                            ? 'bg-green-500 text-white hover:bg-green-600'
                            : 'bg-orange-500 text-white hover:bg-orange-600'
                        }`}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {existsInBasket ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>

            </div>
        </div>
    )
}

export { RatingStars }
export default ItemCard
