import { Product } from '../data/mockProducts';
import { PublishProduct } from '../components/products/PublishDialog';

export const mergeProducts = (mockProducts: Product[], userProducts?: PublishProduct[]): Product[] => {
  // 创建一个Map来存储所有产品，使用id作为key
  const productMap = new Map();
  
  // 首先添加userProducts（确保用户发布的产品优先显示）
  if (userProducts && userProducts.length > 0) {
    userProducts.forEach(product => {
      productMap.set(product.id, product);
    });
  }
  
  // 然后添加mockProducts（如果id不存在）
  mockProducts.forEach(product => {
    if (!productMap.has(product.id)) {
      productMap.set(product.id, product);
    }
  });
  
  // 将Map转换回数组并按id排序（新发布的产品会排在前面）
  return Array.from(productMap.values()).sort((a, b) => {
    // 确保用户发布的产品始终排在前面
    const aIsUserProduct = userProducts?.some(p => p.id === a.id) || false;
    const bIsUserProduct = userProducts?.some(p => p.id === b.id) || false;
    
    if (aIsUserProduct && !bIsUserProduct) return -1;
    if (!aIsUserProduct && bIsUserProduct) return 1;
    
    return parseInt(b.id) - parseInt(a.id);
  });
};

export const categoryMap: { [key: string]: string } = {
  'cat1': 'cat 1',
  'cat2': 'cat 2',
  'cat3': 'cat 3',
  'cat4': 'cat 4'
}; 