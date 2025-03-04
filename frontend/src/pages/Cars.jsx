import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format, addDays } from 'date-fns'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';

const Cars = () => {
  const navigate = useNavigate()
  const { cars, searchData, setSearchData } = useContext(AppContext)

  const [filterCar, setFilterCar] = useState([])
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const applyFilter = () => {
    if (format(searchData.dateRange[0].endDate, 'dd-MM-yyyy') === format(searchData.dateRange[0].startDate, 'dd-MM-yyyy')) {
      return toast.error('Please select a valid date range')
    }

    setIsDatePickerOpen(false)

    let dates = []
    let currentDate = new Date(searchData.dateRange[0].startDate)

    while (currentDate < new Date(searchData.dateRange[0].endDate)) {
      dates.push(format(currentDate, 'dd-MM-yyyy'))
      currentDate = addDays(currentDate, 1)
    }

    const availableCars = cars.filter((car) => {
      const CarDates = car.slots_booked || []
      return !dates.some((date) => CarDates.includes(date))
    })

    setFilterCar(availableCars)
  }

  useEffect(() => {
    applyFilter()
  }, [])

  return (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div class="bg-white shadow-sm rounded-lg p-6 mb-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Pick-up Date</label>
            <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
              <p className='block w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
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
          {/* <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <select class="w-full border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500">
              <option>New York City</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Miami</option>
            </select>
          </div> */}
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Vehicle Type</label>
            <select class="w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md">
              <option>All Types</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Liftback</option>
              <option>SUV</option>
              <option>Pickup</option>
              <option>MPV</option>
              <option>Cabrio</option>
              <option>SPV</option>
              <option>Station</option>
            </select>
          </div>
          <div class="flex items-start justify-start pt-6">
            <button onClick={applyFilter} class="h-10 bg-indigo-600 text-white rounded-md px-8 py-2 text-sm font-medium hover:bg-blue-700">Filter</button>
          </div>
        </div>
      </div>
      <div class="flex gap-8">
        <aside class="w-64 flex-shrink-0">
          <div class="bg-white shadow-sm rounded-lg p-6 space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>

              <div class="space-y-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Price Range</h4>
                  <div class="flex items-center space-x-4">
                    <input type="number" class="block w-full rounded-lg border-gray-300 shadow-sm" placeholder="Min" />
                    <span class="text-gray-500">-</span>
                    <input type="number" class="block w-full rounded-lg border-gray-300 shadow-sm" placeholder="Max" />
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Brand</h4>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">Tesla</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">BMW</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">Audi</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">Mercedes</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900 mb-2">Range (miles)</h4>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">200+ miles</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">300+ miles</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" class="rounded-lg border-gray-300 text-indigo-600" />
                      <span class="ml-2 text-sm text-gray-700">400+ miles</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div class="flex-1">
          <div class="bg-white shadow-sm rounded-lg p-6">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center space-x-4">
                <select class="border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Range: High to Low</option>
                </select>
                <span class="text-sm text-gray-500">{filterCar.length} cars found</span>
              </div>
              <div class="flex items-center space-x-2">
                <button class="p-2 text-gray-500 hover:text-gray-600">
                  <i class="fas fa-th-large"></i>
                </button>
                <button class="p-2 text-gray-500 hover:text-gray-600">
                  <i class="fas fa-list"></i>
                </button>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterCar.slice(0, 12).map((car, index) => (
                <div key={index} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={car.image}
                    className="w-full h-48 object-cover"
                    alt={car.name}
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{car.brand}{car.model}</h3>
                        {/* <p className="text-sm text-gray-500">{car.model}</p> */}
                      </div>
                      <span className="text-lg font-medium text-indigo-600">RM{car.price}/day</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <img src={assets.battery} alt="Battery Icon" className="w-4 h-4 mr-1" />
                        {car.range} miles range
                      </span>
                      <span className="flex items-center">
                        <img src={assets.seats} alt="Seats Icon" className="w-4 h-4 mr-1" />
                        {car.seats} seats
                      </span>
                    </div>
                    <button onClick={() => { navigate(`/booking/${car._id}`); scrollTo({ top: 0, behavior: 'smooth' }) }} className="w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700">Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cars
