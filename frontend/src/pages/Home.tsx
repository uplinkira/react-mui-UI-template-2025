import React from 'react';
import { Typography, Box } from '@mui/material';
import ProductList from '../components/products/ProductList';
import { PublishProduct } from '../components/products/PublishDialog';

interface HomeProps {
  products: PublishProduct[];
  setProducts: React.Dispatch<React.SetStateAction<PublishProduct[]>>;
}

const Home: React.FC<HomeProps> = ({ products }) => {
  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 5, mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          [平台名称]
        </Typography>
        <Typography variant="h6" color="text.secondary">
          [平台描述]
        </Typography>
      </Box>
      <ProductList products={products} />
    </>
  );
};

export default Home; 