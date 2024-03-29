import React from 'react'
import { Link, useParams } from 'react-router-dom';

const EmailSent = () => {

    const { main } = useParams()

  const email = localStorage.getItem('email')

  return (
    <div className='my-5 text-center'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <img src="/logo/download.png" alt="" />
                        </div>
                        <div className="card-body">
                            <h6 className='my-3'>Email Sent</h6>
                            <p className='my-3'>We sent an email to <b>{ email }</b> with a link to get back into your account.</p>
                            <Link className='btn btn-secondary' to={`/${main}`}>Sent Again</Link>
                            <b className='mx-2'>OR</b>
                            <Link className='btn btn-primary' to='/login'>OK</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmailSent