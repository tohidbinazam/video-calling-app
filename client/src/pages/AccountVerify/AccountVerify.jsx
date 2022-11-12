import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { VscAccount } from "react-icons/vsc";
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const AccountVerify = () => {

    const [ email, setEmail ] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const email = localStorage.getItem('email')
        setEmail(email)
    }, [])
    
    const handleSubmit = async (e) => {

        e.preventDefault()
        await axios.post('api/v1/user/resent-verify', { email }).then(res => {
            localStorage.setItem('email', email)
            swal('Success', 'Verification link sent in your account', 'success')
            navigate('/account-verify/email-sent')
        }).catch((error) => {
            swal('Wrong', error.response.data.message, 'warning')
        })
    }

    
  return (
    <div className='text-center my-5'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card my-5">
                        <div className="card-body px-5">
                            <VscAccount />
                            <h5 className='my-2'>Verify your account?</h5>
                            <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
                            <form onSubmit={ handleSubmit }>
                                <div className="my-3">
                                    <input value={ email } onChange={ e => setEmail(e.target.value) } className='form-control' type="email" name="" id="" placeholder='Email, Phone or Username'/>
                                </div>
                                <button className='w-100 btn fw-bold text-white' type="submit">Send Verification Link</button>
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

export default AccountVerify