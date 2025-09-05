import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/users/UserForm';
import { useUsers } from '../context/UserContext';
import { userService } from '../services/api';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUserById(id);
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
        <Card 
          sx={{ 
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3,
            border: 1,
            borderColor: 'error.main',
          }}
        >
          <CardContent>
            <Alert 
              severity="error" 
              sx={{ 
                mb: 2,
                '& .MuiAlert-icon': { color: 'error.main' },
                bgcolor: 'background.paper',
                color: 'error.main'
              }}
            >
              User not found. Please try again or go back to the user list.
            </Alert>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Back to User List
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

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
              fontWeight: 700
            }}
          >
            Edit User
          </Typography>
          {user && (
            <UserForm
              user={user}
              onSubmit={async (data) => {
                try {
                  await updateUser(id, data);
                  navigate('/');
                } catch (err) {
                  setError(err.message);
                }
              }}
              submitButtonText="Update User"
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditUser;
