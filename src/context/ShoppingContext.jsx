import { createContext, useContext, useState, useEffect } from 'react'

const ShoppingContext = createContext()

export function ShoppingProvider({ children }) {
    const [basket, setBasket] = useState(() => {
        const stored = localStorage.getItem('shopping_basket')
        return stored ? JSON.parse(stored) : []
    })

    useEffect(() => {
        localStorage.setItem('shopping_basket', JSON.stringify(basket))
    }, [basket])

    // Добавить товар в корзину
    const addItemToBasket = (item) => {
        setBasket(prev => {
            const found = prev.find(entry => entry.id === item.id)
            if (found) {
                return prev.map(entry =>
                    entry.id === item.id
                        ? { ...entry, quantity: entry.quantity + 1 }
                        : entry
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    // Удалить товар
    const removeItemFromBasket = (id) => {
        setBasket(prev => prev.filter(entry => entry.id !== id))
    }

    // Изменить количество
    const modifyQuantity = (id, quantity) => {
        if (quantity < 1) return
        setBasket(prev =>
            prev.map(entry => entry.id === id ? { ...entry, quantity } : entry)
        )
    }

    // Общее количество товаров для Badge
    const basketTotal = basket.reduce((sum, entry) => sum + entry.quantity, 0)

    return (
        <ShoppingContext.Provider value={{ basket, addItemToBasket, removeItemFromBasket, modifyQuantity, basketTotal }}>
            {children}
        </ShoppingContext.Provider>
    )
}

export function useShopping() {
    return useContext(ShoppingContext)
}