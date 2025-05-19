import React from 'react';
import { Box, Typography, Divider, ButtonBase } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

// 分类配置
// 每个分类项包含：
// - label: 显示的文本
// - path: 路由路径
// 注意：path 需要与后端 API 的分类标识保持一致
const categories = [
  { label: '首页', path: '/' },
  { label: '分类1', path: '/category/category1' },
  { label: '分类2', path: '/category/category2' },
  { label: '分类3', path: '/category/category3' },
  { label: '分类4', path: '/category/category4' },
];

// 高亮颜色配置
const highlightColor = '#FF8CB3';

/**
 * 通用分类导航组件
 * 功能：
 * 1. 显示分类列表
 * 2. 支持路由导航
 * 3. 当前分类高亮显示
 * 4. 响应式布局
 */
const CategoryNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 判断当前分类是否激活
  // 首页特殊处理：完全匹配
  // 其他分类：路径前缀匹配
  const getActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <Box
      sx={{
        width: 140,
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        py: 4,
        bgcolor: 'transparent',
        boxShadow: 'none',
        border: 'none',
      }}
    >
      {/* 顶部分割线 */}
      <Divider sx={{
        width: '70%',
        mb: 3,
        borderBottomWidth: 7,
        borderColor: '#222',
        borderRadius: 4,
        borderStyle: 'solid',
        borderBottomLeftRadius: 99,
        borderBottomRightRadius: 99,
      }} />
      
      {/* 分类列表 */}
      {categories.map((cat) => (
        <ButtonBase
          key={cat.path}
          onClick={() => navigate(cat.path)}
          sx={{
            width: '95%',
            borderRadius: 3,
            mb: 2.5,
            py: 1.2,
            px: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            color: '#222',
            fontSize: 18,
            transition: 'background 0.2s, color 0.2s',
            background: getActive(cat.path) ? highlightColor : 'transparent',
            boxShadow: 'none',
            border: 'none',
            '&:hover': {
              background: highlightColor,
              color: '#222',
              boxShadow: 'none',
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

      {/* 底部分割线 */}
      <Divider sx={{
        width: '70%',
        mt: 3,
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