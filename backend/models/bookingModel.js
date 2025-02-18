import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    carId: {
        type: String,
        required: true,
    },
    pickUpDate: {
        type: String,
        required: true,
    },
    returnDate: {
        type: String,
        required: true,
    },
    userData: {
        type: Object,
        required: true,
    },
    carData: {
        type: Object,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    driverLicense: {
        type: String,
        required: true,
    },
    pickUpTime: {
        type: String,
        default: '10:00 AM',
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    payment: {
        type: Boolean, 
        default: false,
    },
})

const bookingModel = mongoose.models.booking || mongoose.model('booking', bookingSchema)

export default bookingModel