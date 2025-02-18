import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import bookingModel from '../models/bookingModel.js'
import { format, addDays, differenceInCalendarDays } from 'date-fns'
import stripe from "stripe";
import carModel from '../models/carModel.js'
import transporter from '../config/nodemailer.js'


const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

// API to register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password, confirmPassword } = req.body

        if (!name || !email || !password || !confirmPassword) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        // email validation
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // password validation
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters" })
        }

        if (password !== confirmPassword) {
            return res.json({ success: false, message: "Passwords do not match" })
        }

        // check if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" })
        }

        // hashing user password
        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })

        // sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to EazyEV",
            html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; text-align: center;">
                        <h1 style="color: #333;">Welcome to EazyEV</h1>
                        <p style="color: #666;">Hello ${name},</p>
                        <p style="color: #666;">Thank you for registering with EazyEV. Your account has been successfully created.</p>
                        <p style="color: #666;">Best regards,<br>EazyEV</p>
                    </div>`,
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to user login
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
            res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 })

            res.json({ success: true, token })
        }
        else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to send verify OTP for user 
const sendVerifyOtp = async (req, res) => {

    try {

        const { userId } = req.body

        const user = await userModel.findById(userId)

        if (user.isAccountVerified) {
            return res.json({ success: false, message: "Account already verified" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.verifyOtp = otp
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify Your Account",
            html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; text-align: center;">
                        <h1 style="color: #333;">Verify Your Account</h1>
                        <p style="color: #666;">Hello ${user.name},</p>
                        <p style="color: #666;">Your verification code is: ${otp}</p>
                        <p style="color: #666;">Best regards,<br>EazyEV</p>
                    </div>`,
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Verification OTP sent successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to verify email for user 
const verifyEmail = async (req, res) => {

    try {

        const { userId, otp } = req.body

        if (!otp) {
            return res.json({ success: false, message: "Missing Details" })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        if (user.verifyOtp === "" || user.verifyOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" })
        }

        user.isAccountVerified = true
        user.verifyOtp = ""
        user.verifyOtpExpireAt = 0

        await user.save()

        res.json({ success: true, message: "Email verified successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to authenticate user
const isAuthenticated = async (req, res) => {

    try {

        return res.json({ success: true })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to send reset password OTP
const sendResetOtp = async (req, res) => {

    try {

        const { email } = req.body

        if (!email) {
            return res.json({ success: false, message: "Email is required" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000))
        user.resetOtp = otp
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000
        await user.save()

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Reset Your Password",
            html: `<div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; text-align: center;">
                        <h1 style="color: #333;">Reset Your Password</h1>
                        <p style="color: #666;">Hello ${user.name},</p>
                        <p style="color: #666;">Your reset code is: ${otp}</p>
                        <p style="color: #666;">Best regards,<br>EazyEV</p>
                    </div>`,
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Reset OTP sent successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to verify otp for reset password
const verifyResetOtp = async (req, res) => {

    try {

        const { email, otp } = req.body

        if (!otp) {
            return res.json({ success: false, message: "OTP are required" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" })
        }

        if (user.resetOtpExpireAt < Date.now()) {
            return res.json({ success: false, message: "OTP Expired" })
        }

        res.json({ success: true, message: "OTP verified successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to reset user password
const resetPassword = async (req, res) => {

    try {

        const { email, newPassword, confirmPassword } = req.body

        if (!newPassword || !confirmPassword) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        if (newPassword !== confirmPassword) {
            return res.json({ success: false, message: "Passwords do not match" })
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        user.password = hashedPassword
        user.resetOtp = ""
        user.resetOtpExpireAt = 0

        await user.save()

        res.json({ success: true, message: "Password reset successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to user logout
const logout = async (req, res) => {

    try {

        res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict' })
        res.json({ success: true, message: "Logged Out" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get user profile data
const getProfile = async (req, res) => {

    try {

        const { userId } = req.body

        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to update user profile
const updateProfile = async (req, res) => {

    try {

        const { userId, name, phone } = req.body
        const imageFile = req.file

        if (!name || !phone) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        await userModel.findByIdAndUpdate(userId, { name, phone })

        // if (imageFile) {
        //     // upload image to cloudinary
        //     const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        //     const imageUrl = imageUpload.secure_url

        //     await userModel.findByIdAndUpdate(userId, { image: imageUrl })
        // }

        res.json({ success: true, message: "Profile Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to check car slot availability
const checkSlotAvailability = async (req, res) => {

    try {

        const { carId, startDate, endDate } = req.body

        const carData = await carModel.findById(carId)

        if (!carData.status === "Available") {
            return res.json({ success: false, message: "Car not available" })
        }

        let slots_booked = carData.slots_booked

        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate < new Date(endDate)) {
            dates.push(format(currentDate, 'dd-MM-yyyy')); // Store as "YYYY-MM-DD"
            currentDate = addDays(currentDate, 1);
        }

        // Check if any of the requested dates are already booked
        const isBooked = dates.some(date => slots_booked.includes(date));

        // check if slot is available    
        if (isBooked) {
            return res.json({ success: false, message: "Slot not available" })
        } else {
            return res.json({ success: true, message: "Slot available" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book car
const bookCar = async (req, res) => {

    try {

        const { userId, carId, startDate, endDate, fullName, email, phone, driverLicense, pickUpTime, amount } = req.body

        if (!fullName || !email || !phone || !driverLicense || !pickUpTime) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        const carData = await carModel.findById(carId)

        if (carData.status !== "Available") {
            return res.json({ success: false, message: "Car not available" })
        }

        let slots_booked = carData.slots_booked

        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate < new Date(endDate)) {
            dates.push(format(currentDate, 'dd-MM-yyyy')); // Store as "YYYY-MM-DD"
            currentDate = addDays(currentDate, 1);
        }

        slots_booked.push(...dates)

        const userData = await userModel.findById(userId).select('-password')

        delete carData.slots_booked

        const pickUpDate = new Date(startDate)
        const returnDate = new Date(endDate)

        const bookingData = {
            userId,
            carId,
            pickUpDate: pickUpDate,
            returnDate: returnDate,
            userData,
            carData,
            fullName,
            email,
            phone,
            driverLicense,
            pickUpTime,
            amount,
            date: Date.now()
        }

        const newBooking = new bookingModel(bookingData)
        await newBooking.save()

        // save new slots data in carData

        await carModel.findByIdAndUpdate(carId, { slots_booked })

        res.json({ success: true, bookingId: newBooking._id })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// API to get user bookings for frontend
const listBooking = async (req, res) => {

    try {

        const { userId } = req.body

        const bookings = await bookingModel.find({ userId })

        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel booking
const cancelBooking = async (req, res) => {

    try {

        const { userId, bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

        // verify booking user
        if (bookingData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        }

        // cancel booking
        await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })

        // update car slots
        const { carId, startDate, endDate } = bookingData

        const carData = await carModel.findById(carId)

        let slots_booked = carData.slots_booked

        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate < new Date(endDate)) {
            dates.push(format(currentDate, 'dd-MM-yyyy')); // Store as "YYYY-MM-DD"
            currentDate = addDays(currentDate, 1);
        }

        // remove dates from slots_booked
        slots_booked = slots_booked.filter(date => !dates.includes(date))

        await carModel.findByIdAndUpdate(carId, { slots_booked })

        res.json({ success: true, message: "Booking Cancelled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to make payment of appointment using Stripe
const paymentStripe = async (req, res) => {
    try {

        const { bookingId } = req.body
        const { origin } = req.headers

        const bookingData = await bookingModel.findById(bookingId)

        if (!bookingData || bookingData.cancelled) {
            return res.json({ success: false, message: 'Booking Cancelled or not found' })
        }

        const currency = process.env.CURRENCY.toLocaleLowerCase()

        const line_items = [{
            price_data: {
                currency,
                product_data: {
                    name: "Booking EV Car",
                },
                unit_amount: bookingData.amount * 100
            },
            quantity: 1
        }]

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&bookingId=${bookingData._id}`,
            cancel_url: `${origin}/verify?success=false&bookingId=${bookingData._id}`,
            line_items: line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const verifyStripe = async (req, res) => {
    try {

        const { bookingId, success } = req.body

        if (success === "true") {
            await bookingModel.findByIdAndUpdate(bookingId, { payment: true })
            return res.json({ success: true, message: 'Payment Successful' })
        } else {
            return res.json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { registerUser, loginUser, getProfile, updateProfile, checkSlotAvailability, bookCar, listBooking, cancelBooking, paymentStripe, verifyStripe, logout, sendResetOtp, resetPassword, verifyResetOtp, verifyEmail, sendVerifyOtp, isAuthenticated }