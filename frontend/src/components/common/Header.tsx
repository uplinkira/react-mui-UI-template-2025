import React, { useState, useEffect } from 'react';
import { Toolbar, Box, Typography, Button, IconButton, Tooltip, InputBase, Paper, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

const HEADER_HEIGHT = 80;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      const storedUsername = localStorage.getItem('username');
      setIsLoggedIn(loginStatus);
      setUsername(storedUsername || '');
    };

    // 检查初始登录状态
    checkLoginStatus();

    // 监听登录状态变化
    const handleLoginChange = () => {
      checkLoginStatus();
    };

    // 添加自定义事件监听器
    window.addEventListener('login-status-change', handleLoginChange);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('login-status-change', handleLoginChange);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 2000,
        bgcolor: '#fafafa',
        color: '#222',
        height: `${HEADER_HEIGHT}px`,
      }}
    >
      <Toolbar
        sx={{
          px: 0,
          py: 2,
          minHeight: HEADER_HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* 居中内容区，宽度和分割线一致 */}
        <Box
          sx={{
            width: '90%',
            maxWidth: 1200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* 左侧Logo/公司名 */}
          <Box sx={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 2 }}>
              [公司名称]
            </Typography>
          </Box>
          {/* 中间搜索框 */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', mx: 4 }}>
            <Paper
              component="form"
              sx={{
                p: '2px 8px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                borderRadius: 2,
                border: '2px solid #222',
                boxShadow: 3,
                bgcolor: '#fff',
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: 16 }}
                placeholder="搜索您需要的[商品类型]"
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="submit" sx={{ p: '6px', color: '#222' }} aria-label="search">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </IconButton>
            </Paper>
          </Box>
          {/* 右侧按钮区 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip
              title="发布信息"
              arrow
              placement="bottom"
              componentsProps={{
                tooltip: {
                  sx: {
                    fontSize: 20,
                    px: 3,
                    py: 1.5,
                    bgcolor: '#222',
                    color: '#fff',
                    borderRadius: 2,
                    boxShadow: 3,
                  }
                },
                arrow: {
                  sx: {
                    color: '#222',
                    fontSize: 30,
                  }
                }
              }}
            >
              <IconButton
                sx={{ bgcolor: '#222', color: '#fff', mr: 1, '&:hover': { bgcolor: '#FF8CB3', color: '#222' } }}
                onClick={() => {
                  window.dispatchEvent(new Event('open-publish-dialog'));
                }}
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontWeight: 'bold', fontSize: 16 }}>
                  欢迎，{username}
                </Typography>
                <Tooltip title="退出登录">
                  <IconButton
                    onClick={handleLogout}
                    sx={{
                      color: '#222',
                      '&:hover': { color: '#FF8CB3' }
                    }}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ fontWeight: 'bold', fontSize: 16, border: '2px solid #222', borderRadius: 2, px: 2, bgcolor: '#fff', ml: 1, '&:hover': { bgcolor: '#FF8CB3', color: '#222', borderColor: '#FF8CB3' } }}
                >
                  登录
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/register"
                  sx={{ fontWeight: 'bold', fontSize: 16, border: '2px solid #222', borderRadius: 2, px: 2, bgcolor: '#fff', ml: 1, '&:hover': { bgcolor: '#FF8CB3', color: '#222', borderColor: '#FF8CB3' } }}
                >
                  注册
                </Button>
              </>
            )}
          </Box>
        </Box>
        {/* 居中粗分割线，宽度和内容区一致 */}
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: 1500,
            borderBottom: '3px solid #222',
            borderRadius: 2,
          }}
        />
      </Toolbar>
    </Box>
  );
};

export default Header; 