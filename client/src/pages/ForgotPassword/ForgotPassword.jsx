import React from 'react'
import './ForgotPassword.scss'
import { Link, useNavigate } from 'react-router-dom'
import { FiLock } from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {

    const [ email, setEmail] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            axios.post('api/v1/user/forgot-password', { email }).then(res => {
                toast.success(res.data)
                navigate(`/email-sent/forgot-password/${ email }`)
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } else {
            toast.error('All fields are required')
        }

    }

  return (
    <div className='forgot-password text-center my-5'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card my-5">
                        <div className="card-body px-5">
                            <FiLock />
                            <h5 className='my-2'>Trouble Logging In?</h5>
                            <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                            <form onSubmit={ handleSubmit }>
                                <div className="my-3">
                                    <input onChange={ e => setEmail(e.target.value) } className='form-control' type="text" placeholder='Email, Phone or Username'/>
                                </div>
                                <button className='w-100 btn fw-bold text-white' type="submit">Send Login Link</button>
                            </form>
                            <div className="divider">OR</div>
                            <Link className='font-wight' to="/signup">Create New Account</Link>
                        </div>
                        <div className="card-footer">
                            <Link className='font-wight' to="/login">Back To Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword