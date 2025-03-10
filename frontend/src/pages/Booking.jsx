import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { toast } from 'react-toastify';
import { format, addDays, set } from 'date-fns';
import axios from 'axios';
import { assets } from '../assets/assets';

const Booking = () => {

  const { carId } = useParams()
  const navigate = useNavigate()

  const { cars, getCarsData, backendUrl, token, searchData, setSearchData, userData } = useContext(AppContext)
  const [carInfo, setCarInfo] = useState(false)
  // const [carAvailable, setCarAvailable] = useState(false)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [randomCars, setRandomCars] = useState([])


  const fetchCarInfo = async () => {
    const carInfo = cars.find((car) => car._id === carId)
    setCarInfo(carInfo)
  }

  const checkSlotAvailability = async () => {

    try {

      if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
        return toast.error('Please select a valid date range')
      }

      const { data } = await axios.post(backendUrl + '/api/user/check-slot', { carId, startDate: searchData.dateRange[0].startDate, endDate: searchData.dateRange[0].endDate })

      if (data.success) {
        toast.success(data.message)

        if (!token) {
          return toast.warning('Please login to book a car')
        }

        if (!userData.isAccountVerified) {
          return toast.warning('Please verify your account to book a car')
        }

        navigate(`/booking-details/${carId}`)
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  const getRandomCarsBySegment = () => {
    const carsSubset = cars.slice(0, 12);
  
    // Filter cars by segment and exclude the currently displayed cars
    const filteredCars = carsSubset.filter(car =>
      car.segment === carInfo.segment && car._id !== carId
    );
  
    // Shuffle the filtered list
    const shuffled = filteredCars.sort(() => Math.random() - 0.5);
  
    setRandomCars(shuffled.slice(0, 3));
  };

  useEffect(() => {
    if (cars.length > 0) {
      fetchCarInfo()
    }
  }, [cars, carId])

  useEffect(() => {
    if (carInfo) {
      getRandomCarsBySegment();
    }
  }, [carInfo]);


  // return carInfo ? (
  return carInfo && (
    <main class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="relative">
          <div class="overflow-hidden" data-glide-el="track">
            <ul class="flex transition-transform duration-300">
              <li class="w-full flex-shrink-0">
                <img src={carInfo.image}
                  alt={carInfo.model} class="rounded-2xl w-full h-[500px] object-cover shadow-xl" />
              </li>
            </ul>
          </div>
          <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2"
            data-glide-el="controls[nav]">
            <button class="w-2 h-2 rounded-full bg-white/50 hover:bg-white" data-glide-dir="=0"></button>
            <button class="w-2 h-2 rounded-full bg-white/50 hover:bg-white" data-glide-dir="=1"></button>
          </div>
        </div>
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl font-bold text-zinc-900 tracking-tight">{carInfo.brand}{carInfo.model}</h1>
            <p class="mt-2 text-xl text-black">RM{carInfo.price}/day</p>
          </div>
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-zinc-100">
            <h2 class="text-lg font-semibold mb-4">Book Your Rental</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Pick-up & Return</label>
                  <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
                    <p className='block w-full pl-2 pr-3 py-3 mt-1 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
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
              </div>
              {/* <div>
                <label class="block text-sm font-medium text-gray-700">Pick-up Location</label>
                <select
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-custom focus:ring-custom">
                  <option>Downtown Station</option>
                  <option>Airport Terminal</option>
                  <option>City Center</option>
                </select>
              </div> */}
              <button onClick={checkSlotAvailability}
                class="rounded-lg w-full bg-black text-white py-4 font-medium transition-all hover:bg-gray-800">Book
                Now</button>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-lg p-8 border border-zinc-100">
            <h2 class="text-lg font-semibold mb-4">Vehicle Specifications</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center space-x-3">
              <img src={assets.battery} alt="Battery Icon" class="w-6 h-6 text-black" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Range</p>
                  <p class="text-sm text-gray-500">{carInfo.range} miles</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
              <img src={assets.topspeed} alt="Top Speed Icon" class="w-6 h-6 text-black" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Top Speed</p>
                  <p class="text-sm text-gray-500">{carInfo.topSpeed} km/h</p>
                </div>
              </div>
              <div class="flex items-center space-x-3">
              <img src={assets.seats} alt="Seats Icon" class="w-6 h-6 text-black" />
                <div>
                  <p class="text-sm font-medium text-gray-900">Seating</p>
                  <p class="text-sm text-gray-500">{carInfo.seats} adults</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Similar Vehicles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {randomCars.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-zinc-100 transition-transform hover:scale-105"
            >
              <img
                src={item.image}
                alt={item.model}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.brand}{item.model}</h3>
                <p className="text-black mt-1 mb-2">RM{item.price}/day</p>
                <button onClick={() => { navigate(`/booking/${item._id}`); scrollTo({ top: 0, behavior: 'smooth' }) }} className="rounded-lg w-full bg-black text-white py-3 font-medium transition-all hover:bg-gray-800">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Booking