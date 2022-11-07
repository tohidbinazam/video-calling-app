import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'
import createError from './createError.js';

 const verifyToken = async (req, res, next) => {

    const { token } = req.body

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY)
        
        // Get token data
        const token_data = await Token.findOne({ token })
        
        if ( token_data ) {
            res.status(200).json(verify.id)
        } else {
            next(createError(404, 'Expire or Invalid URL'))
        }
    } catch (error) {
        await Token.findOneAndRemove({ token })
        next(error)
    }
}


export default verifyToken