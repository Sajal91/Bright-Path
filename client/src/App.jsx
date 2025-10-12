import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, data } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Landing from './components/Landing';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import FlashMessage from './components/FlashMessage.jsx';
import axios from 'axios';
import { setIsUserAuthorised } from './redux/slices/isAuthorisedSlice.js';

function App() {
  const flashMessage = useSelector((state) => state.flashMessage.message);
  const flashMessageStatus = useSelector((state) => state.flashMessage.success);
  const isUserAuthorised = useSelector((state) => state.isUserAuthorised.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const getUserDetails = async (token) => {
    return await axios.get(`${import.meta.env.VITE_CLIENT_URL}/user/details`, {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('bright-path-auth-token');
    getUserDetails(token)
      .then((res) => {
        setUser(res.data.user)
        dispatch(setIsUserAuthorised(true))
      }).catch((err) => {
        setUser(null)
        localStorage.removeItem('bright-path-auth-token')
        dispatch(setIsUserAuthorised(false))
      })
  }, [localStorage.getItem('bright-path-auth-token')])

  return (
    <div className="App">
      <Navbar user={user} />
      {flashMessage && <FlashMessage status={flashMessageStatus} message={flashMessage} />}
      <Routes>
        <Route path="/" element={isUserAuthorised ? <Navigate to="/dashboard" replace /> : <Landing />} />
        <Route path="/login" element={isUserAuthorised ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isUserAuthorised ? <Navigate to="/" replace /> : <Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute children={<Dashboard />} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;