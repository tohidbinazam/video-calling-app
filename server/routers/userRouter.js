import express from "express";
import { getAllusers, getSingleuser, userLogin, userRegister, loggedInUser, verifyAccount, resentVerify, forgotPassword, resetPassword, userLogout } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Router init
const router = express.Router()

// user auth routers
router.post('/register', userRegister)
router.post('/login', userLogin)
router.delete('/logout', userLogout)
router.get('/me', loggedInUser)
router.post('/verify', verifyAccount)
router.post('/resent-verify', resentVerify)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password', resetPassword)

// Router REST API
router.route('/').get(authMiddleware, getAllusers)
router.route('/:username').get(authMiddleware, getSingleuser)


// Export router
export default router;