import carModel from "../models/carModel.js"


const changeStatus = async (req, res) => {

    try {

        const { carId, newStatus } = req.body

        const carData = await carModel.findById(carId)

        // Check if the new status is the same as the current status
        if (carData.status === newStatus) {
            return res.json({ success: false, message: "Status is already set to the requested value" })
        }

        // Update the status
        await carModel.findByIdAndUpdate(carId, { status: newStatus })
        res.json({ success: true, message: "Status Changed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get all cars list for Frontend
const carList = async (req, res) => {

    try {

        const cars = await carModel.find({})
        res.json({ success: true, cars })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
export { changeStatus, carList }