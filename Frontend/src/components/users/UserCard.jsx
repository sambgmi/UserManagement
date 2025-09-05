import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const { deleteUser } = useUsers();
  
  const handleEdit = () => {
    navigate(`/users/${user._id}/edit`);
  };

  const handleView = () => {
    navigate(`/users/${user._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(user._id);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title">{user.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{user.company}</h6>
          </div>
          <div className="btn-group">
            <button
              onClick={handleView}
              className="btn btn-sm btn-outline-primary"
            >
              View
            </button>
            <button
              onClick={handleEdit}
              className="btn btn-sm btn-outline-secondary"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          </div>
        </div>
        
        <div className="mt-2">
          <p className="card-text">
            <small className="text-muted">
              <i className="bi bi-envelope"></i> {user.email}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              <i className="bi bi-telephone"></i> {user.phone}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              <i className="bi bi-geo-alt"></i>
              {user.address.city}, {user.address.zip}
            </small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
