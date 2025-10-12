import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setIsUserAuthorised } from '../redux/slices/isAuthorisedSlice';

const ProtectedRoute = ({ children }) => {
  const isUserAuthorised = useSelector((state) => state.isUserAuthorised?.value);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('bright-path-auth-token');
    if (token) {
      dispatch(setIsUserAuthorised(true))
    }
    setIsCheckingAuth(false);
  }, [dispatch])

  if (isCheckingAuth) {
    return <div>Checking authentication...</div>;
  }

  if (!isUserAuthorised) {
    return <Navigate to="/login" replace />;
  }

  return children;

};

export default ProtectedRoute;