import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  AdminPanelSettings as AdminIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Only show Dashboard and Add User
  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Add User', icon: <PersonAddIcon />, path: '/users/new' },
  ];

  const isActive = (path) => location.pathname === path;

  const NavButton = ({ text, icon, path }) => (
    <Button
      component={RouterLink}
      to={path}
      startIcon={icon}
      sx={{
        px: 2,
        py: 1,
        mx: 0.5,
        fontWeight: 500,
        fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
        color: isActive(path) ? '#fff' : 'rgb(126,126,126)',
        backgroundColor: isActive(path) ? 'rgba(255,255,255,0.08)' : 'transparent',
        borderRadius: 2,
        textTransform: 'none',
        fontSize: '0.95rem',
        boxShadow: 'none',
        transition: 'all 0.2s',
        letterSpacing: '0.01em',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.12)',
          color: '#fff',
        },
      }}
    >
      {text}
    </Button>
  );

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'primary.main' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              color: isActive(item.path) ? '#BB86FC' : '#FFFFFF',
              backgroundColor: isActive(item.path) ? 'rgba(187, 134, 252, 0.15)' : 'transparent',
              borderRadius: 2,
              mx: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'rgba(187, 134, 252, 0.08)',
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" elevation={0} sx={{ background: '#121212', borderBottom: '1px solid #232323', py: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 72 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: '#fff', color: '#121212', width: 40, height: 40, mr: 1, boxShadow: '0 2px 10px #232323' }}>
              {/* User management logo SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="#BB86FC"/>
                <circle cx="12" cy="11" r="3.5" fill="#fff" stroke="#3700B3" strokeWidth="1.5" />
                <path d="M6.5 18c.5-2.5 2.5-4 5.5-4s5 1.5 5.5 4" stroke="#3700B3" strokeWidth="1.5" fill="none" />
              </svg>
            </Avatar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                fontSize: '1.25rem',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              User Management
            </Typography>
          </Box>

          {/* Nav Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1, ml: 4 }}>
              {navItems.map((item) => (
                <NavButton key={item.text} {...item} />
              ))}
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      {/* Drawer for mobile */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260, background: '#121212', color: '#fff' },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#fff', color: '#121212', width: 32, height: 32, mr: 1 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="4" fill="#BB86FC"/><path d="M8 8L16 16" stroke="#121212" strokeWidth="2"/><path d="M16 8L8 16" stroke="#121212" strokeWidth="2"/></svg>
            </Avatar>
            <Typography variant="body1" sx={{ fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>User Management</Typography>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} component={RouterLink} to={item.path} onClick={handleDrawerToggle} sx={{ color: '#fff', fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', fontWeight: 500 }}>
                <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
