import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/users/UserForm';
import { useUsers } from '../context/UserContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';

const CreateUser = () => {
  const navigate = useNavigate();
  const { addUser } = useUsers();

  const handleSubmit = async (userData) => {
    try {
      await addUser(userData);
      navigate('/');
    } catch (error) {
      // Let the error propagate to the form component
      throw error;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Card 
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          border: 1,
          borderColor: 'primary.main'
        }}
      >
        <CardContent>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              mb: 3,
              color: 'primary.main',
              fontWeight: 700,
              fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif',
            }}
          >
            Create New User
          </Typography>
          <UserForm 
            onSubmit={handleSubmit}
            submitButtonText="Create User"
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateUser;
