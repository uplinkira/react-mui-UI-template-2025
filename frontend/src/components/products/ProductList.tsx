import React, { useState, useEffect, useRef } from 'react';
import { Typography, Box, Pagination, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { PublishProduct } from './PublishDialog';
import { mockProducts, Product } from '../../data/mockProducts';
import { mergeProducts, categoryMap } from '../../utils/productUtils';

interface ProductListProps {
  products?: PublishProduct[];
  category?: string;
}

const ITEMS_PER_PAGE = 3; // 每页显示3个产品

const ProductList: React.FC<ProductListProps> = ({ products, category }) => {
  const { category: urlCategory } = useParams<{ category: string }>();
  const [page, setPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('default');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  
  // 使用共享的mergeProducts函数
  const allProducts = React.useMemo(() => {
    return mergeProducts(mockProducts, products);
  }, [products]);

  // 优先用props.category，否则用urlCategory，并都映射为中文
  const categoryKey = category || urlCategory;
  const categoryName = categoryKey ? categoryMap[categoryKey] : undefined;

  // 监听搜索事件
  useEffect(() => {
    const handleSearch = (event: CustomEvent<{ query: string }>) => {
      setSearchQuery(event.detail.query);
      setPage(1); // 重置页码
      setCurrentIndex(0); // 重置当前索引
      setVisibleProducts([]); // 清空可见产品
    };

    window.addEventListener('search-products', handleSearch as EventListener);
    return () => {
      window.removeEventListener('search-products', handleSearch as EventListener);
    };
  }, []);

  // 改进分类和搜索筛选逻辑
  const filteredProducts = React.useMemo(() => {
    let result = allProducts;
    
    // 分类筛选
    if (categoryName) {
      result = result.filter(product => product.category === categoryName);
    }
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.city.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // 价格范围过滤
    if (priceRange.min) {
      result = result.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(product => product.price <= Number(priceRange.max));
    }

    // 排序
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // 最新发布（id 越大越新）
        result.sort((a, b) => Number(b.id) - Number(a.id));
    }

    return result;
  }, [allProducts, categoryName, searchQuery, priceRange, sortBy]);

  // 计算总页数
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  // 获取当前页的产品
  const currentPageProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // 设置 Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && currentIndex < currentPageProducts.length && !isLoading) {
          // 当加载指示器进入视图时，加载下一个产品
          setIsLoading(true);
          setTimeout(() => {
            setVisibleProducts(prev => [...prev, currentPageProducts[currentIndex]]);
            setCurrentIndex(prev => prev + 1);
            setIsLoading(false);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [currentIndex, currentPageProducts, isLoading]);

  // 当页面、分类或搜索条件改变时重置状态
  useEffect(() => {
    setCurrentIndex(0);
    setVisibleProducts([]);
  }, [page, categoryKey, searchQuery, priceRange, sortBy]);

  // 处理页面切换
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 分类标题和筛选器整体居中对齐 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
        {/* 进一步优化的分段胶囊栏 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            border: '2px solid #222',
            borderRadius: '999px',
            bgcolor: 'transparent',
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
            width: 'fit-content',
            minHeight: 48,
            overflow: 'visible',
            px: 0,
            py: 0,
          }}
        >
          {/* 最低价格 */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
              bgcolor: 'transparent',
              borderRadius: '999px 0 0 999px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minHeight: 44,
              '&:hover': {
                bgcolor: '#F7C5CC',
                fontWeight: 700,
              },
            }}
          >
            <TextField
              label="最低价格"
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { fontWeight: 700, fontSize: '1rem', bgcolor: 'transparent', textAlign: 'center', minHeight: 36 },
              }}
              inputProps={{ style: { textAlign: 'center' } }}
              sx={{ width: 80, bgcolor: 'transparent', textAlign: 'center', minHeight: 36 }}
              size="small"
            />
          </Box>
          {/* 分隔线容器 */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, bgcolor: 'transparent' }}>
            <Box sx={{ width: 2, height: '60%', bgcolor: '#222', borderRadius: 1 }} />
          </Box>
          {/* 最高价格 */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
              bgcolor: 'transparent',
              borderRadius: 0,
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minHeight: 44,
              '&:hover': {
                bgcolor: '#F7C5CC',
                fontWeight: 700,
              },
            }}
          >
            <TextField
              label="最高价格"
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { fontWeight: 700, fontSize: '1rem', bgcolor: 'transparent', textAlign: 'center', minHeight: 36 },
              }}
              inputProps={{ style: { textAlign: 'center' } }}
              sx={{ width: 80, bgcolor: 'transparent', textAlign: 'center', minHeight: 36 }}
              size="small"
            />
          </Box>
          {/* 分隔线容器 */}
          <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, bgcolor: 'transparent' }}>
            <Box sx={{ width: 2, height: '60%', bgcolor: '#222', borderRadius: 1 }} />
          </Box>
          {/* 排序方式（高亮粉色） */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              px: 3,
              bgcolor: sortBy !== 'default' ? '#F7C5CC' : 'transparent',
              borderRadius: '0 999px 999px 0',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background 0.2s',
              minHeight: 44,
              '&:hover': {
                bgcolor: '#F7C5CC',
                fontWeight: 700,
              },
            }}
          >
            <FormControl variant="standard" size="small" sx={{ minWidth: 120, bgcolor: 'transparent', width: '100%' }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                disableUnderline
                sx={{
                  fontWeight: 700,
                  fontSize: '1rem',
                  bgcolor: 'transparent',
                  textAlign: 'center',
                  width: '100%',
                  '& .MuiSelect-select': { p: 0, textAlign: 'center' },
                  minHeight: 36,
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { fontWeight: 700, fontSize: '1rem', textAlign: 'center' }
                  }
                }}
              >
                <MenuItem value="default">最新发布</MenuItem>
                <MenuItem value="price-asc">价格从低到高</MenuItem>
                <MenuItem value="price-desc">价格从高到低</MenuItem>
                <MenuItem value="name-asc">名称 A-Z</MenuItem>
                <MenuItem value="name-desc">名称 Z-A</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
        {visibleProducts.map((product) => (
          <Box key={product.id}>
            <ProductCard {...product} />
          </Box>
        ))}
        {/* 加载指示器 */}
        {currentIndex < currentPageProducts.length && (
          <Box ref={loadingRef}>
            <ProductSkeleton />
          </Box>
        )}
      </Box>

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