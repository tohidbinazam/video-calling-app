import React from 'react'
import { Link, useParams } from 'react-router-dom';

const InvalidLink = () => {

    const { main } = useParams()
    
  return (
    <div className='my-5 text-center'>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" />
                        </div>
                        <div className="card-body">
                            <h6 className='my-3'>Invalid OR Expire Link</h6>
                            <p className='my-2'>You can try again and get this link back into your account.</p>
                            <Link className='btn btn-secondary' to='/login'>Login</Link>
                             <b className='mx-2'>OR</b>
                            <Link className='btn btn-primary' to={`/${main}`}>Try Again</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InvalidLink