import express from 'express'
import { loginUser, registerUser, getProfile, updateProfile, checkSlotAvailability, listBooking, cancelBooking, paymentStripe, verifyStripe, bookCar, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, verifyResetOtp, resetPassword } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', logout)
userRouter.post('/send-verify-otp', authUser, sendVerifyOtp)
userRouter.post('/verify-account', authUser, verifyEmail)
userRouter.get('/is-auth', authUser, isAuthenticated)
userRouter.post('/send-reset-otp', sendResetOtp)
userRouter.post('/verify-reset-otp', verifyResetOtp)
userRouter.post('/reset-password', resetPassword)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/check-slot', checkSlotAvailability)
userRouter.post('/book-car', authUser, bookCar)
userRouter.get('/bookings', authUser, listBooking)
userRouter.post('/cancel-booking', authUser, cancelBooking)
userRouter.post("/payment-stripe", authUser, paymentStripe)
userRouter.post("/verifyStripe", authUser, verifyStripe)


export default userRouter