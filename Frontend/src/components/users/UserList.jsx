import React, { useContext } from 'react';
import { useUsers } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
  const { users, deleteUser } = useUsers();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', color: 'primary.main', fontWeight: 700, fontSize: 22 }}
      >
      
      </Typography>
      <TableContainer component={Paper} sx={{ background: 'primary.dark', borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: 'primary.light' }}>
              <TableCell sx={{ color: '#BB86FC', fontSize: 15, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', background: 'primary.light' }}>Name</TableCell>
              <TableCell sx={{ color: '#BB86FC', fontSize: 15, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', background: 'primary.light' }}>Email</TableCell>
              <TableCell sx={{ color: '#BB86FC', fontSize: 15, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', background: 'primary.light' }}>Phone</TableCell>
              <TableCell align="right" sx={{ color: '#BB86FC', fontSize: 15, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif', background: 'primary.light' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.length > 0 && users.map((user) => (
              <TableRow key={user._id} hover sx={{ '&:hover': { background: 'secondary.light' } }}>
                <TableCell sx={{ color: 'text.primary', fontSize: 14, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif' }}>{user.name}</TableCell>
                <TableCell sx={{ color: 'text.primary', fontSize: 14, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif' }}>{user.email}</TableCell>
                <TableCell sx={{ color: 'text.primary', fontSize: 14, fontFamily: 'Aeonik Fono Regular, Aeonik Fono Regular Placeholder, sans-serif' }}>{user.phone}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(user._id)}>
                    <EditIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserList;
