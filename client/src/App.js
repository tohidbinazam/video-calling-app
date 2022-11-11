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
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { isLoggedIn } from './redux/auth/action';
import AuthMiddleware from './middlewares/AuthMiddleware';

function App() {

  const dispatch = useDispatch()

  // Get token
  const token = Cookies.get('token')

  useEffect(() => {
    
    dispatch(isLoggedIn(token))

  },[dispatch, token])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <AuthMiddleware> <Room /> </AuthMiddleware> }/>
        <Route path='/signup' element={ <AuthMiddleware> <SignUp /> </AuthMiddleware> }/>
        <Route path='/login' element={ <AuthMiddleware> <Login /> </AuthMiddleware> } />
        <Route path='/account-verify' element={ <AccountVerify /> } />
        <Route path='/account-verify/email-sent' element={ <EmailSent /> } />
        <Route path='/verify-account/:token' element={ <Verify /> } />
        <Route path='/invalid-link/:main' element={ <InvalidLink /> } />
        <Route path='/forgot-password' element={ <ForgotPassword /> } />
        <Route path='/reset-password/:token' element={ <ResetPassword /> } />
      </Routes>
    </div>
  );
}

export default App;
