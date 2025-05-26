#!/bin/bash

echo "Checking project setup..."

# 检查目录结构
echo "Checking directory structure..."
for dir in src/{components,pages,contexts,services,utils}; do
  if [ ! -d "$dir" ]; then
    echo "Missing directory: $dir"
  fi
done

# 检查依赖
echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "node_modules not found. Running npm install..."
  npm install
fi

# 检查package.json
echo "Checking package.json..."
if [ ! -f "package.json" ]; then
  echo "package.json not found!"
  exit 1
fi

# 运行lint检查
echo "Running lint check..."
npm run lint

# 运行格式化
echo "Running format check..."
npm run format

# 检查TypeScript配置
echo "Checking TypeScript configuration..."
if [ ! -f "tsconfig.json" ]; then
  echo "tsconfig.json not found!"
  exit 1
fi

echo "Project check completed!" 