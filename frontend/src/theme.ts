import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F193B7', // Soft Pink
    },
    secondary: {
      main: '#3A6A43', // Forest Green
    },
    background: {
      default: '#F6F6F6', // Ivory White
      paper: '#FBF8F4', // Staff Paper
    },
    text: {
      primary: '#1D1D1B', // Ebony Black
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#F193B7',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          backgroundColor: '#F193B7',
          '&:hover': {
            backgroundColor: '#d982a5',
          },
        },
        containedSecondary: {
          backgroundColor: '#3A6A43',
          '&:hover': {
            backgroundColor: '#2d5234',
          },
        },
      },
    },
  },
});

export default theme; 