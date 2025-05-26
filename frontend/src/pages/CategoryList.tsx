import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductList from '../components/products/ProductList';
import { PublishProduct } from '../components/products/PublishDialog';
import { categoryMap } from '../utils/productUtils';

interface CategoryListProps {
  products: PublishProduct[];
}

const CategoryList: React.FC<CategoryListProps> = ({ products }) => {
  const { category } = useParams<{ category: string }>();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {category ? categoryMap[category] || '分类浏览' : '分类浏览'}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          浏览[分类名称]相关商品
        </Typography>
      </Box>
      <ProductList products={products} category={category} />
    </Container>
  );
};

export default CategoryList; 