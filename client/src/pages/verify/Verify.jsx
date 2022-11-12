import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const Verify = () => {

  const navigate = useNavigate()
  const [status, setStatus] = useState('')

  const { token } = useParams()

  useEffect(() => {
    
    axios.post('/api/v1/verify-token', { token }).then(res => {
  
      // User verify update
      axios.post('/api/v1/user/verify', { token, user_id: res.data }).then(res => {
        setStatus(res.data)
        localStorage.removeItem('email')
      })
  
    }).catch(error => {
      navigate('/invalid-link/account-verify')
    })

  }, [navigate, token])

  
  return (
    <div>
        <div className='my-5 text-center'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header">
                                <img src="/logo/download.png" alt="" />
                            </div>
                            <div className="card-body">
                                <h6 className='my-3'>{ status }</h6>
                                <p className='my-2'>Now, After login you can access all feature in your account</p>
                                <Link className='btn btn-primary' to='/login'>Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Verify