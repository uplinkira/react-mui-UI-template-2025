import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const ProductSkeleton: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px',
      }}
    >
      <CircularProgress 
        size={60}
        thickness={4}
        sx={{
          color: '#222',
        }}
      />
    </Box>
  );
};

export default ProductSkeleton; 