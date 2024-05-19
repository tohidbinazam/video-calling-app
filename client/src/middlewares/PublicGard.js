import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicGard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return !isLoggedIn ? children : <Navigate to='/' />;
};

export default PublicGard;
