import mongoose from "mongoose"

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    topSpeed: {
        type: String,
        required: true
    },
    range: {
        type: String,
        required: true
    },
    bodyStyle: {
        type: String,
        required: true
    },
    segment: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Available"
    },
    image: {
        type: String,
        required: true
    },
    slots_booked: {
        type: Array,
        default: []
    }
}, { minimize: false })

const carModel = mongoose.models.car || mongoose.model('car', carSchema)

export default carModel