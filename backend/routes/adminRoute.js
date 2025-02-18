import express from 'express'
import { addCar, adminDashboard, allCars, bookingCancel, bookingsAdmin, loginAdmin, updateCarData, uploadImage } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeStatus } from '../controllers/carController.js'

const adminRouter = express.Router()

adminRouter.post('/add-car', authAdmin, upload.single('image'), addCar)
adminRouter.post('/upload-image', upload.single('image'), uploadImage)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-cars', authAdmin, allCars)
adminRouter.post('/change-status', authAdmin, changeStatus)
adminRouter.get('/bookings', authAdmin, bookingsAdmin)
adminRouter.post('/cancel-booking', authAdmin, bookingCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
adminRouter.post('/update-car', authAdmin, upload.single('image'), updateCarData)

export default adminRouter