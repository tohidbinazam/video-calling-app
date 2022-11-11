import axios from "axios";
import { LOGGED_IN, LOGGED_OUT } from "./types";

export const isLoggedIn = (token) => async (dispatch) => {
    if (token) {
      
      await axios.get('/api/v1/user/me',{
        headers : {
            authorization : token
        }
      }).then(res => {
        dispatch(loggedIn(res.data))
      })
      .catch(() => {
        dispatch(loggedOut())
      })
      
    }else{
      dispatch(loggedOut())
    }
    
}

export const loggedIn = (payload) => ({
    type: LOGGED_IN,
    payload
})

export const loggedOut = () => ({
    type: LOGGED_OUT
})
