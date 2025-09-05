import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { UserProvider } from "./context/UserContext";
import theme from './theme/theme';
import Navbar from './components/common/Navbar';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/CreateUser';
import UserProfile from './pages/UserProfile';
import EditUser from './pages/EditUser';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <div className="app" style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/users/new" element={<CreateUser />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="/users/:id/edit" element={<EditUser />} />
              </Routes>
            </main>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <ToastContainer />
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
