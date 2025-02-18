import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarsList = () => {

  const { aToken, cars, getAllCars, changeStatus, setTitle } = useContext(AdminContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getAllCars()
    }
  }, [aToken])

  return (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex justify-end items-center mb-4">
        <button class="rounded-md bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 flex items-center gap-2">
          <img src={assets.plus} alt="Plus Icon" class="w-4 h-4" />
          Add New Car
        </button>
      </div>
      <div class="bg-white rounded-lg shadow-lg mb-6">
        <div class="p-4 border-b border-gray-200 flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between">
          <div class="relative flex-1 min-w-[240px]">
            <img src={assets.search} alt="Search Icon" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search cars..." class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div class="flex flex-wrap gap-4">
            <select class="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select class="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Brands</option>
              <option>Tesla</option>
              <option>BMW</option>
              <option>Mercedes</option>
            </select>
            <select class="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Body Styles</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
            </select>
          </div>
        </div>
        <div class="overflow-x-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {cars.slice(0, 12).map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  alt={item.model}
                />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-bold">{item.brand}{item.model}</span>
                    <span className="text-green-600 font-semibold">RM{item.price}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Brand: {item.brand}</p>
                    <p>Top Speed: {item.topSpeed} km/h</p>
                    <p>Range: {item.range} miles range</p>
                    <p>Body Style: {item.bodyStyle}</p>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.status}
                    </span>
                    <div>
                      <button onClick={() => { navigate(`/car-details/${item._id}`); setTitle('Edit Car Details'); scrollTo(0, 0); }} className="text-blue-600 hover:text-blue-800 mr-3">
                        <img src={assets.edit} alt="Edit Icon" className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <img src={assets.deleteBin} alt="Trash Icon" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="px-4 sm:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center">
            <span class="text-sm text-gray-700">Showing {cars.length} entries</span>
          </div>
          {/* <div class="flex items-center space-x-2">
            <button class="rounded-md px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50" disabled="">
              Previous
            </button>
            <button class="rounded-md px-3 py-2 border border-blue-600 bg-blue-600 text-white text-sm font-medium">1</button>
            <button class="rounded-md px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">2</button>
            <button class="rounded-md px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">3</button>
            <button class="rounded-md px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default CarsList