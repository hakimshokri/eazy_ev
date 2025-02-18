import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyBookings = () => {

  const navigate = useNavigate()
  const { backendUrl, token, getCarsData } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } });

      if (data.success) {
        const sortedBookings = data.bookings.reverse();
        const past = [];
        const upcoming = [];

        sortedBookings.forEach((item) => {
          const checkOutDate = new Date(item.checkOutDate);
          const now = new Date();

          if (checkOutDate < now) {
            past.push(item);
          } else {
            upcoming.push(item);
          }
        });

        setBookings(sortedBookings);
        setPastBookings(past);
        setUpcomingBookings(upcoming);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-booking', { bookingId }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getUserBookings();
        getCarsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      getUserBookings();
    }
  }, [token]);

  return (
    <div class="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div class="mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">Rental History</h1>
        <p class="mt-2 text-sm text-gray-600">View and manage your past and upcoming rentals</p>
      </div>
      <div class="mb-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <div class="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab("upcoming")}
              type="button"
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${activeTab === "upcoming"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Upcoming
            </button>

            <button
              onClick={() => setActiveTab("past")}
              type="button"
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${activeTab === "past"
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Past Rentals
            </button>
          </div>
          <div class="mt-4 sm:mt-0 flex items-center space-x-4">
            <div class="relative">
              <input type="text" placeholder="Search bookings..." class="block w-full rounded-full border-gray-300 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-search text-gray-400"></i>
              </div>
            </div>
            <select class="rounded-full border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
              <option>All Status</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Canceled</option>
            </select>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

        {activeTab === 'upcoming' ?

          upcomingBookings.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img src={item.carData.image} alt={item.carData.model} className="w-full h-full object-cover rounded-t-2xl" />
                <div className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  {item.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.carData.brand}{item.carData.model}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                  <img src={assets.date} alt="Calendar Icon" className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{format(new Date(item.pickUpDate), 'dd MMM yyyy')} - {format(new Date(item.returnDate), 'dd MMM yyyy')}</span>
                  </div>
                  {/* <div className="flex items-center text-sm">
                  <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
                  <span className="text-gray-600">{item.location}</span>
                </div> */}
                  {/* <div className="flex items-center text-sm">
                    <i className="fas fa-tag text-gray-400 w-5"></i>
                    <span className="text-gray-600">Booking #{item._id}</span>
                  </div> */}
                </div>
                <div className="mt-6">
                  <button onClick={() => { navigate(`/booking/${item.carData._id}`); scrollTo(0, 0) }} type="button" className="rounded-full w-full bg-blue-500 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-600 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
          :
          pastBookings.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img src={item.carData.image} alt={item.carData.model} className="w-full h-full object-cover rounded-t-2xl" />
                <div className="absolute top-4 right-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                  {item.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.carData.brand}{item.carData.model}</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-sm">
                    <i className="fas fa-calendar-alt text-gray-400 w-5"></i>
                    <span className="text-gray-600">{format(new Date(item.pickUpDate), 'dd MMM yyyy')} - {format(new Date(item.returnDate), 'dd MMM yyyy')}</span>
                  </div>
                  {/* <div className="flex items-center text-sm">
                <i className="fas fa-map-marker-alt text-gray-400 w-5"></i>
                <span className="text-gray-600">{item.location}</span>
              </div> */}
                  {/* <div className="flex items-center text-sm">
                    <i className="fas fa-tag text-gray-400 w-5"></i>
                    <span className="text-gray-600">Booking #{item._id}</span>
                  </div> */}
                </div>
                <div className="mt-6">
                  <button onClick={() => { navigate(`/booking/${item.carData._id}`); scrollTo(0, 0) }} type="button" className="rounded-full w-full bg-blue-500 text-white px-6 py-2.5 text-sm font-medium hover:bg-blue-600 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default MyBookings;
