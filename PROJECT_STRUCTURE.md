# 📚 Структура проекта BuildMart

## 🎯 Общее описание

**BuildMart** - современное SPA (Single Page Application) приложение для интернет-магазина строительных материалов, построенное на React 19 с использованием Vite в качестве сборщика.

---

## 📁 Структура файлов и папок

```
buildmart-shop/
├── public/                    # Статические файлы (пустая папка)
├── src/                       # Исходный код приложения
│   ├── assets/               # Медиа-файлы (изображения, иконки)
│   ├── components/           # React компоненты
│   │   ├── ItemCard/        # Карточка товара
│   │   ├── Navigation/      # Навигационная панель (Header)
│   │   └── PageFooter/      # Подвал сайта
│   ├── context/             # React Context для глобального состояния
│   │   └── ShoppingContext.jsx  # Контекст корзины покупок
│   ├── data/                # Данные приложения
│   │   └── inventory.js     # Массив товаров
│   ├── pages/               # Страницы приложения
│   │   ├── StorePage.jsx           # Главная страница (каталог)
│   │   ├── ItemDetailsPage.jsx     # Страница товара
│   │   ├── CheckoutPage.jsx        # Страница корзины
│   │   └── NotFoundPage.jsx        # Страница 404
│   ├── App.jsx              # Главный компонент приложения
│   ├── main.jsx             # Точка входа React
│   └── index.css            # Глобальные стили (Tailwind)
├── .gitignore               # Игнорируемые Git файлы
├── eslint.config.js         # Конфигурация ESLint
├── index.html               # HTML шаблон
├── package.json             # Зависимости и скрипты
├── vite.config.js           # Конфигурация Vite
├── README.md                # Документация проекта
├── DOCUMENTATION.md         # Техническая документация
├── CHANGELOG.md             # История изменений
└── CHANGES.md               # Список переименований

```

---

## 🗂️ Детальное описание файлов

### 📄 Корневые конфигурационные файлы

#### `package.json`
**Назначение**: Управление зависимостями и скриптами проекта

**Основные зависимости**:
- `react` (19.2.0) - библиотека для построения UI
- `react-dom` (19.2.0) - рендеринг React в DOM
- `react-router-dom` (7.13.1) - маршрутизация

**Dev зависимости**:
- `vite` (7.3.1) - сборщик и dev-сервер
- `tailwindcss` (4.2.1) - CSS фреймворк
- `eslint` - линтер кода

**Скрипты**:
```json
{
  "dev": "vite",              // Запуск dev-сервера
  "build": "vite build",      // Сборка для production
  "lint": "eslint .",         // Проверка кода
  "preview": "vite preview"   // Предпросмотр production сборки
}
```

#### `vite.config.js`
**Назначение**: Конфигурация сборщика Vite

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // Поддержка React (JSX, Fast Refresh)
    tailwindcss(),  // Интеграция Tailwind CSS
  ],
})
```

#### `index.html`
**Назначение**: HTML шаблон приложения

- Точка входа для Vite
- Содержит `<div id="root">` для монтирования React
- Подключает `src/main.jsx` как модуль

---

### 🎨 Стили

#### `src/index.css`
**Назначение**: Глобальные стили

```css
@import "tailwindcss";
```

Импортирует все утилиты Tailwind CSS v4. Tailwind генерирует классы на лету на основе использования в JSX.

---

### ⚛️ Точка входа React

#### `src/main.jsx`
**Назначение**: Инициализация React приложения

**Функции**:
1. Создает корневой элемент React
2. Оборачивает приложение в провайдеры:
   - `StrictMode` - режим строгой проверки
   - `BrowserRouter` - маршрутизация
   - `ShoppingProvider` - глобальное состояние корзины

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShoppingProvider>
        <App />
      </ShoppingProvider>
    </BrowserRouter>
  </StrictMode>
)
```

#### `src/App.jsx`
**Назначение**: Главный компонент приложения

**Структура**:
```jsx
<div className="min-h-screen bg-gray-50 flex flex-col">
  <Navigation />           {/* Шапка сайта */}
  <main className="flex-1">
    <Routes>              {/* Маршруты */}
      <Route path="/" element={<StorePage />} />
      <Route path="/product/:id" element={<ItemDetailsPage />} />
      <Route path="/cart" element={<CheckoutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </main>
  <PageFooter />          {/* Подвал сайта */}
</div>
```

**Маршруты**:
- `/` - главная страница (каталог товаров)
- `/product/:id` - страница товара (динамический параметр id)
- `/cart` - корзина покупок
- `*` - страница 404 (любой несуществующий путь)

---

## 🧩 Компоненты

### 1️⃣ `src/components/Navigation/Navigation.jsx`

**Назначение**: Навигационная панель (Header)

**Структура**:
```
[Logo] [Products] [Categories] [Deals] [About] [Search Bar] [Cart Icon]
```

**Функции**:
- Отображение логотипа и названия магазина
- Навигационные ссылки
- Поисковая строка (UI only, без функционала)
- Иконка корзины с badge (количество товаров)
- Sticky позиционирование (прилипает к верху при скролле)

**Адаптивность**:
- Desktop: все элементы видны
- Mobile: навигационные ссылки скрыты (`hidden md:flex`)

**Используемые хуки**:
- `useShopping()` - получение `basketTotal` (количество товаров в корзине)

**Tailwind классы**:
- `sticky top-0 z-50` - прилипание к верху
- `justify-between` - распределение элементов по краям
- `gap-8` - расстояние между навигационными ссылками

---

### 2️⃣ `src/components/ItemCard/ItemCard.jsx`

**Назначение**: Карточка товара для отображения в каталоге

**Структура**:
```
┌─────────────────┐
│   [Image]       │ ← Квадратное изображение (aspect-square)
├─────────────────┤
│ Product Name    │
│ ★★★★☆ (4.5)    │ ← Рейтинг
│ $45.99          │ ← Цена
│ Category        │ ← Подзаголовок
│ [Add to Cart]   │ ← Кнопка
└─────────────────┘
```

**Функции**:
- Отображение изображения товара (квадратное)
- Название товара (ссылка на страницу товара)
- Рейтинг со звездами (компонент `RatingStars`)
- Цена
- Категория товара
- Кнопка добавления в корзину
- Изменение цвета кнопки при добавлении (оранжевый → зеленый)

**Компонент `RatingStars`**:
- Отображает 5 звезд
- Поддерживает полные, половинчатые и пустые звезды
- Использует SVG с градиентами для половинчатых звезд

**Адаптивность**:
- Изображение: `aspect-square` - всегда квадратное
- Карточка: `flex flex-col` - вертикальная компоновка

**Используемые хуки**:
- `useShopping()` - `addItemToBasket`, `basket`

---

### 3️⃣ `src/components/PageFooter/PageFooter.jsx`

**Назначение**: Подвал сайта (Footer)

**Структура** (4 колонки):
1. **About** - информация о компании, соц. сети
2. **Quick Links** - быстрые ссылки (About Us, Products, Delivery, Returns)
3. **Customer Service** - поддержка (Contact, FAQs, Shipping, Privacy)
4. **Newsletter** - подписка на рассылку

**Дополнительно**:
- Контактная информация (телефон, email, адрес)
- Copyright

**Адаптивность**:
- Desktop: 4 колонки (`lg:grid-cols-4`)
- Tablet: 2 колонки (`sm:grid-cols-2`)
- Mobile: 1 колонка (`grid-cols-1`)

---

## 📄 Страницы

### 1️⃣ `src/pages/StorePage.jsx`

**Назначение**: Главная страница - каталог товаров

**Функции**:
1. **Отображение товаров** - сетка карточек товаров
2. **Фильтрация**:
   - По цене (слайдер диапазона)
   - По рейтингу (3+, 4+, 5+ звезд)
3. **Сортировка**:
   - По имени (A-Z, Z-A)
   - По цене (возрастание, убывание)
4. **Toast уведомления** - при добавлении товара в корзину

**State управление**:
```javascript
const [orderBy, setOrderBy] = useState('name-asc')        // Сортировка
const [filtersVisible, setFiltersVisible] = useState(false) // Видимость фильтров
const [ratingFilter, setRatingFilter] = useState(0)       // Фильтр рейтинга
const [minPrice, setMinPrice] = useState(0)               // Мин. цена
const [maxPrice, setMaxPrice] = useState(400)             // Макс. цена
const [notification, setNotification] = useState(null)    // Toast
```

**Фильтрация и сортировка** (useMemo):
```javascript
const filteredItems = useMemo(() => {
  let results = [...inventory]
  // Фильтр по цене
  results = results.filter(item => item.price >= minPrice && item.price <= maxPrice)
  // Фильтр по рейтингу
  if (ratingFilter > 0) results = results.filter(item => item.rating >= ratingFilter - 0.5)
  // Сортировка
  if (orderBy === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name))
  // ... другие варианты сортировки
  return results
}, [orderBy, ratingFilter, minPrice, maxPrice])
```

**Адаптивность**:
- Desktop: 3 колонки товаров (`lg:grid-cols-3`)
- Tablet: 2 колонки (`sm:grid-cols-2`)
- Mobile: 1 колонка (`grid-cols-1`)

**Компоненты**:
- `Notification` - Toast уведомление
- `ItemCard` - карточка товара

---

### 2️⃣ `src/pages/ItemDetailsPage.jsx`

**Назначение**: Страница детальной информации о товаре

**Структура** (2 колонки):

**Левая колонка (50%)**:
- Главное изображение (квадратное, с навигацией)
- Миниатюры изображений (3 шт., квадратные, растянуты на всю ширину)

**Правая колонка (50%)**:
- Название товара
- Рейтинг
- Цена
- Иконки преимуществ (Quality, Delivery, Warranty)
- Выбор количества
- Кнопки "Add to Cart" и "Buy Now"
- **Описание товара**
- **Технические характеристики** (аккордеон)

**State управление**:
```javascript
const [activeImage, setActiveImage] = useState(0)      // Активное изображение
const [specsExpanded, setSpecsExpanded] = useState(false) // Раскрыт ли аккордеон
const [amount, setAmount] = useState(1)                // Количество
const [justAdded, setJustAdded] = useState(false)      // Анимация добавления
```

**Функции**:
- `showPreviousImage()` - предыдущее изображение
- `showNextImage()` - следующее изображение
- `handleAddToBasket()` - добавление в корзину

**Получение товара**:
```javascript
const { id } = useParams()  // Получение ID из URL
const selectedItem = inventory.find(item => item.id === Number(id))
```

**Похожие товары**:
```javascript
const similarItems = inventory.filter(
  item => item.id !== selectedItem.id && item.subtitle === selectedItem.subtitle
).slice(0, 3)
```

**Адаптивность**:
- Desktop: 2 колонки (`lg:flex-row`)
- Mobile: 1 колонка (`flex-col`)
- Изображения: квадратные (`aspect-square`)

---

### 3️⃣ `src/pages/CheckoutPage.jsx`

**Назначение**: Страница корзины покупок

**Структура** (2 колонки):

**Левая колонка (flex-1)**:
- Таблица товаров (Product, Price, Quantity, Total, Delete)
- Блок промокода

**Правая колонка (фиксированная ширина)**:
- Order Summary (Subtotal, Discount, Tax, Total)
- Кнопки "Proceed to Checkout" и "Continue Shopping"

**State управление**:
```javascript
const [codeInput, setCodeInput] = useState('')         // Ввод промокода
const [activeCode, setActiveCode] = useState(null)     // Активный промокод
const [codeError, setCodeError] = useState('')         // Ошибка промокода
```

**Промокоды**:
```javascript
const DISCOUNT_CODES = { 'SAVE10': 0.10 }  // 10% скидка
```

**Расчет суммы**:
```javascript
const subtotalAmount = basket.reduce((total, entry) => 
  total + entry.price * entry.quantity, 0
)
const discountAmount = activeCode ? subtotalAmount * DISCOUNT_CODES[activeCode] : 0
const taxAmount = (subtotalAmount - discountAmount) * 0.08  // 8% налог
const finalTotal = subtotalAmount - discountAmount + taxAmount
```

**Функции**:
- `removeItemFromBasket(id)` - удаление товара
- `modifyQuantity(id, quantity)` - изменение количества
- `applyDiscountCode()` - применение промокода

**Адаптивность**:
- Desktop: 2 колонки, таблица с 5 колонками
- Mobile: 1 колонка, карточки товаров

**Пустая корзина**:
```jsx
if (basket.length === 0) {
  return <EmptyCartMessage />
}
```

---

### 4️⃣ `src/pages/NotFoundPage.jsx`

**Назначение**: Страница 404 (не найдено)

**Функции**:
- Отображение сообщения об ошибке
- Кнопка возврата на главную страницу

---

## 🔄 Управление состоянием

### `src/context/ShoppingContext.jsx`

**Назначение**: Глобальное состояние корзины покупок (React Context API)

**Структура**:
```javascript
const ShoppingContext = createContext()

export function ShoppingProvider({ children }) {
  const [basket, setBasket] = useState(() => {
    // Загрузка из localStorage
    const stored = localStorage.getItem('shopping_basket')
    return stored ? JSON.parse(stored) : []
  })

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('shopping_basket', JSON.stringify(basket))
  }, [basket])

  // ... функции управления корзиной
}
```

**Предоставляемые функции**:

1. **`addItemToBasket(item)`** - добавление товара
   - Если товар уже есть → увеличивает quantity
   - Если нет → добавляет с quantity = 1

2. **`removeItemFromBasket(id)`** - удаление товара

3. **`modifyQuantity(id, quantity)`** - изменение количества
   - Проверка: quantity >= 1

4. **`basketTotal`** - общее количество товаров
   ```javascript
   const basketTotal = basket.reduce((sum, entry) => sum + entry.quantity, 0)
   ```

**Использование**:
```javascript
const { basket, addItemToBasket, removeItemFromBasket, modifyQuantity, basketTotal } = useShopping()
```

**Персистентность**:
- Данные сохраняются в `localStorage` с ключом `'shopping_basket'`
- Автоматическая загрузка при инициализации
- Автоматическое сохранение при изменении

---

## 📊 Данные

### `src/data/inventory.js`

**Назначение**: Массив товаров магазина

**Структура товара**:
```javascript
{
  id: 1,                    // Уникальный ID
  name: "Product Name",     // Название
  subtitle: "Category",     // Категория
  price: 24.99,            // Цена
  rating: 5.0,             // Рейтинг (0-5)
  images: [                // Массив изображений
    "url1", "url2", "url3"
  ],
  description: "...",      // Описание
  specs: [                 // Технические характеристики
    { label: "WEIGHT", value: "94 lbs" },
    { label: "TYPE", value: "Portland" },
    // ...
  ]
}
```

**Товары**:
1. Premium Cement Bags ($24.99, 5.0★)
2. Premium Lumber Planks ($89.99, 4.5★)
3. Red Clay Bricks ($0.89, 4.0★)
4. Steel I-Beams ($349.99, 5.0★)
5. Exterior Paint Set ($45.99, 3.5★)
6. Plywood Sheets ($52.99, 4.5★)

**Изображения**: Используются из Unsplash

---

## 🎨 Адаптивность (Responsive Design)

### Подход: Mobile-First с Tailwind CSS

**Breakpoints Tailwind**:
- `sm:` - ≥640px (планшеты)
- `md:` - ≥768px (планшеты landscape)
- `lg:` - ≥1024px (десктопы)
- `xl:` - ≥1280px (большие экраны)

### Адаптивные паттерны:

#### 1. **Сетки товаров**
```jsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
```
- Mobile: 1 колонка
- Tablet: 2 колонки
- Desktop: 3 колонки

#### 2. **Flexbox колонки**
```jsx
className="flex flex-col lg:flex-row gap-12"
```
- Mobile: вертикальная компоновка
- Desktop: горизонтальная компоновка

#### 3. **Скрытие элементов**
```jsx
className="hidden md:flex"
```
- Mobile: скрыто
- Desktop: видимо

#### 4. **Адаптивные изображения**
```jsx
className="w-full aspect-square object-cover"
```
- Ширина: 100% контейнера
- Соотношение: 1:1 (квадрат)
- Обрезка: `object-cover`

#### 5. **Таблица корзины**
```jsx
// Desktop: таблица с 5 колонками
className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto]"

// Mobile: карточки
className="flex flex-col sm:grid"
```

#### 6. **Footer**
```jsx
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
```
- Mobile: 1 колонка
- Tablet: 2 колонки
- Desktop: 4 колонки

---

## ⚙️ Основные функции

### 1. **Каталог товаров**
- ✅ Отображение всех товаров
- ✅ Фильтрация по цене (слайдер)
- ✅ Фильтрация по рейтингу
- ✅ Сортировка (имя, цена)
- ✅ Адаптивная сетка

### 2. **Страница товара**
- ✅ Галерея изображений (слайдер)
- ✅ Миниатюры изображений
- ✅ Детальная информация
- ✅ Технические характеристики (аккордеон)
- ✅ Выбор количества
- ✅ Похожие товары

### 3. **Корзина покупок**
- ✅ Добавление товаров
- ✅ Удаление товаров
- ✅ Изменение количества
- ✅ Промокоды (SAVE10 = 10%)
- ✅ Расчет суммы (subtotal, discount, tax, total)
- ✅ Сохранение в localStorage

### 4. **Навигация**
- ✅ React Router (клиентская маршрутизация)
- ✅ Динамические маршруты (/product/:id)
- ✅ Страница 404
- ✅ Breadcrumbs (хлебные крошки)

### 5. **UI/UX**
- ✅ Toast уведомления
- ✅ Анимации (hover, active, transitions)
- ✅ Badge на иконке корзины
- ✅ Sticky header
- ✅ Адаптивный дизайн

---

## 🛠️ Технологический стек

### Frontend
- **React 19.2.0** - UI библиотека
- **React Router DOM 7.13.1** - маршрутизация
- **Tailwind CSS 4.2.1** - utility-first CSS фреймворк

### Build Tools
- **Vite 7.3.1** - сборщик и dev-сервер
  - ⚡ Мгновенный HMR (Hot Module Replacement)
  - 📦 Оптимизированная сборка
  - 🔧 Плагины: React, Tailwind

### Code Quality
- **ESLint 9.39.1** - линтер
  - Плагины: react-hooks, react-refresh

### State Management
- **React Context API** - глобальное состояние
- **localStorage** - персистентность данных

---

## 🚀 Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера (http://localhost:5173)
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview

# Проверка кода
npm run lint
```

---

## 📦 Сборка и деплой

### Production сборка
```bash
npm run build
```

**Результат**:
- Папка `dist/` с оптимизированными файлами
- Минификация JS и CSS
- Tree-shaking (удаление неиспользуемого кода)
- Code splitting

### Структура dist/
```
dist/
├── assets/
│   ├── index-[hash].css    # Стили
│   └── index-[hash].js     # JavaScript
└── index.html              # HTML
```

---

## 🔍 Особенности реализации

### 1. **Оптимизация производительности**
- `useMemo` для фильтрации и сортировки
- Ленивая загрузка изображений (браузерная)
- Минимальные ре-рендеры через Context

### 2. **Персистентность данных**
- localStorage для корзины
- Автоматическая синхронизация

### 3. **Доступность (A11y)**
- Семантические HTML теги
- ARIA атрибуты (где необходимо)
- Keyboard navigation

### 4. **SEO**
- Семантическая разметка
- Meta теги в index.html
- Правильная структура заголовков

### 5. **Безопасность**
- Нет XSS уязвимостей (React экранирует данные)
- Валидация промокодов
- Проверка количества товаров

---

## 📝 Соглашения о коде

### Именование
- **Компоненты**: PascalCase (`ItemCard`, `StorePage`)
- **Функции**: camelCase (`addItemToBasket`, `handleAddClick`)
- **Константы**: UPPER_SNAKE_CASE (`DISCOUNT_CODES`)
- **Файлы**: PascalCase для компонентов, camelCase для утилит

### Структура компонентов
```jsx
// 1. Импорты
import { useState } from 'react'
import { Link } from 'react-router-dom'

// 2. Компонент
function ComponentName() {
  // 2.1. Хуки
  const [state, setState] = useState()
  
  // 2.2. Функции
  const handleClick = () => {}
  
  // 2.3. Рендер
  return <div>...</div>
}

// 3. Экспорт
export default ComponentName
```

### Tailwind классы
- Порядок: layout → spacing → sizing → colors → typography → effects
- Адаптивность: mobile-first (базовые классы, затем `sm:`, `md:`, `lg:`)

---

## 🎓 Учебные цели проекта

Этот проект демонстрирует:
1. ✅ Создание SPA с React
2. ✅ Маршрутизация с React Router
3. ✅ Управление состоянием (Context API)
4. ✅ Работа с формами и пользовательским вводом
5. ✅ Адаптивный дизайн с Tailwind CSS
6. ✅ Работа с localStorage
7. ✅ Компонентная архитектура
8. ✅ Хуки React (useState, useEffect, useMemo, useContext)
9. ✅ Условный рендеринг
10. ✅ Списки и ключи

---

## 📚 Дополнительные ресурсы

- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

---

**Дата создания документации**: 28 апреля 2026  
**Версия проекта**: 1.0.0  
**Автор**: BuildMart Team
