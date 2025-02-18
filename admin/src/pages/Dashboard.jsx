import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {

  const { aToken, getDashboardData, dashboardData, cancelBooking } = useContext(AdminContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (aToken) {
      getDashboardData()
    }
  }, [aToken])

  return dashboardData && (
    <div class="p-6">
      <div class="grid grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-600 bg-opacity-10">
              <img src={assets.car} alt="Car Icon" class="w-10 h-10 text-custom" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Cars</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.cars}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-gray-200">
              <img src={assets.booking_2} alt="Icon" class="w-10 h-10 text-custom" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Bookings</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.bookings}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100">
              <img src={assets.users} alt="Icon" class="w-10 h-10 text-custom" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Total Users</h3>
              <p class="text-2xl font-semibold text-gray-900">{dashboardData.users}</p>
            </div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-800 bg-opacity-10">
              <img src={assets.revenue} alt="Icon" class="w-10 h-10 text-custom" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">Revenue</h3>
              <p class="text-2xl font-semibold text-gray-900">RM{dashboardData.revenue}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-medium text-gray-900">Recent Bookings</h2>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input type="text" placeholder="Search bookings..." class="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-custom focus:border-custom transition-all duration-200" />
                <img src={assets.search} alt="Search Icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                {/* <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th> */}
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {dashboardData.latestBookings.map((item, index) => (
                <tr key={index}>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item._id}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.userData.name}</p>
                        <p className="text-sm text-gray-500">{item.userData.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={item.carData.image}
                        className="h-8 w-12 rounded object-cover"
                        alt={item.carData.model}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.carData.brand}</p>
                        <p className="text-sm text-gray-500">{item.carData.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(item.pickUpDate, 'dd MMM yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.payment
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {item.payment ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-600 hover:text-red-700">
                      <img src={assets.cancel} alt="Cancel Icon" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Showing {dashboardData.latestBookings.length} result{dashboardData.latestBookings.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard