import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username || !password) {
      setError('用户名和密码不能为空');
      return;
    }

    if (password.length < 6) {
      setError('密码长度不能少于6位');
      return;
    }

    // 读取注册信息
    const regUserStr = localStorage.getItem('registeredUser');
    if (!regUserStr) {
      setError('未找到注册用户，请先注册');
      return;
    }

    try {
      const regUser = JSON.parse(regUserStr);
      
      // 检查用户名/邮箱和密码是否匹配
      const isUsernameMatch = username === regUser.username;
      const isEmailMatch = username === regUser.email;
      const isPasswordMatch = password === regUser.password;

      if ((!isUsernameMatch && !isEmailMatch) || !isPasswordMatch) {
        setError('用户名/邮箱或密码错误');
        return;
      }

      // 登录成功
      setSuccess(true);
      
      // 设置登录状态
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', regUser.username);
      
      // 触发登录状态变化事件
      window.dispatchEvent(new Event('login-status-change'));
      
      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError('登录失败，请稍后重试');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Paper elevation={6} sx={{ p: 5, width: 350 }}>
        <Typography variant="h5" fontWeight="bold" align="center" mb={3}>
          登录
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="用户名/邮箱"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="密码"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>登录成功！正在跳转...</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, fontWeight: 'bold', fontSize: 18 }}
          >
            登录
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 