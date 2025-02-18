import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { format, addDays, differenceInCalendarDays } from 'date-fns'
import axios from 'axios';

const BookingDetails = () => {

    const { carId } = useParams()
    const navigate = useNavigate()

    const { cars, getCarsData, backendUrl, token, searchData, setSearchData, userData } = useContext(AppContext)
    const [carInfo, setCarInfo] = useState(false)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [driverLicense, setDriverLicense] = useState('')
    const [pickUpTime, setPickUpTime] = useState('')
    const [totalAmount, setTotalAmount] = useState(0)
    const [numberOfNights, setNumberOfNights] = useState(0)

    const fetchCarInfo = async () => {
        const carInfo = cars.find((car) => car._id === carId)
        setCarInfo(carInfo)

        setFullName(userData.name)
        setEmail(userData.email)
        setPhone(userData.phone)
    }

    const checkSlotAvailability = async () => {

        try {

            if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
                return toast.error('Please select a valid date range')
            }

            const { data } = await axios.post(backendUrl + '/api/user/check-slot', { carId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate })

            if (!data.success) {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    const bookCar = async () => {

        try {

            checkSlotAvailability()

            const { data } = await axios.post(backendUrl + '/api/user/book-car', { carId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate, fullName, email, phone, driverLicense, pickUpTime, amount: totalAmount }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getCarsData()
                bookingStripe(data.bookingId)
                // navigate('/my-bookings')
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to make payment using stripe
    const bookingStripe = async (bookingId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { bookingId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (cars.length > 0) {
            fetchCarInfo()
        }
    }, [cars, carId])

    useEffect(() => {

        // Calculate the number of nights between startDate and endDate
        const pickUpDate = new Date(searchData.dateRange[0].startDate)
        const returnDate = new Date(searchData.dateRange[0].endDate)

        // Calculate number of nights using date-fns difference function
        const numberOfNights = differenceInCalendarDays(returnDate, pickUpDate);

        setNumberOfNights(numberOfNights)

        // Calculate total amount
        const totalAmount = numberOfNights * carInfo.price + 45 + 30

        setTotalAmount(totalAmount)

    }, [searchData, carInfo])

    return carInfo && (
        <div class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-10 mt-16">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
                <div class="lg:col-span-2">
                    <div class="space-y-8 bg-white p-8 shadow-sm rounded-xl backdrop-blur-sm">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">Personal Information</h2>
                            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input onChange={(e) => setFullName(e.target.value)} value={fullName} type="text" class="mt-1 block w-full pl-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" placeholder="John Doe" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" class="mt-1 block w-full pl-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input onChange={(e) => setPhone(e.target.value)} value={phone} type="tel" class="mt-1 block w-full pl-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Driver&#39;s License Number</label>
                                    <input onChange={(e) => setDriverLicense(e.target.value)} value={driverLicense} type="text" class="mt-1 block w-full pl-2 py-2 border rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" placeholder="DL12345678" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">Rental Details</h2>
                            <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                                {/* <div>
                                    <label class="block text-sm font-medium text-gray-700">Pick-up Location</label>
                                    <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm">
                                        <option>Downtown Station</option>
                                        <option>Airport Terminal 1</option>
                                        <option>Airport Terminal 2</option>
                                        <option>City Center</option>
                                    </select>
                                </div> */}
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Pick-up Date</label>
                                    <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
                                        <p className='mt-1 block w-1/2 pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
                                    </div>
                                    {
                                        isDatePickerOpen &&
                                        <DateRange
                                            onChange={(item) => {
                                                setSearchData({ ...searchData, dateRange: [item.selection] })
                                            }}
                                            ranges={searchData.dateRange}
                                            minDate={new Date()}
                                        />
                                    }
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Pick-up Time</label>
                                    <input onChange={(e) => setPickUpTime(e.target.value)} value={pickUpTime} type="time" class="mt-1 block w-full rounded-md pl-2 py-2 border border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm" />
                                </div>
                            </div>
                            <div class="mt-6">
                                <h3 class="text-sm font-medium text-gray-700">Additional Options</h3>
                                <div class="mt-4 space-y-4">
                                    <div class="flex items-start">
                                        <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                                        <label class="ml-3 text-sm text-gray-600">
                                            Insurance Coverage
                                            <span class="block text-xs text-gray-500">Comprehensive coverage for peace of mind</span>
                                        </label>
                                    </div>
                                    <div class="flex items-start">
                                        <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
                                        <label class="ml-3 text-sm text-gray-600">
                                            Charging Package
                                            <span class="block text-xs text-gray-500">Unlimited charging at our partner stations</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    <div class="sticky top-8 space-y-8">
                        <div class="bg-white p-6 shadow-sm rounded-xl backdrop-blur-sm">
                            <h2 class="text-lg font-semibold text-gray-900">Vehicle Summary</h2>
                            <div class="mt-6">
                                <img src={carInfo.image} alt="Selected Vehicle" class="w-full rounded-xl object-cover shadow-lg hover:scale-[1.02] transition-all duration-300" />
                                <div class="mt-4">
                                    <h3 class="font-medium text-gray-900">{carInfo.brand}{carInfo.model}</h3>
                                    <p class="mt-1 text-sm text-gray-500">Electric {carInfo.bodyStyle}</p>
                                    <div class="mt-4 flex items-center text-sm">
                                        <img src={assets.battery_green} alt="Battery Icon" class="w-5 h-5 text-green-500" />
                                        <span class="ml-2 text-gray-600">{carInfo.range} miles range</span>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-6 border-t border-gray-200 pt-6">
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-600">Daily Rate</span>
                                    <span class="font-medium text-gray-900">RM{carInfo.price}</span>
                                </div>
                                <div class="mt-2 flex justify-between text-sm">
                                    <span class="text-gray-600">Number of Days</span>
                                    <span class="font-medium text-gray-900">{numberOfNights}</span>
                                </div>
                                <div class="mt-2 flex justify-between text-sm">
                                    <span class="text-gray-600">Insurance</span>
                                    <span class="font-medium text-gray-900">RM45.00</span>
                                </div>
                                <div class="mt-2 flex justify-between text-sm">
                                    <span class="text-gray-600">Charging Package</span>
                                    <span class="font-medium text-gray-900">RM30.00</span>
                                </div>
                                <div class="mt-6 flex justify-between border-t border-gray-200 pt-6">
                                    <span class="text-base font-medium text-gray-900">Total</span>
                                    <span class="text-base font-medium text-gray-900">RM{totalAmount}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-4">
                            <button onClick={bookCar} type="button" class="rounded-md w-full bg-black px-4 py-3 text-sm font-medium text-white hover:bg-gray-900 shadow-lg transition-all duration-300 hover:scale-105">
                                Continue to Payment
                            </button>
                            <button onClick={() => navigate(-1)} type="button" class="!rounded-button w-full bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-md transition-all duration-300">
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetails