import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Button,
  Alert,
  TextField
} from '@mui/material';
import { validateUserData } from '../../utils/validation';
import { showToast } from '../../utils/toast.jsx';

const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: {
    street: '',
    city: '',
    zip: '',
    geo: {
      lat: '',
      lng: ''
    }
  }
};

const UserForm = ({ user = null, onSubmit, submitButtonText = 'Save' }) => {
  const [formData, setFormData] = useState(user || initialState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleGeoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        geo: {
          ...prev.address.geo,
          [name]: value ? parseFloat(value) : ''
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate form data
    const validation = validateUserData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await onSubmit(formData);
      navigate('/');
    } catch (error) {
      const errorMessage = error?.message || error?.toString() || 'An error occurred';
      // Check for specific error messages from backend
      if (errorMessage.includes('phone')) {
        setErrors({ phone: errorMessage }); // Set phone-specific error
        showToast.error(errorMessage); // Show toast for the error
      } else {
        setErrors({ submit: errorMessage }); // Set general submission error
        showToast.error(errorMessage); // Show toast for the error
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            Personal Information
          </Typography>
          
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={!!errors.company}
            helperText={errors.company}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
        </Grid>

        {/* Address Information */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              color: 'primary.main',
              fontWeight: 700,
            }}
          >
            Address Information
          </Typography>
          
          <TextField
            fullWidth
            label="Street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            error={!!errors.address?.street}
            helperText={errors.address?.street}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          <TextField
            fullWidth
            label="City"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            error={!!errors.address?.city}
            helperText={errors.address?.city}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          
          <TextField
            fullWidth
            label="ZIP Code"
            name="address.zip"
            value={formData.address.zip}
            onChange={handleChange}
            error={!!errors.address?.zip}
            helperText={errors.address?.zip}
            required
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'primary.main',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.light',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'text.secondary',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
              '& .MuiInputBase-input': {
                color: 'text.primary',
              },
            }}
          />
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Latitude"
                name="lat"
                type="number"
                value={formData.address.geo.lat}
                onChange={handleGeoChange}
                error={!!errors.address?.geo}
                helperText={errors.address?.geo}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'text.primary',
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Longitude"
                name="lng"
                type="number"
                value={formData.address.geo.lng}
                onChange={handleGeoChange}
                error={!!errors.address?.geo}
                helperText={errors.address?.geo}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.light',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'text.secondary',
                    '&.Mui-focused': {
                      color: 'primary.main',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'text.primary',
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {errors.submit && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 3,
            mb: 2,
            '& .MuiAlert-icon': { 
              color: 'error.main' 
            },
            bgcolor: 'background.paper',
            color: 'error.main'
          }}
        >
          {errors.submit}
        </Alert>
      )}

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          {submitButtonText}
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': {
              borderColor: 'primary.dark',
              bgcolor: 'rgba(187, 134, 252, 0.08)',
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
