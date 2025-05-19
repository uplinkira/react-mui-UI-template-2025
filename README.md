# React + Material-UI Project Template

A modern frontend project template built with React and Material-UI, designed for rapid development. This project features responsive design, multi-device compatibility, and comprehensive user interaction capabilities.

## Features

- ⚡️ React 18 + TypeScript
- 🎨 Material-UI 5
- 📦 Complete project structure
- 🔍 ESLint + Prettier
- 🚀 Automation scripts
- 📱 Responsive design
- 🔐 JWT authentication
- 🛣️ React Router 6
- 🎯 Component-based architecture
- 🌈 Custom theming
- 📝 Form validation
- 🔄 State management
- 🖼️ Image upload
- 📊 Pagination

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/         # Common components
│   │   │   ├── Header.tsx  # Top navigation
│   │   │   ├── Footer.tsx  # Footer
│   │   │   └── CategoryNav.tsx  # Category navigation
│   │   └── products/       # Product-related components
│   │       ├── ProductCard.tsx    # Product card
│   │       ├── ProductList.tsx    # Product list
│   │       └── PublishDialog.tsx  # Publish dialog
│   ├── pages/              # Page components
│   │   ├── Home.tsx       # Home page
│   │   └── Category.tsx   # Category page
│   ├── contexts/          # React Context
│   ├── services/          # API services
│   ├── utils/             # Utility functions
│   ├── theme.ts           # Material-UI theme
│   └── App.tsx            # Application entry
├── public/                # Static assets
└── package.json          # Project configuration
```

## Quick Start

### Method 1: Using Automation Scripts (Recommended)

1. Clone the repository
```bash
git clone https://github.com/your-username/react-mui-template.git my-project
cd my-project
```

2. Run the initialization script
```bash
# Ensure scripts have execution permissions
chmod +x scripts/init-frontend.sh
chmod +x scripts/check-project.sh

# Run initialization script
./scripts/init-frontend.sh
```

3. Run the check script
```bash
./scripts/check-project.sh
```

4. Start the development server
```bash
cd frontend
npm start
```

The initialization script automatically:
- Creates a React + TypeScript project
- Installs all necessary dependencies
- Sets up the project directory structure
- Configures the base theme
- Sets up ESLint and Prettier
- Updates package.json scripts

The check script verifies:
- Directory structure integrity
- Dependency installation status
- Configuration file presence
- Code quality
- TypeScript configuration

### Method 2: Manual Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/react-mui-template.git my-project
cd my-project
```

2. Install dependencies
```bash
cd frontend
npm install
```

3. Start the development server
```bash
npm start
```

The package.json includes all necessary dependencies:
- @mui/material: Material-UI core components
- @emotion/react and @emotion/styled: Styling solution
- @mui/icons-material: Material icons
- react-router-dom: Routing management
- axios: HTTP client
- jwt-decode: JWT decoding
- TypeScript-related dependencies
- ESLint and Prettier development dependencies

## Development Guide

### Component Development Standards

1. Component File Structure
   - One component per file
   - TypeScript type definitions
   - Export interfaces and types

2. Styling Standards
   - Use Material-UI's sx prop
   - Follow responsive design principles
   - Maintain style consistency

3. State Management
   - Use React Context for global state
   - Use useState for component state
   - Use useReducer for complex state logic

### Clearing Local Storage

During development, you may need to clear browser local storage data (e.g., user registration info, published products). Here's how to do it in different browsers:

#### Clear All Data
1. Open Developer Tools (F12 or right-click -> Inspect)
2. Navigate to "Application" (Chrome/Edge) or "Storage" (Firefox) tab
3. Find your website domain under "Local Storage"
4. Right-click -> "Clear" or "Delete All"
5. Or execute in console:
```javascript
localStorage.clear()
```

#### Clear Product Data Only
To clear only published product information, execute in console:
```javascript
// Method 1: Direct product data removal
localStorage.removeItem('products')

// Method 2: If using specific key name
localStorage.removeItem('publishedProducts')
```

Or via Developer Tools:
1. Open Developer Tools (F12)
2. Navigate to "Application" (Chrome/Edge) or "Storage" (Firefox) tab
3. Find and delete product-related key-value pairs
4. Typically named 'products' or 'publishedProducts'

## Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Checklist

Run the check script to ensure proper project setup:

```bash
./scripts/check-project.sh
```

The script verifies:
- ✅ Directory structure
- ✅ Dependencies
- ✅ Configuration files
- ✅ Code quality
- ✅ TypeScript configuration
- ✅ Responsive design
- ✅ Component integrity
- ✅ Routing configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## About UI Design

![UI Design Preview](./UIdesignDemo20250518_022624%20-%20Copy.jpg)

*UI Design Preview*

This project is licensed under MIT, but please note:

- The UI design has been exclusively licensed for commercial use and is protected by blockchain-based copyright verification
- The primary purpose of this repository is to showcase the design and maintain a timestamped record of the implementation
- While the code is open source, the UI design itself is not available for commercial use
- For learning and reference purposes, you are welcome to study the implementation and create your own unique designs

## Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Material-UI](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/) 