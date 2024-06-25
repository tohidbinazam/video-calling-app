import { Route, Routes } from 'react-router-dom';
import './App.scss';
import SignUp from './pages/sign-up/SignUp';
import Login from './pages/login/Login';
import EmailSent from './pages/EmailSent/EmailSent';
import AccountVerify from './pages/AccountVerify/AccountVerify';
import Room from './pages/room/Room';
import Verify from './pages/verify/Verify';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import InvalidLink from './pages/InvalidLink/InvalidLink';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { isLoggedIn, loginStatus } from './redux/auth/action';
import PrivateGard from './middlewares/PrivateGard';
import PublicGard from './middlewares/PublicGard';

function App() {
  const dispatch = useDispatch();

  // Get token
  const token = Cookies.get('token');

  if (token) {
    dispatch(loginStatus());
    dispatch(isLoggedIn(token));
  }

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateGard>
              <Room />
            </PrivateGard>
          }
        />
        <Route
          path='/signup'
          element={
            <PublicGard>
              <SignUp />
            </PublicGard>
          }
        />
        <Route
          path='/login'
          element={
            <PublicGard>
              <Login />
            </PublicGard>
          }
        />
        <Route path='/account-verify' element={<AccountVerify />} />
        <Route path='/email-sent/:main' element={<EmailSent />} />
        <Route path='/verify-account/:token' element={<Verify />} />
        <Route path='/invalid-link/:main' element={<InvalidLink />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
