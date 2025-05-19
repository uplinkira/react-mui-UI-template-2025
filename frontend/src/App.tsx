import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './components/products/ProductList';
import Layout from './components/common/Layout';
import { PublishProduct } from './components/products/PublishDialog';

const getInitialProducts = () => {
  const saved = localStorage.getItem('products');
  if (saved) return JSON.parse(saved);
  return [];
};

function App() {
  const [products, setProducts] = useState<PublishProduct[]>(getInitialProducts());

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

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
                <ProductList products={products} />
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 