import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { inventory } from '../data/inventory'
import { useShopping } from '../context/ShoppingContext'
import { RatingStars } from '../components/ItemCard/ItemCard'
import ItemCard from '../components/ItemCard/ItemCard'

function ItemDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const selectedItem = inventory.find(item => item.id === Number(id))
  const { addItemToBasket, basket } = useShopping()
  const [activeImage, setActiveImage] = useState(0)
  const [specsExpanded, setSpecsExpanded] = useState(false)
  const [amount, setAmount] = useState(1)
  const [justAdded, setJustAdded] = useState(false)

  if (!selectedItem) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-xl mb-4">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors cursor-pointer"
        >
          Back to catalog
        </button>
      </div>
    )
  }

  const similarItems = inventory.filter(item => item.id !== selectedItem.id && item.subtitle === selectedItem.subtitle).slice(0, 3)
  const specifications = selectedItem.specs || []
  const isInBasket = basket.some(entry => entry.id === selectedItem.id)

  const showPreviousImage = () => setActiveImage(idx => idx === 0 ? selectedItem.images.length - 1 : idx - 1)
  const showNextImage = () => setActiveImage(idx => idx === selectedItem.images.length - 1 ? 0 : idx + 1)

  const handleAddToBasket = () => {
    for (let i = 0; i < amount; i++) addItemToBasket(selectedItem)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-700 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-gray-900">{selectedItem.name}</span>
      </div>

      {/* Main block */}
      <div className="flex flex-col lg:flex-row gap-12 mb-12">

        {/* Left — image slider */}
        <div className="lg:w-1/2">
          <div className="relative rounded-xl overflow-hidden bg-gray-100 mb-4">
            <img
              src={selectedItem.images[activeImage]}
              alt={selectedItem.name}
              className="w-full h-96 object-cover transition-all duration-500"
            />
            <button
              onClick={showPreviousImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 text-xl font-bold"
            >
              &lt;
            </button>
            <button
              onClick={showNextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-gray-700 text-xl font-bold"
            >
              &gt;
            </button>
          </div>

          <div className="flex gap-3">
            {selectedItem.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`w-28 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer
                  ${activeImage === index ? 'border-orange-500' : 'border-gray-200 hover:border-gray-400'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="lg:w-1/2">

          <h1 className="text-4xl font-bold text-gray-900 mb-3">{selectedItem.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <RatingStars score={selectedItem.rating} />
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-4xl font-bold text-gray-900">${selectedItem.price}</span>
            <span className="text-gray-500">/unit</span>
          </div>

          {/* Feature icons */}
          <div className="flex items-start gap-6 py-4 border-t border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Quality Assured</p>
                <p className="text-xs text-gray-500">Premium grade material</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Fast Delivery</p>
                <p className="text-xs text-gray-500">2-5 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 text-orange-500 flex-shrink-0">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">30-day guarantee</p>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-5">
            <p className="font-semibold text-gray-900 mb-2">Quantity</p>
            <div className="flex items-center gap-0">
              <button
                onClick={() => setAmount(qty => Math.max(1, qty - 1))}
                className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-lg font-medium text-gray-700"
              >
                -
              </button>
              <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center font-semibold text-gray-900">
                {amount}
              </div>
              <button
                onClick={() => setAmount(qty => qty + 1)}
                className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer text-lg font-medium text-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToBasket}
              className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer
                ${isInBasket ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isInBasket ? 'Added to Cart ✓' : justAdded ? 'Added ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={() => { handleAddToBasket(); navigate('/cart') }}
              className="w-full py-4 border-2 border-orange-500 text-orange-500 rounded-lg font-semibold text-lg hover:bg-orange-50 active:scale-95 transition-all cursor-pointer"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* Description + Technical Specifications accordion */}
      <div className="border border-gray-200 rounded-xl overflow-hidden max-w-4xl mb-12">
        {/* Description always visible */}
        <div className="px-6 py-5">
          <p className="text-gray-600 leading-relaxed text-base">{selectedItem.description}</p>
        </div>

        {/* Accordion — Technical Specifications */}
        <div className="border-t border-gray-200">
          <button
            onClick={() => setSpecsExpanded(!specsExpanded)}
            className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${specsExpanded ? 'rotate-180' : ''}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>

          <div className={`overflow-hidden transition-all duration-300 ${specsExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
            <div className="bg-gray-50 px-6 py-4">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-2">
                  {specifications.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`px-6 py-4
                        ${idx % 2 === 0 ? 'border-r border-gray-200' : ''}
                        ${idx < specifications.length - 2 ? 'border-b border-gray-200' : ''}
                      `}
                    >
                      <p className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-medium">{spec.label}</p>
                      <p className="font-semibold text-gray-900 text-base">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {similarItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default ItemDetailsPage
