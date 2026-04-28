# Документация проекта BuildMart — Интернет-магазин строительных материалов

---

## Соответствие требованиям технического задания

### 2. Технические требования

| Требование | Реализация |
|---|---|
| JavaScript ES6+ | Используются стрелочные функции, деструктуризация, spread-оператор, модули `import/export`, `const/let`, шаблонные строки, методы массивов (`map`, `filter`, `find`, `reduce`, `some`) |
| Фреймворк | React 18 — компонентный подход, хуки (`useState`, `useEffect`, `useMemo`, `useContext`, `useParams`) |
| Стилизация | TailwindCSS v4 — утилитарные классы, адаптивные префиксы (`sm:`, `md:`, `lg:`), кастомный CSS для ползунка |
| Адаптивность 375px–1440px | Сетка карточек: 1 колонка → 2 → 3. Таблица корзины: мобильный flex-layout / десктоп grid. Навигация скрыта на мобильных. Футер: 1 → 2 → 4 колонки |
| localStorage | `CartContext.jsx`: инициализация из `localStorage` при загрузке, синхронизация через `useEffect` при каждом изменении корзины |
| Deployment | Приложение собирается через Vite и может быть задеплоено на Vercel / Netlify / GitHub Pages |

---

### 3.1. Header — реализация

| Требование | Где реализовано |
|---|---|
| Логотип — ссылка на главную | `<Link to="/">` с логотипом BM и текстом BuildMart в `Header.jsx` |
| Навигационное меню | `<nav>` с 4 пунктами: Products, Categories, Deals, About |
| Иконка корзины с Badge | SVG-иконка + `{cartCount > 0 && <span>{cartCount}</span>}` — условный рендер |
| Счётчик в реальном времени | `cartCount` берётся из `CartContext` через `useCart()`. При любом изменении корзины React автоматически перерендерит Header |

---

### 3.2. Страница «Каталог» — реализация

| Требование | Где реализовано |
|---|---|
| Список карточек товаров | `CatalogPage.jsx` — grid 1/2/3 колонки, компонент `ProductCard` |
| Сортировка по алфавиту (A–Z, Z–A) | `sortBy === 'name-asc'` / `'name-desc'` → `localeCompare` в `useMemo` |
| Сортировка по цене (возр./убыв.) | `sortBy === 'price-asc'` / `'price-desc'` → `a.price - b.price` |
| Фильтр по диапазону цены (min/max) | Двойной `<input type="range">` — состояния `priceMin` и `priceMax`, фильтр `p.price >= priceMin && p.price <= priceMax` |
| Фильтр по рейтингу | Кастомные radio-кнопки (3+, 4+, 5+ Stars), фильтр `p.rating >= minRating - 0.5` |
| Кнопка «Добавить в корзину» без перехода | `handleAdd()` в `ProductCard` вызывает `addToCart()` из контекста, страница не меняется |
| Клик по названию/фото → страница товара | `<Link to={/product/${product.id}}>` оборачивает и фото, и название |

---

### 3.3. Страница «Карточка товара» — реализация

| Требование | Где реализовано |
|---|---|
| Слайдер с минимум 3 изображениями | `ProductPage.jsx` — состояние `currentImage`, кнопки `<` / `>`, миниатюры внизу. Каждый товар имеет 3 изображения в `products.js` |
| Название, цена, рейтинг, кнопка | Правая колонка страницы товара: `h1`, `$price`, `<StarRating>`, кнопка Add to Cart |
| Аккордеон «Расширенное описание» | Состояние `accordionOpen`, CSS `max-h-0` / `max-h-[500px]` + `overflow-hidden transition-all duration-300` — плавная анимация без JS |
| Смена состояния кнопки если товар в корзине | `inCart = cart.some(item => item.id === product.id)` → кнопка зелёная "Added to Cart ✓" |

---

### 3.4. Страница «Корзина» — реализация

| Требование | Где реализовано |
|---|---|
| Список товаров с названием, ценой, подзаголовком | `CartPage.jsx` — каждая строка: фото, `item.name`, `item.subtitle`, `$item.price` |
| Управление количеством +/- | Кнопки `−` / `+` вызывают `updateQuantity(id, quantity ± 1)`. Защита от 0 в `CartContext` |
| Мгновенный пересчёт цены | `subtotal`, `discount`, `tax`, `total` — вычисляются прямо в теле компонента при каждом рендере |
| Удаление товара | Кнопка с иконкой корзины вызывает `removeFromCart(item.id)` |
| Промокод SAVE10 — скидка 10% | `PROMO_CODES = { 'SAVE10': 0.10 }`, `discount = subtotal * 0.10` |
| Сообщение «Неверный промокод» | `setPromoError('Неверный промокод')` при несовпадении кода |
| Валидация пустого поля | `if (code === '') return` — функция `applyPromo` не выполняется при пустом вводе |
| Empty State | `if (cart.length === 0)` — отдельный экран с сообщением и кнопкой "Browse Products →" |

---

### 4. Требования к UI/UX — реализация

| Требование | Где реализовано |
|---|---|
| Соответствие дизайну Figma | Дизайн воспроизведён по референсу: цвета, типографика, карточки, кнопки, фильтры, футер |
| Hover-эффекты кнопок | `hover:bg-orange-600`, `hover:bg-green-600`, `hover:shadow-md`, `hover:text-orange-500` на всех интерактивных элементах |
| Анимация раскрытия аккордеона | CSS `transition-all duration-300` + `max-h-0` / `max-h-[500px]` |
| Анимация переходов слайдера | `transition-all duration-500` на `<img>` в слайдере |
| Анимация тени карточек | `shadow-sm hover:shadow-md transition-shadow duration-200` |
| Анимация нажатия кнопок | `active:scale-95` — лёгкое уменьшение при клике |
| Toast-уведомление | `animate-bounce` при добавлении товара в корзину из каталога |

---

## Технологический стек

- **React 18** — библиотека для построения пользовательского интерфейса на основе компонентов
- **Vite** — инструмент сборки и dev-сервер
- **React Router DOM v6** — клиентская маршрутизация (SPA без перезагрузки страницы)
- **TailwindCSS v4** — утилитарный CSS-фреймворк для стилизации
- **localStorage** — браузерное хранилище для сохранения корзины между сессиями

---

## Структура проекта

```
src/
├── main.jsx                        # Точка входа приложения
├── App.jsx                         # Корневой компонент, маршрутизация
├── index.css                       # Глобальные стили
├── context/
│   └── CartContext.jsx             # Глобальное состояние корзины
├── data/
│   └── products.js                 # Массив товаров (база данных)
├── components/
│   ├── Header/Header.jsx           # Шапка сайта
│   ├── Footer/Footer.jsx           # Подвал сайта
│   └── ProductCard/ProductCard.jsx # Карточка товара + компонент звёзд
└── pages/
    ├── CatalogPage.jsx             # Страница каталога
    ├── ProductPage.jsx             # Страница товара
    ├── CartPage.jsx                # Страница корзины
    └── NotFoundPage.jsx            # Страница 404
```

---

## 1. `src/main.jsx` — Точка входа

```jsx
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App />
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
)
```

**Что происходит:**

- `createRoot` — React 18 API, монтирует приложение в DOM-элемент `<div id="root">` из `index.html`
- `StrictMode` — режим разработки, дважды вызывает рендер для выявления побочных эффектов
- `BrowserRouter` — оборачивает всё приложение, предоставляет контекст маршрутизации. Использует History API браузера для навигации без перезагрузки страницы
- `CartProvider` — провайдер глобального состояния корзины. Оборачивает `App`, чтобы любой компонент внутри мог получить доступ к корзине через хук `useCart()`
- `App` — корневой компонент приложения

**Порядок вложенности важен:** `BrowserRouter` должен быть снаружи `CartProvider`, а `CartProvider` — снаружи `App`, чтобы все страницы имели доступ и к роутингу, и к корзине.

---

## 2. `src/App.jsx` — Корневой компонент и маршрутизация

```jsx
function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<CatalogPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}
```

**Что происходит:**

- Компонент задаёт общий layout: `Header` сверху, `Footer` снизу, `<main>` растягивается на всю оставшуюся высоту (`flex-1`)
- `min-h-screen flex flex-col` — страница всегда занимает минимум всю высоту экрана, футер прижат к низу
- `<Routes>` — контейнер маршрутов. React Router сравнивает текущий URL с `path` и рендерит соответствующий `element`
- `path="/product/:id"` — динамический сегмент `:id`. При переходе на `/product/3` значение `3` доступно внутри `ProductPage` через хук `useParams()`
- `path="*"` — catch-all маршрут, срабатывает для любого несуществующего URL → показывает `NotFoundPage`
- `Header` и `Footer` рендерятся на **всех** страницах, так как находятся вне `<Routes>`

---

## 3. `src/index.css` — Глобальные стили

```css
@import "tailwindcss";

.price-range-slider { ... }
.price-range-slider::-webkit-slider-thumb { ... }
.price-range-slider::-moz-range-thumb { ... }
```

**Что происходит:**

- `@import "tailwindcss"` — подключает все утилиты Tailwind v4 (новый синтаксис без `@tailwind base/components/utilities`)
- Кастомный класс `.price-range-slider` — стилизует нативный `<input type="range">`, так как Tailwind не предоставляет утилит для псевдоэлементов `::-webkit-slider-thumb` и `::-moz-range-thumb`
- `-webkit-appearance: none` — убирает стандартный браузерный вид ползунка
- `pointer-events: none` на треке и `pointer-events: all` на thumb — позволяет двум наложенным `<input type="range">` (для min и max цены) работать независимо, не перехватывая клики друг у друга
- `background: transparent` на самом слайдере — фон трека рисуется отдельными `<div>` в JSX для точного контроля активной зоны между двумя ползунками

---

## 4. `src/data/products.js` — База данных товаров

```js
export const products = [
    {
        id: 1,
        name: "Premium Cement Bags",
        subtitle: "Cement & Concrete",
        price: 24.99,
        rating: 5.0,
        images: ["url1", "url2", "url3"],
        description: "...",
        specs: [
            { label: "WEIGHT", value: "94 lbs per bag" },
            ...
        ]
    },
    ...
]
```

**Что происходит:**

- Статический массив из 6 объектов-товаров, экспортируется как именованный экспорт
- Каждый товар содержит: уникальный `id` (используется в URL `/product/:id`), название, подзаголовок-категорию, цену, рейтинг (число с плавающей точкой для поддержки половинных звёзд), массив из 3 URL изображений (Unsplash), текстовое описание и массив `specs` для технических характеристик
- Изображения — реальные фотографии с Unsplash через их CDN API с параметрами качества и размера
- `specs` — массив объектов `{ label, value }`, рендерится в аккордеоне на странице товара в виде сетки 2×3

---

## 5. `src/context/CartContext.jsx` — Глобальное состояние корзины

```jsx
const CartContext = createContext()

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart')
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (product) => { ... }
    const removeFromCart = (id) => { ... }
    const updateQuantity = (id, quantity) => { ... }
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext)
}
```

**Что происходит:**

- `createContext()` — создаёт объект контекста React. Контекст — это механизм передачи данных через дерево компонентов без явной передачи пропсов на каждом уровне
- **Инициализация из localStorage:** функция-инициализатор в `useState` (lazy initializer) вызывается только один раз при монтировании. Читает сохранённую корзину из `localStorage`, парсит JSON или возвращает пустой массив
- **Синхронизация с localStorage:** `useEffect` с зависимостью `[cart]` срабатывает каждый раз при изменении `cart` и сохраняет актуальное состояние. Это обеспечивает сохранение корзины при перезагрузке страницы
- **`addToCart`:** проверяет, есть ли товар уже в корзине по `id`. Если есть — увеличивает `quantity` на 1 (иммутабельно через `map`). Если нет — добавляет новый объект с `quantity: 1`
- **`removeFromCart`:** фильтрует массив, исключая товар с переданным `id`
- **`updateQuantity`:** обновляет количество конкретного товара. Если `quantity < 1` — игнорирует (защита от нуля)
- **`cartCount`:** вычисляемое значение — сумма всех `quantity` в корзине. Используется в Header для отображения Badge
- **`useCart`:** кастомный хук-обёртка над `useContext`. Любой компонент вызывает `const { cart, addToCart } = useCart()` и получает доступ к корзине

---

## 6. `src/components/Header/Header.jsx` — Шапка сайта

```jsx
function Header() {
    const { cartCount } = useCart()

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            ...
            <Link to="/">BuildMart</Link>
            <nav>...</nav>
            <input placeholder="Search products..." />
            <Link to="/cart">
                <svg>...</svg>
                {cartCount > 0 && <span>{cartCount}</span>}
            </Link>
        </header>
    )
}
```

**Что происходит:**

- `sticky top-0 z-50` — шапка прилипает к верху экрана при прокрутке и находится поверх всего контента
- `useCart()` — получает `cartCount` из глобального контекста. Компонент автоматически перерендерится при изменении корзины
- `<Link to="/">` — компонент React Router, создаёт ссылку без перезагрузки страницы (использует `history.pushState`)
- Badge корзины: `{cartCount > 0 && <span>}` — условный рендер. Значок появляется только если в корзине есть товары. Позиционируется абсолютно поверх иконки корзины через `absolute -top-2 -right-2`
- Поле поиска — декоративное (UI-элемент без логики поиска, как в дизайне)
- Навигация скрыта на мобильных (`hidden md:flex`) — адаптивность

---

## 7. `src/components/Footer/Footer.jsx` — Подвал сайта

```jsx
function Footer() {
    return (
        <footer className="bg-slate-900 text-white mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Логотип + описание + соцсети */}
                {/* Quick Links */}
                {/* Customer Service */}
                {/* Newsletter */}
            </div>
            {/* Контакты */}
            {/* Copyright */}
        </footer>
    )
}
```

**Что происходит:**

- Статический компонент без состояния и пропсов
- Адаптивная сетка: `grid-cols-1` на мобильных → `grid-cols-2` на планшетах → `grid-cols-4` на десктопе
- Иконки соцсетей — встроенные SVG (Facebook, Twitter, Instagram, LinkedIn). Hover-эффект через `hover:text-white hover:border-white transition-colors`
- Колонки Quick Links и Customer Service — массивы строк, рендерятся через `.map()` для избежания дублирования кода
- Newsletter — поле email + кнопка отправки (декоративные, без логики)
- `mt-16` — отступ сверху, чтобы футер не прилипал к контенту страницы

---

## 8. `src/components/ProductCard/ProductCard.jsx` — Карточка товара

### Компонент `StarRating`

```jsx
function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(star => {
                const full = star <= Math.floor(rating)
                const half = !full && star === Math.ceil(rating) && rating % 1 !== 0
                return (
                    <svg key={star} viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id={`half-${star}-${rating}`}>
                                <stop offset="50%" stopColor="#FBBF24" />
                                <stop offset="50%" stopColor="#E5E7EB" />
                            </linearGradient>
                        </defs>
                        <path fill={full ? '#FBBF24' : half ? `url(#half-...)` : '#E5E7EB'} ... />
                    </svg>
                )
            })}
            <span>({rating.toFixed(1)})</span>
        </div>
    )
}
```

**Что происходит:**

- Рендерит 5 SVG-звёзд с поддержкой половинных звёзд (например, рейтинг 3.5 → 3 полные + 1 половинная + 1 пустая)
- `Math.floor(rating)` — количество полных звёзд
- `Math.ceil(rating)` — если дробная часть есть, эта звезда будет половинной
- `rating % 1 !== 0` — проверка что рейтинг не целое число
- Половинная звезда реализована через SVG `linearGradient`: левые 50% жёлтые (`#FBBF24`), правые 50% серые (`#E5E7EB`)
- `id` градиента уникален для каждой звезды: `half-${star}-${rating}` — предотвращает конфликты при нескольких карточках на странице

### Компонент `ProductCard`

```jsx
function ProductCard({ product, onAddToCart }) {
    const { addToCart, cart } = useCart()
    const inCart = cart.some(item => item.id === product.id)

    const handleAdd = () => {
        addToCart(product)
        if (onAddToCart) onAddToCart(product.name)
    }

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md">
            <Link to={`/product/${product.id}`}>
                <img src={product.images[0]} className="w-full h-72 object-cover" />
            </Link>
            <div className="p-4">
                <Link to={`/product/${product.id}`}>
                    <h3 className="hover:text-orange-500">{product.name}</h3>
                </Link>
                <StarRating rating={product.rating} />
                <p>${product.price}</p>
                <p>{product.subtitle}</p>
                <button onClick={handleAdd} className={inCart ? 'bg-green-500' : 'bg-orange-500'}>
                    {inCart ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}
```

**Что происходит:**

- Принимает пропсы: `product` (объект товара) и `onAddToCart` (опциональный callback для Toast-уведомления)
- `inCart` — вычисляется через `cart.some()`. Если товар уже в корзине, кнопка становится зелёной с текстом "Added to Cart ✓"
- `handleAdd` — вызывает `addToCart` из контекста и, если передан `onAddToCart`, вызывает его с именем товара (для показа Toast в CatalogPage)
- Клик по фото или названию → переход на `/product/${product.id}` через `<Link>`
- `hover:shadow-md transition-shadow` — плавное появление тени при наведении
- `active:scale-95` на кнопке — лёгкое нажатие при клике
- Экспортируется и сам компонент (`default`), и `StarRating` (именованный экспорт) — `StarRating` используется повторно в `ProductPage`

---

## 9. `src/pages/CatalogPage.jsx` — Страница каталога

### Компонент `Toast`

```jsx
function Toast({ message }) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            ✓ Added {message} to cart
        </div>
    )
}
```

**Что происходит:**

- Всплывающее уведомление при добавлении товара в корзину
- `fixed top-6 left-1/2 -translate-x-1/2` — позиционируется по центру экрана сверху, независимо от прокрутки
- `z-50` — поверх всего контента
- `animate-bounce` — встроенная Tailwind анимация подпрыгивания

### Основной компонент `CatalogPage`

```jsx
function CatalogPage() {
    const [sortBy, setSortBy] = useState('name-asc')
    const [showFilters, setShowFilters] = useState(false)
    const [minRating, setMinRating] = useState(0)
    const [priceMin, setPriceMin] = useState(0)
    const [priceMax, setPriceMax] = useState(400)
    const [toast, setToast] = useState(null)

    const filtered = useMemo(() => {
        let result = [...products]
        result = result.filter(p => p.price >= priceMin && p.price <= priceMax)
        if (minRating > 0) result = result.filter(p => p.rating >= minRating - 0.5)
        if (sortBy === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name))
        ...
        return result
    }, [sortBy, minRating, priceMin, priceMax])
}
```

**Что происходит:**

- **Состояния:** `sortBy` — текущий вариант сортировки; `showFilters` — видимость панели фильтров; `minRating` — минимальный рейтинг (0 = без фильтра); `priceMin`/`priceMax` — диапазон цен; `toast` — имя товара для уведомления (null = скрыто)
- **`useMemo`** — мемоизирует результат фильтрации и сортировки. Пересчитывается только при изменении зависимостей `[sortBy, minRating, priceMin, priceMax]`. Без `useMemo` фильтрация выполнялась бы при каждом рендере компонента
- **Фильтр по цене:** `p.price >= priceMin && p.price <= priceMax` — двусторонний диапазон
- **Фильтр по рейтингу:** `p.rating >= minRating - 0.5` — допуск 0.5 позволяет фильтру "4+ Stars" включать товары с рейтингом 3.5 и выше
- **Сортировка:** `localeCompare` для корректного алфавитного сравнения строк
- **Двойной ползунок цены:** два `<input type="range">` наложены друг на друга через `position: absolute`. Активная зона между ними рисуется отдельным `<div>` с динамическими `left` и `right` в процентах
- **Toast:** `handleAddToCart` устанавливает `toast = name`, через 2500мс сбрасывает в `null`. Условный рендер `{toast && <Toast message={toast} />}` показывает/скрывает уведомление
- **Radio-кнопки рейтинга:** кастомные круглые элементы (не нативный `<input type="radio">`). Клик переключает значение: если уже выбрано — сбрасывает в 0

---

## 10. `src/pages/ProductPage.jsx` — Страница товара

```jsx
function ProductPage() {
    const { id } = useParams()
    const product = products.find(p => p.id === Number(id))
    const { addToCart, cart } = useCart()
    const [currentImage, setCurrentImage] = useState(0)
    const [accordionOpen, setAccordionOpen] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    const inCart = cart.some(item => item.id === product.id)
    const related = products.filter(p => p.id !== product.id && p.subtitle === product.subtitle).slice(0, 3)
}
```

**Что происходит:**

- `useParams()` — хук React Router, извлекает `:id` из URL. `Number(id)` — преобразует строку в число для сравнения с `product.id`
- `products.find(...)` — ищет товар в массиве. Если не найден — рендерится заглушка "Product not found"
- **Слайдер изображений:** `currentImage` — индекс текущего фото. `prevImage`/`nextImage` — циклически переключают индекс. Кнопки `<` и `>` абсолютно позиционированы поверх изображения. Миниатюры внизу — кнопки с `border-orange-500` для активной
- **Аккордеон:** `accordionOpen` управляет классом `max-h-[500px]` / `max-h-0`. CSS `overflow-hidden` + `transition-all duration-300` создаёт плавную анимацию раскрытия без JavaScript-анимаций
- **Количество:** кнопки `-`/`+` изменяют `quantity`. `Math.max(1, q - 1)` — защита от нуля
- **`handleAddToCart`:** цикл `for` добавляет товар `quantity` раз (каждый вызов `addToCart` увеличивает количество на 1 в контексте). `setAdded(true)` → через 2 секунды `false` — временная смена текста кнопки
- **Состояние кнопки:** `inCart` — если товар уже в корзине, кнопка зелёная "Added to Cart ✓"
- **Related Products:** фильтрует товары той же категории (`subtitle`), исключая текущий, берёт первые 3
- **Хлебные крошки:** `<Link to="/">Products</Link> / {product.name}` — навигационная цепочка

---

## 11. `src/pages/CartPage.jsx` — Страница корзины

```jsx
const subtotal = parseFloat(cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2))
const discount = appliedPromo ? parseFloat((subtotal * PROMO_CODES[appliedPromo]).toFixed(2)) : 0
const tax = parseFloat(((subtotal - discount) * 0.08).toFixed(2))
const total = parseFloat((subtotal - discount + tax).toFixed(2))
```

**Что происходит:**

- **Empty State:** если `cart.length === 0` — рендерится отдельный экран с кнопкой "Browse Products →"
- **Вычисление сумм:** все суммы пересчитываются при каждом рендере (реактивно). `parseFloat(...toFixed(2))` — округление до 2 знаков после запятой для корректного отображения денежных значений
- **`PROMO_CODES`** — объект-словарь промокодов. `SAVE10: 0.10` означает скидку 10%
- **`applyPromo`:** `promoInput.trim().toUpperCase()` — нормализует ввод (убирает пробелы, приводит к верхнему регистру). Пустая строка игнорируется. Неверный код → сообщение "Неверный промокод". Верный → `appliedPromo` устанавливается, поле и кнопка блокируются (`disabled`)
- **Адаптивная таблица:** на десктопе (`sm:`) — grid с 5 колонками. На мобильных — flex-column: фото + название + мобильная цена в одной строке, кнопки количества отдельно. Колонки цены и итога скрыты на мобильных (`hidden sm:block`), вместо них цена показывается inline в строке товара
- **`updateQuantity`:** при нажатии `-` передаёт `quantity - 1`. В контексте есть защита `if (quantity < 1) return` — товар не удаляется при достижении 1, только через кнопку удаления
- **Order Summary:** sticky-блок (`sticky top-24`) — остаётся видимым при прокрутке длинного списка товаров

---

## 12. `src/pages/NotFoundPage.jsx` — Страница 404

```jsx
function NotFoundPage() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/">Вернуться в каталог</Link>
        </div>
    )
}
```

**Что происходит:**

- Рендерится при переходе на несуществующий URL (маршрут `path="*"` в `App.jsx`)
- Центрирование через `flex flex-col items-center justify-center`
- `min-h-[60vh]` — занимает минимум 60% высоты экрана, чтобы страница не выглядела пустой
- Кнопка возврата в каталог через `<Link to="/">`

---

## Поток данных и взаимодействие компонентов

```
main.jsx
└── BrowserRouter (маршрутизация)
    └── CartProvider (глобальное состояние корзины → localStorage)
        └── App.jsx (layout: Header + Routes + Footer)
            ├── Header ←── useCart() → cartCount (Badge)
            ├── CatalogPage
            │   └── ProductCard ←── useCart() → addToCart, inCart
            ├── ProductPage
            │   ├── ProductCard (Related Products)
            │   └── useCart() → addToCart, inCart
            ├── CartPage ←── useCart() → cart, removeFromCart, updateQuantity
            └── Footer
```

**Ключевые принципы:**

1. **Однонаправленный поток данных:** данные передаются сверху вниз через пропсы, события — снизу вверх через callback-функции
2. **Глобальное состояние через Context:** корзина доступна любому компоненту без prop drilling
3. **Персистентность:** `useEffect` в `CartContext` синхронизирует состояние с `localStorage` при каждом изменении
4. **Мемоизация:** `useMemo` в `CatalogPage` предотвращает лишние вычисления фильтрации/сортировки
5. **Реактивность:** изменение корзины в любом компоненте автоматически обновляет Badge в Header и состояние кнопок во всех карточках
