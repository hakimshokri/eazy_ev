import { v2 as cloudinary } from 'cloudinary'
import jwt from 'jsonwebtoken'
import bookingModel from '../models/bookingModel.js'
import { format, addDays } from 'date-fns'
import userModel from '../models/userModel.js'
import carModel from '../models/carModel.js'
import imagekit from '../config/imagekit.js';

// API for uploading image to imagekit
const uploadImage = async (req, res) => {

    try {

        const imageFile = req.file

        const base64Image = imageFile.buffer.toString('base64');

        // upload image to imagekit
        const imageUpload = await imagekit.upload({
            file: base64Image, // required
            fileName: imageFile.originalname, // required
        });
        const imageUrl = imageUpload.url

        res.json({ success: true, imageUrl })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API for adding car
const addCar = async (req, res) => {

    try {

        const { brand, model, topSpeed, range, bodyStyle, segment, seats, price, status } = req.body
        const imageFile = req.file

        // checking for all data to add car
        if (!brand || !model || !topSpeed || !range || !bodyStyle || !segment || !seats || !price || !status) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        // image validation
        if (!imageFile) {
            return res.json({ success: false, message: "Please upload an image" })
        }

        // upload image to imagekit

        const base64Image = imageFile.buffer.toString('base64');

        const imageUpload = await imagekit.upload({
            file: base64Image, // required
            fileName: imageFile.originalname, // required
        });

        const imageUrl = imageUpload.url

        const carData = {
            brand,
            model,
            topSpeed,
            range,
            bodyStyle,
            segment,
            seats,
            price,
            status,
            image: imageUrl
        }

        const newCar = new carModel(carData)
        await newCar.save()

        res.json({ success: true, message: "Car added successfully" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API for admin login
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.json({ success: true, token })

        }
        else {
            return res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all cars list for admin panel
const allCars = async (req, res) => {

    try {

        const cars = await carModel.find({})
        res.json({ success: true, cars })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all bookings list for admin panel
const bookingsAdmin = async (req, res) => {

    try {

        const bookings = await bookingModel.find({})
        res.json({ success: true, bookings })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to cancel booking for admin panel
const bookingCancel = async (req, res) => {

    try {

        const { bookingId } = req.body

        const bookingData = await bookingModel.findById(bookingId)

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

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {

    try {

        const cars = await carModel.find({})
        const bookings = await bookingModel.find({})
        const users = await userModel.find({})

        // calculate revenue
        let revenue = 0
        for (let i = 0; i < bookings.length; i++) {
            revenue += bookings[i].amount
        }

        const dashboardData = {
            cars: cars.length,
            bookings: bookings.length,
            users: users.length,
            latestBookings: bookings.reverse().slice(0, 5),
            revenue: revenue
        }

        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to update car details
const updateCarData = async (req, res) => {

    try {

        const { carId, brand, model, topSpeed, range, bodyStyle, segment, seats, price, status } = req.body
        const imageFile = req.file

        // checking for all data to add car
        if (!brand || !model || !topSpeed || !range || !bodyStyle || !segment || !seats || !price || !status) {
            return res.json({ success: false, message: "Please fill all the fields" })
        }

        await carModel.findByIdAndUpdate(carId, { brand, model, topSpeed, range, bodyStyle, segment, seats, price, status })

        if (imageFile) {

            // upload image to imagekit
            const base64Image = imageFile.buffer.toString('base64');

            const imageUpload = await imagekit.upload({
                file: base64Image, // required
                fileName: imageFile.originalname, // required
            });
            const imageUrl = imageUpload.url

            await carModel.findByIdAndUpdate(carId, { image: imageUrl })
        }

        // upload image to imagekit


        res.json({ success: true, message: "Car Updated" })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addCar, loginAdmin, allCars, bookingsAdmin, bookingCancel, adminDashboard, uploadImage, updateCarData }