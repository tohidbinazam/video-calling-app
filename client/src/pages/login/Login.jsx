import axios from 'axios';
import React, { useState } from 'react'
import { AiFillFacebook } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Cookie from 'js-cookie'
import { toast } from 'react-toastify';
import './Login.scss'
import swal from 'sweetalert'
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../redux/auth/action';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Input state
    const [input, setInput] = useState({})

    // Handle input state
    const handleAuth = (e) => {

        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Top bar loader
        // loaderDispatch('START')
        try {
            if (input.email && input.password) {
                await axios.post('api/v1/user/login', input).then(res => {

                    if (res.data.user.isVerified) {
                        swal('Good job', 'Successfully login you account', 'success')
                        Cookie.set('token', res.data.token)
                        dispatch(loggedIn(res.data.user))
                    }else{
                        toast.error('Please verify your account')
                        navigate('/account-verify')
                    }
                })

            }else{
                toast.info('All field are required')
            }
        } catch (error) {
            toast.error('Wrong email or password')
        }
    }

  return (
        <div className='auth-section'>
            <div className='auth'>
                <div className="auth-container">
                    <div className="auth-login-warper">
                        <div className='auth-login'>
                            <a href="https://"><img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" /></a>
                            <form onSubmit={ handleSubmit }>
                                <input type="text" name="email" onChange={ handleAuth } placeholder='Email' />
                                <input type="password" name="password" onChange={ handleAuth } placeholder='Password' />
                                <button type="submit"> Log In </button>
                            </form>
                            <div className="divider">OR</div>
                            <a className='login-with-fb' href="http://"><AiFillFacebook /> Log in with Facebook </a>
                            <Link className='forgot-pass' to="/forgot-password"> Forgot password? </Link>
                        </div>
                        <div className="sing-up-box">
                            Don't have an account? <Link className='text-color' to="/signup"> Sign up </Link>
                        </div>
                        <div className="get-app">
                            Get the app.
                            <div className="app-logo">
                                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
                                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Login