import jwt from 'jsonwebtoken'


// Create JWT Token
export const createJWT = (data, expiresIn = '600s') => {
    return  jwt.sign(data, process.env.SECRET_KEY, { expiresIn })
}