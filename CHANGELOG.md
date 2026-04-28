# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-28

### Added
- Comprehensive project documentation (DOCUMENTATION.md)
- Detailed README with setup instructions
- Git workflow and commit conventions
- Project structure documentation
- CHANGELOG for version tracking

### Changed
- **Breaking**: Renamed `CartContext` to `ShoppingContext`
- **Breaking**: Renamed `Header` component to `Navigation`
- **Breaking**: Renamed `Footer` component to `PageFooter`
- **Breaking**: Renamed `ProductCard` component to `ItemCard`
- **Breaking**: Renamed `CatalogPage` to `StorePage`
- **Breaking**: Renamed `ProductPage` to `ItemDetailsPage`
- **Breaking**: Renamed `CartPage` to `CheckoutPage`
- **Breaking**: Renamed `products.js` to `inventory.js`

### Refactored
- Context API: `cart` → `basket`, `addToCart()` → `addItemToBasket()`
- Component props: `product` → `item`, `onAddToCart` → `onItemAdded`
- State variables: `cartCount` → `basketTotal`, `inCart` → `existsInBasket`
- Page variables: `sortBy` → `orderBy`, `showFilters` → `filtersVisible`
- LocalStorage key: `'cart'` → `'shopping_basket'`

### Improved
- Code organization and structure
- Naming conventions for better readability
- Component modularity
- State management clarity

### Removed
- Old component files (Header, Footer, ProductCard)
- Old page files (CatalogPage, ProductPage, CartPage)
- Deprecated products.js data file

## Development Guidelines

### Commit Message Format
Following [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `refactor:` - Code refactoring without changing functionality
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, missing semicolons, etc.)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks, dependency updates

### Branch Strategy
- `main` - Production-ready code only
- `dev` - Development branch for integration
- `feature/*` - Feature branches (e.g., `feature/cart`, `feature/catalog`)
- `fix/*` - Bug fix branches
- `refactor/*` - Refactoring branches

### Code Quality Standards
- No console.log statements in production code
- No commented-out code blocks
- Consistent naming conventions
- Proper component organization
- Clean and readable code structure
