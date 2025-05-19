import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, MenuItem, Box, Typography, Select, InputLabel, FormControl
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// 示例分类，实际使用时需要替换
const categories = ['分类1', '分类2', '分类3', '分类4'];
// 示例城市，实际使用时需要替换
const cities = ['城市1', '城市2', '城市3', '城市4', '城市5'];

export interface PublishProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image: string;
  contact: string;
  city: string;
  location: string;
}

interface PublishDialogProps {
  open: boolean;
  onClose: () => void;
  onAddProduct: (product: PublishProduct) => void;
}

const PublishDialog: React.FC<PublishDialogProps> = ({ open, onClose, onAddProduct }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [contact, setContact] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl('');
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreview(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setImageFile(null);
    setImagePreview(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 检查是否登录
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      setError('请先登录后再发布信息');
      setTimeout(() => {
        onClose();
        navigate('/login');
      }, 1500);
      return;
    }

    if (!title || !category || !price || !description || !contact || !city || !location) {
      setError('请填写所有必填项');
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      setError('价格必须为正数');
      return;
    }
    if (!imagePreview) {
      setError('请上传或填写图片');
      return;
    }
    const newProduct: PublishProduct = {
      id: Date.now().toString(),
      title,
      category,
      price: Number(price),
      description,
      image: imagePreview,
      contact,
      city,
      location,
    };
    onAddProduct(newProduct);
    // 重置表单
    setTitle('');
    setCategory('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setImageFile(null);
    setImagePreview('');
    setContact('');
    setCity('');
    setLocation('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setError('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          mt: { xs: '56px', sm: '80px' }, // 响应式 margin-top，对应 header 高度
          maxHeight: { xs: 'calc(100vh - 56px - 32px)', sm: 'calc(100vh - 80px - 32px)' }, // 响应式最大高度
          position: 'relative',
          zIndex: 2001, // 确保比 header 的 z-index (2000) 高
          '& .MuiDialogContent-root': {
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
              '&:hover': {
                background: '#555',
              },
            },
          },
        },
      }}
    >
      <DialogTitle sx={{ 
        borderBottom: '1px solid #e0e0e0',
        pb: 2,
        '& .MuiTypography-root': {
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          fontWeight: 'bold',
        }
      }}>
        发布[商品类型]信息
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ 
          pt: 3,
          '& .MuiTextField-root, & .MuiFormControl-root': {
            mb: 2,
          }
        }}>
          <TextField
            label="标题"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>类别</InputLabel>
            <Select
              value={category}
              label="类别"
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <MenuItem value={cat} key={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>城市</InputLabel>
            <Select
              value={city}
              label="城市"
              onChange={e => setCity(e.target.value)}
            >
              {cities.map(c => (
                <MenuItem value={c} key={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="交易地点"
            value={location}
            onChange={e => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="价格 (元)"
            value={price}
            onChange={e => setPrice(e.target.value.replace(/[^\d.]/g, ''))}
            fullWidth
            margin="normal"
            required
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          <TextField
            label="描述"
            value={description}
            onChange={e => setDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            required
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
            <Button variant="outlined" component="label">
              上传图片
              <input type="file" accept="image/*" hidden onChange={handleImageFileChange} />
            </Button>
            <TextField
              label="图片URL"
              value={imageUrl}
              onChange={handleImageUrlChange}
              fullWidth
            />
          </Box>
          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">图片预览：</Typography>
              <Box
                component="img"
                src={imagePreview}
                alt="预览"
                sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 2, mt: 1 }}
              />
            </Box>
          )}
          <TextField
            label="联系方式"
            value={contact}
            onChange={e => setContact(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        </DialogContent>
        <DialogActions sx={{ 
          px: 3,
          py: 2,
          borderTop: '1px solid #e0e0e0',
          '& .MuiButton-root': {
            minWidth: '100px',
            borderRadius: '8px',
          }
        }}>
          <Button 
            onClick={handleClose}
            sx={{
              border: '2px solid #222',
              color: '#222',
              '&:hover': {
                borderColor: '#FF8CB3',
                color: '#FF8CB3',
              }
            }}
          >
            取消
          </Button>
          <Button 
            type="submit" 
            sx={{
              border: '2px solid #222',
              color: '#222',
              '&:hover': {
                borderColor: '#FF8CB3',
                color: '#FF8CB3',
              }
            }}
          >
            发布
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PublishDialog; 