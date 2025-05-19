import React from 'react';
import { Box } from '@mui/material';
import CategoryNav from './CategoryNav';
import Header from './Header';
import Footer from './Footer';

const NAV_WIDTH = 160;
const HEADER_HEIGHT = 80;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafafa', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* 主体部分：左侧悬浮导航+居中内容 */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 左侧悬浮导航栏 */}
        <Box
          sx={{
            position: 'fixed',
            top: HEADER_HEIGHT,
            left: 0,
            width: NAV_WIDTH,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
            zIndex: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'transparent',
            pointerEvents: 'auto',
          }}
        >
          <CategoryNav />
        </Box>
        {/* 主内容区，始终居中 */}
        <Box
          sx={{
            pt: `${HEADER_HEIGHT}px`,
            width: '100%',
            minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 1000, // 可根据需要调整
              px: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
      {/* Footer 脚注，始终全宽且只渲染一次 */}
      <Footer />
    </Box>
  );
};

export default Layout; 