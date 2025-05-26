import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        bgcolor: '#F193B7',
        color: 'white',
        textAlign: 'center',
        fontSize: '0.875rem'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              Copyright © 2025 All Rights Reserved. [公司名称]
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              客服电话：[客服电话] | 工作时间：[工作时间] | 虚假信息投诉邮箱：[投诉邮箱]
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              公司地址：[公司地址]
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Link
              href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              [备案号]
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer; 