#!/bin/bash

# 设置错误时退出
set -e

echo "🚀 Starting frontend project initialization..."

# 检查是否已存在frontend目录
if [ -d "frontend" ]; then
    echo "⚠️ frontend directory already exists. Please remove it first or use a different directory."
    exit 1
fi

# 创建前端项目
echo "📦 Creating React project..."
npx create-react-app frontend --template typescript

# 进入前端目录
cd frontend

# 安装依赖
echo "📥 Installing dependencies..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom axios jwt-decode
npm install @types/react-router-dom

# 安装开发依赖
echo "🔧 Installing dev dependencies..."
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react
npm install --save-dev prettier

# 创建目录结构
echo "📁 Creating directory structure..."
mkdir -p src/{components,pages,contexts,services,utils}
mkdir -p src/components/{common,products}

# 创建基础文件
echo "📝 Creating base files..."

# 创建主题文件
cat > src/theme.ts << 'EOL'
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F193B7',
    },
    secondary: {
      main: '#3A6A43',
    },
    background: {
      default: '#F6F6F6',
      paper: '#FBF8F4',
    },
    text: {
      primary: '#1D1D1B',
    },
  },
});

export default theme;
EOL

# 创建ESLint配置
cat > .eslintrc.json << 'EOL'
{
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off"
  }
}
EOL

# 创建Prettier配置
cat > .prettierrc << 'EOL'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
EOL

# 更新package.json的scripts
echo "📋 Updating package.json scripts..."
npm pkg set scripts.lint="eslint src --ext .ts,.tsx"
npm pkg set scripts.format="prettier --write \"src/**/*.{ts,tsx}\""
npm pkg set scripts.type-check="tsc --noEmit"

# 创建.gitignore
echo "🔒 Updating .gitignore..."
cat >> .gitignore << 'EOL'

# IDE
.idea/
.vscode/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
EOL

echo "✅ Frontend project initialization completed!"
echo "🎉 Next steps:"
echo "1. cd frontend"
echo "2. npm start" 