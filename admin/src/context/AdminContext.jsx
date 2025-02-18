import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [cars, setCars] = useState([])
    const [bookings, setBookings] = useState([])
    const [dashboardData, setDashboardData] = useState(false)
    const [title, setTitle] = useState('')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllCars = async () => {

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-cars', {}, { headers: { aToken } })
            if (data.success) {
                setCars(data.cars)
                console.log(data.cars)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const changeStatus = async (carId, newStatus) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-status', { carId, newStatus }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllCars()
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const getAllBookings = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/bookings', { headers: { aToken } })

            if (data.success) {
                setBookings(data.bookings)
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const cancelBooking = async (bookingId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-booking', { bookingId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllBookings()
                getDashboardData()
            } else {
                toast.error(data.message)
            }
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const getDashboardData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
            
            
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        cars,
        getAllCars,
        changeStatus,
        bookings,
        setBookings,
        getAllBookings,
        cancelBooking,
        dashboardData,
        getDashboardData,
        title,
        setTitle,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider