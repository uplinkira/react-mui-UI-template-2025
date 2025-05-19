import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Box, Pagination, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { PublishProduct } from './PublishDialog';

// 临时数据，后续会从API获取
const mockProducts = [
  // 分类1 - 5个商品
  {
    id: '1',
    title: '分类1商品1',
    price: 999,
    image: 'https://via.placeholder.com/300x200',
    category: '分类1',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '2',
    title: '分类1商品2',
    price: 888,
    image: 'https://via.placeholder.com/300x200',
    category: '分类1',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '3',
    title: '分类1商品3',
    price: 777,
    image: 'https://via.placeholder.com/300x200',
    category: '分类1',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '4',
    title: '分类1商品4',
    price: 666,
    image: 'https://via.placeholder.com/300x200',
    category: '分类1',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '5',
    title: '分类1商品5',
    price: 555,
    image: 'https://via.placeholder.com/300x200',
    category: '分类1',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  // 分类2 - 3个商品
  {
    id: '6',
    title: '分类2商品1',
    price: 444,
    image: 'https://via.placeholder.com/300x200',
    category: '分类2',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '7',
    title: '分类2商品2',
    price: 333,
    image: 'https://via.placeholder.com/300x200',
    category: '分类2',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  {
    id: '8',
    title: '分类2商品3',
    price: 222,
    image: 'https://via.placeholder.com/300x200',
    category: '分类2',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  // 分类3 - 1个商品
  {
    id: '9',
    title: '分类3商品1',
    price: 111,
    image: 'https://via.placeholder.com/300x200',
    category: '分类3',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  },
  // 分类4 - 1个商品
  {
    id: '10',
    title: '分类4商品1',
    price: 100,
    image: 'https://via.placeholder.com/300x200',
    category: '分类4',
    description: '这是一个示例商品描述，请根据实际需求修改。'
  }
];

interface ProductListProps {
  products?: PublishProduct[];
  category?: string;
}

const ITEMS_PER_PAGE = 3; // 每页显示3个产品

const ProductList: React.FC<ProductListProps> = ({ products, category }) => {
  const { category: urlCategory } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(1); // 当前页面显示的商品数量
  const observer = useRef<IntersectionObserver>();
  
  // 分类映射
  const categoryMap: { [key: string]: string } = {
    'category1': '分类1',
    'category2': '分类2',
    'category3': '分类3',
    'category4': '分类4'
  };

  // 合并mockProducts和localStorage中的产品
  const allProducts = React.useMemo(() => {
    const productMap = new Map();
    
    mockProducts.forEach(product => {
      productMap.set(product.id, product);
    });
    
    if (products && products.length > 0) {
      products.forEach(product => {
        productMap.set(product.id, product);
      });
    }
    
    return Array.from(productMap.values()).sort((a, b) => {
      return parseInt(b.id) - parseInt(a.id);
    });
  }, [products]);

  // 获取当前分类
  const categoryKey = category || urlCategory;
  const categoryName = categoryKey ? categoryMap[categoryKey] : undefined;

  // 根据分类筛选产品
  const filteredProducts = categoryName
    ? allProducts.filter(product => product.category === categoryName)
    : allProducts;

  // 计算总页数
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // 获取当前页的产品
  const currentPageProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // 获取当前页面内要显示的产品
  const displayedProducts = currentPageProducts.slice(0, displayCount);

  // 处理页面切换
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setDisplayCount(1); // 切换页面时重置显示数量
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理滑动加载
  const lastProductElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && displayCount < currentPageProducts.length) {
        setLoading(true);
        setTimeout(() => {
          setDisplayCount(prev => prev + 1);
          setLoading(false);
        }, 500);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, displayCount, currentPageProducts.length]);

  return (
    <>
      {categoryName && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {categoryName}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        {displayedProducts.map((product, index) => (
          <Box 
            key={product.id}
            ref={index === displayedProducts.length - 1 ? lastProductElementRef : null}
          >
            <ProductCard {...product} />
          </Box>
        ))}
      </Box>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {/* 分页控件 */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 4,
        mb: 2 
      }}>
        <Pagination 
          count={totalPages} 
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '1.2rem',
              margin: '0 8px'
            }
          }}
        />
      </Box>
    </>
  );
};

export default ProductList; 