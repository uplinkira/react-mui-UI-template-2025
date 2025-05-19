#!/bin/bash

# 设置错误时退出
set -e

echo "🔍 Starting project check..."

# 检查目录结构
echo "📁 Checking directory structure..."
required_dirs=(
    "src"
    "src/components"
    "src/components/common"
    "src/components/products"
    "src/pages"
    "src/contexts"
    "src/services"
    "src/utils"
)

for dir in "${required_dirs[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ Missing directory: $dir"
        exit 1
    fi
done

# 检查必要文件
echo "📄 Checking required files..."
required_files=(
    "package.json"
    "tsconfig.json"
    ".eslintrc.json"
    ".prettierrc"
    "src/theme.ts"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing file: $file"
        exit 1
    fi
done

# 检查依赖
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "⚠️ node_modules not found. Running npm install..."
    npm install
fi

# 检查package.json中的必要依赖
echo "🔧 Checking package.json dependencies..."
required_deps=(
    "@mui/material"
    "@emotion/react"
    "@emotion/styled"
    "@mui/icons-material"
    "react-router-dom"
    "axios"
    "jwt-decode"
)

for dep in "${required_deps[@]}"; do
    if ! npm list "$dep" >/dev/null 2>&1; then
        echo "❌ Missing dependency: $dep"
        exit 1
    fi
done

# 运行lint检查
echo "🔍 Running lint check..."
npm run lint

# 运行格式化
echo "✨ Running format check..."
npm run format

# 运行TypeScript类型检查
echo "📝 Running TypeScript check..."
npm run type-check

# 检查响应式设计
echo "📱 Checking responsive design..."
if ! grep -r "@media" src/components >/dev/null 2>&1; then
    echo "⚠️ Warning: No media queries found in components"
fi

# 检查组件完整性
echo "🧩 Checking component structure..."
component_files=(
    "src/components/common/Header.tsx"
    "src/components/common/Footer.tsx"
    "src/components/common/CategoryNav.tsx"
    "src/components/products/ProductCard.tsx"
    "src/components/products/ProductList.tsx"
    "src/components/products/PublishDialog.tsx"
)

for file in "${component_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "⚠️ Warning: Missing component: $file"
    fi
done

echo "✅ Project check completed successfully!"
echo "🎉 Your project is ready for development!" 