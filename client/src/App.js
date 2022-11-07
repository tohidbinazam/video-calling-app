import { Route, Routes } from 'react-router-dom';
import './App.css';
import AccountVerify from './pages/AccountVerify/AccountVerify';
import EmailSent from './pages/EmailSent/EmailSent';
import Login from './pages/login/Login';
import Room from './pages/room/Room';
import SignUp from './pages/sign-up/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={ <SignUp /> }/>
        <Route path='/account-verify/email-sent' element={ <EmailSent /> } />
        <Route path='/account-verify' element={ <AccountVerify /> } />
        <Route path='/login' element={ <Login /> }/>
        <Route path='/room' element={ <Room /> }/>
      </Routes>
    </div>
  );
}

export default App;
