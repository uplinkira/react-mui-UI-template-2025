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
  const [isFavorite, setIsFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      component={RouterLink}
      to={`/product/${id}`}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        height: { xs: 'auto', sm: 280 },
        position: 'relative',
        border: '2px solid #000',
        borderRadius: 2,
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        textDecoration: 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)'
        }
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { xs: '100%', sm: 320 },
          height: { xs: 200, sm: '100%' },
          objectFit: 'cover',
          borderRight: { sm: '2px solid #000' }
        }}
        image={image}
        alt={title}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          p: 3,
          height: '100%'
        }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
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
              mb: 2,
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              fontSize: '1.2rem',
              lineHeight: 1.6
            }}
          >
            {description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {location && (
              <Typography variant="body2" color="text.secondary">
                <strong>交易地点：</strong>{location}
              </Typography>
            )}
            {contact && (
              <Typography variant="body2" color="text.secondary">
                <strong>联系方式：</strong>{contact}
              </Typography>
            )}
          </Box>
          <Typography
            variant="h3"
            sx={{
              mt: 'auto',
              fontWeight: 'bold',
              color: '#222',
              fontSize: { xs: '1.8rem', sm: '2.5rem' }
            }}
          >
            ¥{price.toLocaleString()}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ProductCard; 