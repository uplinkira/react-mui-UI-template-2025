import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Paper,
  Grid,
  Button,
  Container
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { PublishProduct } from './PublishDialog';
import { mockProducts } from '../../data/mockProducts';
import { mergeProducts } from '../../utils/productUtils';

interface ProductDetailProps {
  products: PublishProduct[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 使用共享的mergeProducts函数
  const allProducts = React.useMemo(() => {
    return mergeProducts(mockProducts, products);
  }, [products]);

  // 从所有产品中找到当前产品
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          未找到该产品
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          返回首页
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          bgcolor: '#FBF8F4',
          borderRadius: 2,
          border: '2px solid #e0e0e0'
        }}
      >
        <Grid container spacing={4}>
          {/* 左侧图片区域 */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.title}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                objectFit: 'cover',
                boxShadow: 3
              }}
            />
          </Grid>

          {/* 右侧信息区域 */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* 标题和分类 */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '1.8rem', sm: '2.5rem' }
                  }}
                >
                  {product.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={product.category}
                    sx={{
                      bgcolor: '#F193B7',
                      color: 'white',
                      fontSize: '1rem',
                      height: '32px'
                    }}
                  />
                  {product.city && (
                    <Chip
                      label={product.city}
                      sx={{
                        bgcolor: '#222',
                        color: 'white',
                        fontSize: '1rem',
                        height: '32px'
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* 价格 */}
              <Typography
                variant="h2"
                sx={{
                  color: '#222',
                  fontWeight: 'bold',
                  mb: 3,
                  fontSize: { xs: '2rem', sm: '3rem' }
                }}
              >
                ¥{product.price.toLocaleString()}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* 描述 */}
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: '#666',
                  fontWeight: 'bold'
                }}
              >
                商品描述
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#333',
                  lineHeight: 1.8,
                  fontSize: '1.1rem'
                }}
              >
                {product.description}
              </Typography>

              <Divider sx={{ my: 3 }} />

              {/* 交易信息 */}
              <Box sx={{ mt: 'auto' }}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    color: '#666',
                    fontWeight: 'bold'
                  }}
                >
                  交易信息
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {product.location && (
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      <strong>交易地点：</strong>
                      {product.location}
                    </Typography>
                  )}
                  {product.contact && (
                    <Typography variant="body1" sx={{ color: '#333' }}>
                      <strong>联系方式：</strong>
                      {product.contact}
                    </Typography>
                  )}
                </Box>
              </Box>

              {/* 底部按钮 */}
              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    border: '2px solid #222',
                    color: '#222',
                    '&:hover': {
                      borderColor: '#FF8CB3',
                      color: '#FF8CB3'
                    }
                  }}
                >
                  返回
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    flex: 1,
                    py: 1.5,
                    border: '2px solid #222',
                    color: '#222',
                    '&:hover': {
                      borderColor: '#FF8CB3',
                      color: '#FF8CB3'
                    }
                  }}
                >
                  联系卖家
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail; 