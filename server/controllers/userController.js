import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Token from "../models/Token.js";
import createLink from "../utility/createLink.js";
import sentMail from "../utility/mail/sentMail.js";
import createError from "../utility/error/createError.js";

/**
 * @access Public 
 * @route /api/user
 * @method GET
 */

export const getAllusers = async (req, res, next) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}


/**
 * @access Public 
 * @route /api/user/:username
 * @method GET
 */

export const getSingleuser = async (req, res, next) => {

    // Get username
    const username = req.params.username

    try {
        let user = await User.findOne({ username })
        user ? res.status(200).json(user) : next(createError(404, 'user not found'))
    } catch (error) {
        next(error)
    }
}


/**
 * @access Public 
 * @route /api/user/register
 * @method POST
 */

export const userRegister = async (req, res, next) => {

    try {

        const { email, username } = req.body
        
        const check = await User.find().or([{ email }, { username }])

        if (check.length) {
            // fs.unlinkSync(`server/public/images/products/photos/${main_photo}`)
            return next(createError(406, 'Already exist this Store'))
        }

        // Password hashing
        const password = await bcryptjs.hash(req.body.password, 12)

        // Create new user
        const user =  await User.create({ ...req.body, password })
 
        const verify_link = await createLink(user._id, 'Verify-Account', '30d')
    
        // Sent mail by Gmail
        sentMail(user.email, 'Verify Account', `Please verify Your account by click this <a href=${verify_link}>LINK</a>`)
    
        res.status(200).json(user)
            
    } catch (error) {
        next(error)
    }
}

/**
 * @access Public
 * @route /api/user/login
 * @method POST
 */

export const userLogin = async (req, res, next) => {

    const { email, password } = req.body

    try {
        const user =  await User.findOne({ email })

        if (user) {
            const login = await bcryptjs.compare(password, user.password)
            if (login) {
                const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin, username: user.username}, process.env.SECRET_KEY, { expiresIn : '120d' })
                res.cookie('access_token', token).status(200).json({ token, user }) 
            } else {
                next(createError(401, 'Wrong password'))
            }
        } else {
            res.status(404).json('User not found')
        }
    } catch (error) {
        next(error)
    }
}


/**
 * @access Private 
 * @route  /api/user/logout
 * @method DELETE
 */

export const userLogout = (req, res, next) => {
    res.clearCookie('access_token').status(200).json('Remove cookie')
}


/**
 * @access Private 
 * @route  /api/user/me
 * @method GET
 */
export const loggedInUser = async (req, res, next) => {

    const token = req.headers.authorization

    try {
        // Token verify
        const token_info = jwt.verify(token, process.env.SECRET_KEY)

        // Get logged in user
        const user = await User.findById(token_info.id)
        res.status(200).json(user)
    
    } catch (error) {
        next(error)
    }
}

/**
 * @access public
 * @route /api/user/verify
 * @method POST
 */
export const verifyAccount = async (req, res, next) => {

    // Get token with object
    const { token, user_id } = req.body

    try {
        await Token.findOneAndRemove({ token })

        // User verified status data update
        await User.findByIdAndUpdate(user_id, {
            isVerified : true
        }, { new : true })
        
        res.status(200).json('Your account verify successfully')
        
    } catch (error) {
        next(error)
    }

}


/**
 * @access public
 * @route /api/user/resent-verify
 * @method POST
 */
export const resentVerify = async (req, res, next) => {

    const { email } = req.body

    try {
        const user = await User.findOne({ email })

        if (user && !user.isVerified) {
            const verify_link = await createLink(user._id, 'verify-account', '30d')

            // Sent mail by Gmail
            sentMail(user.email, 'Verify Account', `Please verify Your account by click this <a href=${verify_link}>LINK</a>`)

            // Sent mail by SendGrid
            // sentMail(user.email, 'Verify Account', `Please verify Your account by click this <a href=${verify_link}>LINK</a>`)

            res.status(200).json(user)
        } else {
            next(createError(404, 'Invalid or Already verified user'))
        }
        
    } catch (error) {
        next(error)
    }
}


/**
 * @access public
 * @route /api/user/forgot-password
 * @method POST
 */
export const forgotPassword = async (req, res, next) => {
    
    const { email } = req.body
    try {
        const user = await User.findOne({ email })
    
        if (user) {
            const reset_pass_link = await createLink(user._id, 'reset-password')

            // Sent mail by Gmail
            sentMail(user.email, 'Reset Password', `Reset Your Password by click this <a href=${reset_pass_link}>LINK</a>`)

            // Sent mail by SendGrid
            // sentMail(user.email, 'Reset Password', `Reset Your Password by click this <a href=${reset_pass_link}>LINK</a>`)
            res.status(200).json('Link sent successfully ')
        }else{
            return next(createError(404, 'User not found'))
    
        }
    } catch (error) {
        next(error)
    }
    
}


/**
 * @access public
 * @route /api/user/reset-password
 * @method PATCH
 */
export const resetPassword = async (req, res, next) => {

    const { token, user_id, pass } = req.body
    
    try {
        await Token.findOneAndRemove({ token })

        const password = await bcryptjs.hash(pass, 12)
        await User.findByIdAndUpdate(user_id, { password }, { new: true })
        
        res.status(200).json('Successfully update your password')
    } catch (error) {
        next(error)
    }
}

