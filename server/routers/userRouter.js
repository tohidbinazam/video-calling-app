import express from "express";
import { getAllUsers, getSingleUser, userLogin, userRegister, loggedInUser, verifyAccount, resentVerify, forgotPassword, resetPassword, userLogout, allUpdatedUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// Router init
const router = express.Router()

// user auth routers
router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/logout', userLogout)
router.get('/me', loggedInUser)
router.post('/verify', verifyAccount)
router.post('/resent-verify', resentVerify)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password', resetPassword)
router.post('/updated-users', allUpdatedUser)

// Router REST API
router.route('/').get(getAllUsers)
router.route('/:username').get(authMiddleware, getSingleUser)


// Export router
export default router;