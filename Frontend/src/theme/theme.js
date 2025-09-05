import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
      light: '#BB86FC', // Primary color
      dark: '#3700B3', // Primary variant
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#03DAC6', // Secondary color
      light: '#03DAC6',
      dark: '#018786',
      contrastText: '#000000',
    },
    background: {
      default: '#121212', // Background
      paper: '#121212',   // Surface
    },
    error: {
      main: '#CF6679',    // Error color
      light: '#CF6679',
      dark: '#B00020',
      contrastText: '#000000',
    },
    text: {
      primary: '#FFFFFF',     // On Primary
      secondary: '#FFFFFF',   // On Secondary
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
    action: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  typography: {
    fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
    h1: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    h2: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    h3: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    h4: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    h5: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    h6: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 700,
    },
    body1: {
      color: '#FFFFFF',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 400,
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
      fontWeight: 400,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        contained: {
          backgroundColor: '#BB86FC',
          '&:hover': {
            backgroundColor: '#3700B3',
          },
        },
        outlined: {
          borderColor: '#BB86FC',
          color: '#BB86FC',
          '&:hover': {
            borderColor: '#3700B3',
            backgroundColor: 'rgba(187, 134, 252, 0.08)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
});

export default theme;
