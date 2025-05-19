import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ProductList from '../components/products/ProductList';
import PublishDialog, { PublishProduct } from '../components/products/PublishDialog';

const HEADER_HEIGHT = 80;

interface HomeProps {
  products: PublishProduct[];
  setProducts: React.Dispatch<React.SetStateAction<PublishProduct[]>>;
}

const Home: React.FC<HomeProps> = ({ products, setProducts }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  // 监听全局"发布信息"按钮（通过自定义事件）
  React.useEffect(() => {
    const handler = () => setDialogOpen(true);
    window.addEventListener('open-publish-dialog', handler);
    return () => window.removeEventListener('open-publish-dialog', handler);
  }, []);

  const handleAddProduct = (product: PublishProduct) => {
    setProducts(prev => [product, ...prev]);
  };

  return (
    <Box sx={{ mt: `${HEADER_HEIGHT + 5 }px`, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          [平台名称]
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          [平台简介]
        </Typography>
      </Box>
      <ProductList products={products} />
      <PublishDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onAddProduct={handleAddProduct} />
    </Box>
  );
};

export default Home; 