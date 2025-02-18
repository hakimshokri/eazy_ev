import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { format } from 'date-fns';

const AllBookings = () => {

    const { aToken, backendUrl, bookings, getAllBookings, cancelBooking } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllBookings()
        }
    }, [aToken])

    return (
        <main class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="mb-4 flex justify-end items-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                    Total: {bookings.length} booking{bookings.length > 1 && 's'}
                </span>
            </div>
            <div class="bg-white rounded-lg shadow-lg">
                <div class="p-6 border-b border-gray-200">
                    <div class="flex flex-col md:flex-row gap-4">
                        <div class="flex-1">
                            <div class="relative">
                                <input type="text" placeholder="Search bookings..." class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img src={assets.search} alt="Search Icon" class="w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        </div>
                        <div class="flex">

                            <select class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                                <option>All Booking Status</option>
                                <option>Active</option>
                                <option>Completed</option>
                                <option>Canceled</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto w-full">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>

                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User Details
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Car Details
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Rental Period
                                    <i class="fas fa-sort ml-1"></i>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total Price
                                    <i class="fas fa-sort ml-1"></i>
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            {bookings.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{item.userData.name}</div>
                                        <div className="text-sm text-gray-500">{item.userData.email}</div>
                                        <div className="text-sm text-gray-500">{item.userData.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={item.carData.image}
                                                className="w-20 h-15 object-cover rounded"
                                                alt={item.carData.model}
                                            />
                                            <div>
                                                <div className="text-sm text-gray-900">{item.carData.brand}{item.carData.model}</div>
                                                <div className="text-sm text-gray-500">{item.carData.bodyStyle}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900"> {format(item.pickUpDate, 'dd MMM yyyy')}</div>
                                        <div className="text-sm text-gray-500">to {format(item.returnDate, 'dd MMM yyyy')}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        RM{item.amount}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.payment
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                            }`}>
                                            {item.payment ? 'Paid' : 'Unpaid'}
                                        </span>
                                        <span className="mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-red-600 hover:text-red-900 !rounded-button">
                                        <img src={assets.cancel} alt="Close Icon" className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div class="flex-1 flex justify-between items-center">
                        <div>
                            <p class="text-sm text-gray-700">
                                Showing <span class="font-medium">{bookings.length}</span> result{bookings.length > 1 && 's'}
                            </p>
                        </div>
                        {/* <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                            <select class="block w-full md:w-auto pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-lg">
                                <option>10 per page</option>
                                <option>25 per page</option>
                                <option>50 per page</option>
                                <option>100 per page</option>
                            </select>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 !rounded-button">
                                    <i class="fas fa-chevron-left"></i>
                                </button>
                                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button">1</button>
                                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-600 text-sm font-medium text-white rounded">2</button>
                                <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button">3</button>
                                <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 !rounded-button">
                                    <i class="fas fa-chevron-right"></i>
                                </button>
                            </nav>
                        </div> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AllBookings