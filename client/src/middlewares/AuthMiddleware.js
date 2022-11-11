import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AuthMiddleware = ({ children }) => {

    // Get targeted page
    const file = children[1].type.name
    
    // This is authContext
    const { isLoggedIn } = useSelector(state => state.auth)
    
    if (file === 'Room') {
        return isLoggedIn ? children : <Navigate to='/login' />
    } else if ( file === 'Login' || file === 'SignUp') {
        return !isLoggedIn ? children : <Navigate to='/' />
    }
    
}

export default AuthMiddleware;