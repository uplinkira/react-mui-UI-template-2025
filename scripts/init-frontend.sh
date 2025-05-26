#!/bin/bash

# 创建前端项目
echo "Creating React project..."
npx create-react-app frontend --template typescript

# 进入前端目录
cd frontend

# 安装依赖
echo "Installing dependencies..."
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom axios jwt-decode
npm install @types/react-router-dom

# 安装开发依赖
echo "Installing dev dependencies..."
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install --save-dev eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react
npm install --save-dev prettier

# 创建目录结构
echo "Creating directory structure..."
mkdir -p src/{components,pages,contexts,services,utils}

# 创建基础文件
echo "Creating base files..."
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

# 更新package.json的scripts
echo "Updating package.json scripts..."
npm pkg set scripts.lint="eslint src --ext .ts,.tsx"
npm pkg set scripts.format="prettier --write \"src/**/*.{ts,tsx}\""

echo "Frontend project initialization completed!" 