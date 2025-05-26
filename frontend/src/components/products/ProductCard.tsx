import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  contact?: string;
  city?: string;
  location?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  category,
  description,
  contact,
  city,
  location
}) => {
  return (
    <Card
      component={RouterLink}
      to={`/product/${id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '2px solid #222',
        borderRadius: 2,
        width: '70%',
        mx: 'auto',
        textDecoration: 'none',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '40%' },
          flexShrink: 0,
          borderRight: { md: '2px solid #222' },
          borderBottom: { xs: '2px solid #222', md: 'none' },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '100%',
            height: { xs: '300px', md: '100%' },
            objectFit: 'cover',
          }}
          image={image}
          alt={title}
        />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flexGrow: 1, p: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip
              label={category}
              size="medium"
              sx={{
                bgcolor: '#F193B7',
                color: 'white',
                fontSize: '1rem',
                height: '32px',
                '&:hover': {
                  bgcolor: '#d982a5'
                }
              }}
            />
            {city && (
              <Chip
                label={city}
                size="medium"
                sx={{
                  bgcolor: '#222',
                  color: 'white',
                  fontSize: '1rem',
                  height: '32px',
                  '&:hover': {
                    bgcolor: '#FF8CB3'
                  }
                }}
              />
            )}
          </Box>
          <Typography
            gutterBottom
            variant="h4"
            component="h2"
            sx={{
              color: '#1D1D1B',
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              color: '#666'
            }}
          >
            {description}
          </Typography>
          <Divider sx={{ my: 0.5 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {location && (
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <strong style={{ color: '#222' }}>交易地点：</strong>
                <span style={{ color: '#666' }}>{location}</span>
              </Typography>
            )}
            {contact && (
              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <strong style={{ color: '#222' }}>联系方式：</strong>
                <span style={{ color: '#666' }}>{contact}</span>
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 'auto', pt: 1.5 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 'bold',
                color: '#222',
                fontSize: { xs: '1.8rem', sm: '2.5rem' },
                textAlign: 'right'
              }}
            >
              ¥{price.toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard; 