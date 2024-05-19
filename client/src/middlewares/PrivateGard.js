import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateGard = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? children : <Navigate to='/login' />;
};

export default PrivateGard;
