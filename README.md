# BuildMart - Construction Materials E-commerce

Modern e-commerce platform for building materials and construction supplies built with React and Vite.

## 🚀 Features

- **Product Catalog** - Browse premium construction materials
- **Shopping Cart** - Add items, manage quantities, and apply promo codes
- **Product Details** - Detailed product information with image gallery
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **State Management** - React Context API for global state
- **Routing** - React Router for seamless navigation
- **Local Storage** - Persistent shopping cart

## 🛠️ Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **ESLint** - Code linting

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/budkko/buildmart-shop.git

# Navigate to project directory
cd buildmart-shop

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Navigation/      # Header navigation component
│   ├── PageFooter/      # Footer component
│   └── ItemCard/        # Product card component
├── pages/
│   ├── StorePage.jsx    # Main catalog page
│   ├── ItemDetailsPage.jsx  # Product details page
│   ├── CheckoutPage.jsx     # Shopping cart page
│   └── NotFoundPage.jsx     # 404 page
├── context/
│   └── ShoppingContext.jsx  # Global shopping cart state
├── data/
│   └── inventory.js     # Product data
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## 🎯 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌟 Key Features

### Shopping Cart
- Add/remove items
- Update quantities
- Apply discount codes (try `SAVE10` for 10% off)
- Automatic tax calculation
- Persistent storage

### Product Catalog
- Filter by price range
- Filter by rating
- Sort by name or price
- Responsive grid layout

### Product Details
- Image gallery with navigation
- Technical specifications
- Related products
- Quantity selector

## 📝 Development Guidelines

### Git Workflow
- `main` - Production-ready code only
- `dev` - Development branch
- `feature/*` - Feature branches

### Commit Convention
Following [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for modern web development

---

**Note**: This is a demo project for educational purposes. Product images are sourced from Unsplash.
