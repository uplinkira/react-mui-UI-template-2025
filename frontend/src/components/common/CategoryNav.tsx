import React from 'react';
import { Box, Typography, Divider, ButtonBase } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const categories = [
  { label: '首页', path: '/' },
  { label: 'cat 1', path: '/category/cat1' },
  { label: 'cat 2', path: '/category/cat2' },
  { label: 'cat 3', path: '/category/cat3' },
  { label: 'cat 4', path: '/category/cat4' },
];

const highlightColor = '#FF8CB3'; // 粉色高亮

const CategoryNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 判断当前高亮项
  const getActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      sx={{
        width: 120,
        minHeight: '28vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        py: 0.5,
        bgcolor: 'transparent',
        boxShadow: 'none',
        border: 'none',
        position: 'fixed',
        left: '5%',
        top: '25%',
        transform: 'none',
      }}
    >
      {/* 顶部分割线，圆头 */}
      <Divider sx={{
        width: '70%',
        mb: 2,
        borderBottomWidth: 7,
        borderColor: '#222',
        borderRadius: 4,
        borderStyle: 'solid',
        borderBottomLeftRadius: 99,
        borderBottomRightRadius: 99,
      }} />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {categories.map((cat) => (
          <ButtonBase
            key={cat.path}
            onClick={() => navigate(cat.path)}
            sx={{
              width: '95%',
              borderRadius: 3,
              mb: 0.3,
              py: 0.5,
              px: 0.5,
              minHeight: 32,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              color: '#222',
              fontSize: getActive(cat.path) ? 18 : 13,
              transition: 'font-size 0.2s cubic-bezier(.4,0,.2,1)',
              background: getActive(cat.path) ? highlightColor : 'transparent',
              boxShadow: 'none',
              border: 'none',
              '&:hover': {
                background: highlightColor,
                color: '#222',
                boxShadow: 'none',
                fontSize: 18,
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#222',
                fontSize: 18,
                letterSpacing: 1,
              }}
            >
              {cat.label}
            </Typography>
          </ButtonBase>
        ))}
      </Box>
      {/* 底部分割线，圆头 */}
      <Divider sx={{
        width: '70%',
        mt: 2,
        borderBottomWidth: 7,
        borderColor: '#222',
        borderRadius: 4,
        borderStyle: 'solid',
        borderBottomLeftRadius: 99,
        borderBottomRightRadius: 99,
      }} />
    </Box>
  );
};

export default CategoryNav; 