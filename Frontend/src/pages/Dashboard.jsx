import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import UserList from '../components/users/UserList';
import { useUsers } from '../context/UserContext';

const Dashboard = () => {
  const { fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Box sx={{ 
      p: 3, 
      bgcolor: 'background.default',
      minHeight: 'calc(100vh - 64px)'
    }}>
      <UserList />
    </Box>
  );
};

export default Dashboard;
