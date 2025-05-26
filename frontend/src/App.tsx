import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import Layout from './components/common/Layout';
import { PublishProduct } from './components/products/PublishDialog';
import Agreement from './pages/Agreement';
import CategoryList from './pages/CategoryList';
import PublishDialog from './components/products/PublishDialog';
import PublishButton from './components/common/PublishButton';

const getInitialProducts = () => {
  const saved = localStorage.getItem('products');
  if (saved) return JSON.parse(saved);
  return [];
};

function App() {
  const [products, setProducts] = useState<PublishProduct[]>(getInitialProducts());
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const handleOpenDialog = () => {
      setDialogOpen(true);
    };

    window.addEventListener('open-publish-dialog', handleOpenDialog);
    return () => {
      window.removeEventListener('open-publish-dialog', handleOpenDialog);
    };
  }, []);

  const handleAddProduct = (product: PublishProduct) => {
    const updatedProducts = [product, ...products];
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home products={products} setProducts={setProducts} />
              </Layout>
            }
          />
          <Route
            path="/category/:category"
            element={
              <Layout>
                <CategoryList products={products} />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetail products={products} />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/agreement"
            element={
              <Layout>
                <Agreement />
              </Layout>
            }
          />
        </Routes>
        <PublishDialog 
          open={dialogOpen} 
          onClose={() => setDialogOpen(false)} 
          onAddProduct={handleAddProduct} 
        />
      </Router>
    </ThemeProvider>
  );
}

export default App; 