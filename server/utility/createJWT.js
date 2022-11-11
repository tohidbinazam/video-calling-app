import jwt from 'jsonwebtoken'


// Create JWT Token
const createJWT = (data, expiresIn = '600s') => {
    return  jwt.sign(data, process.env.SECRET_KEY, { expiresIn })
}

export default createJWT