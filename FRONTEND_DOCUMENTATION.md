# Frontend Documentation - User Management System

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Component Structure](#component-structure)
3. [State Management](#state-management)
4. [Routing](#routing)
5. [UI Components](#ui-components)
6. [Form Handling](#form-handling)
7. [API Integration](#api-integration)
8. [Toast Notifications](#toast-notifications)
9. [Theme and Styling](#theme-and-styling)

## Architecture Overview

### Project Structure
```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Shared components like Navbar
│   │   ├── forms/          # Form-related components
│   │   └── users/          # User-specific components
│   ├── context/            # React Context providers
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── utils/              # Utility functions
│   └── theme/             # Theme configuration
```

### Key Technologies
- React 18 with Hooks
- Material-UI for UI components
- React Router v6 for routing
- React Context for state management
- Axios for API calls
- React Toastify for notifications

## Component Structure

### Pages
1. **Dashboard** (`pages/Dashboard.jsx`)
   - Main landing page
   - Displays user list
   - Handles user deletion

2. **CreateUser** (`pages/CreateUser.jsx`)
   - New user creation form
   - Form validation
   - Success/error handling

3. **EditUser** (`pages/EditUser.jsx`)
   - User editing interface
   - Pre-populated form
   - Update handling

4. **UserProfile** (`pages/UserProfile.jsx`)
   - Detailed user view
   - Location display
   - Edit/Delete options

### Components

1. **UserList** (`components/users/UserList.jsx`)
   ```jsx
   const UserList = () => {
     const { users, deleteUser } = useUsers();
     // Handles user listing and delete operations
   }
   ```

2. **UserForm** (`components/users/UserForm.jsx`)
   ```jsx
   const UserForm = ({ user, onSubmit, submitButtonText }) => {
     // Handles both create and edit operations
     // Form validation and submission
   }
   ```

3. **Navbar** (`components/common/Navbar.jsx`)
   ```jsx
   const Navbar = () => {
     // Navigation and responsive menu
   }
   ```

## State Management

### UserContext (`context/UserContext.jsx`)
```jsx
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // CRUD Operations
  const fetchUsers = async () => {...}
  const addUser = async (userData) => {...}
  const updateUser = async (id, userData) => {...}
  const deleteUser = async (id) => {...}
}
```

## Routing

### Route Configuration
```jsx
<Router>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users/new" element={<CreateUser />} />
    <Route path="/users/:id" element={<UserProfile />} />
    <Route path="/users/:id/edit" element={<EditUser />} />
  </Routes>
</Router>
```

## Form Handling

### Validation Flow
1. Client-side validation in `UserForm`
2. API validation handling
3. Error display and toast notifications

### Form Structure
```jsx
const initialState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  address: {
    street: '',
    city: '',
    zip: '',
    geo: { lat: '', lng: '' }
  }
};
```

## API Integration

### API Service (`services/api.js`)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const userService = {
  getAllUsers: async () => {...},
  getUserById: async (id) => {...},
  createUser: async (userData) => {...},
  updateUser: async (id, userData) => {...},
  deleteUser: async (id) => {...}
};
```

## Toast Notifications

### Configuration (`utils/toast.jsx`)
```jsx
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  theme: "dark",
  // ... other configurations
};

export const showToast = {
  success: (message) => {...},
  error: (message) => {...},
  info: (message) => {...}
};
```

## Theme and Styling

### Material-UI Theme
```javascript
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    }
  }
});
```

## Application Flow

### Create User Flow
1. User clicks "Add User" in Navbar
2. Navigates to `/users/new`
3. Fills form with validation
4. On submit:
   - Client validation
   - API call
   - Toast notification
   - Redirect to dashboard

### Edit User Flow
1. User clicks edit icon
2. Navigates to `/users/:id/edit`
3. Form pre-populated
4. On submit:
   - Validation
   - API update
   - Toast notification
   - Redirect to dashboard

### Delete User Flow
1. User clicks delete icon
2. Confirmation dialog
3. On confirm:
   - API delete
   - Toast notification
   - Update UI list

## Error Handling

### Types of Errors
1. Form Validation Errors
   - Displayed under each field
   - Toast notification for submission errors

2. API Errors
   - Toast notifications
   - Error state in context
   - Error boundaries for component errors

## Responsive Design

### Breakpoints
```javascript
const breakpoints = {
  xs: 0,
  sm: 600px,
  md: 960px,
  lg: 1280px,
  xl: 1920px
};
```

### Table Responsiveness
- Progressive disclosure of columns
- Mobile-optimized actions
- Touch-friendly interface

## Performance Considerations

1. **Optimization Techniques**
   - Memoization with useCallback and useMemo
   - Lazy loading of components
   - Efficient re-rendering with proper key usage

2. **Loading States**
   - Skeleton loaders
   - Progress indicators
   - Optimistic updates

## Best Practices

1. **Code Organization**
   - Component composition
   - Custom hooks for logic reuse
   - Consistent file structure

2. **State Management**
   - Context for global state
   - Local state for component-specific data
   - Props for component communication

3. **Error Handling**
   - Graceful degradation
   - User-friendly error messages
   - Proper error boundaries
