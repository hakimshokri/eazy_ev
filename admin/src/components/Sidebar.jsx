import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  const { aToken, setAToken, title, setTitle } = useContext(AdminContext)


  const logout = () => {
    navigate('/')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div class="w-64 bg-white shadow-lg fixed h-full transition-all duration-300">
      <div class="p-6">
        <img src={assets.eazyev_logo} alt="EazyEV Logo" class="h-12" />
      </div>
      <nav className="mt-6">
        <NavLink
          to="/admin-dashboard"
          onClick={() => {
            setTitle("Dashboard");
            window.scrollTo(0, 0);
          }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 text-custom bg-blue-50/50 border-r-4 border-gray-400 rounded-l-full font-medium"
              : "flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50/50 hover:rounded-l-full transition-all duration-200"
          }
        >
          <img src={assets.dashboard} alt="Dashboard Icon" className="w-5" />
          <span className="ml-3">Dashboard</span>
        </NavLink>

        <NavLink
          to="/all-bookings"
          onClick={() => {
            setTitle("Bookings");
            window.scrollTo(0, 0);
          }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 text-custom bg-blue-50/50 border-r-4 border-gray-400 rounded-l-full font-medium"
              : "flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50/50 hover:rounded-l-full transition-all duration-200"
          }
        >
          <img src={assets.booking} alt="Booking Icon" className="w-5" />
          <span className="ml-3">Bookings</span>
        </NavLink>

        <NavLink
          to="/add-car"
          onClick={() => {
            setTitle("Add Car");
            window.scrollTo(0, 0);
          }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 text-custom bg-blue-50/50 border-r-4 border-gray-400 rounded-l-full font-medium"
              : "flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50/50 hover:rounded-l-full transition-all duration-200"
          }
        >
          <img src={assets.add_car} alt="Add Car Icon" className="w-5" />
          <span className="ml-3">Add Car</span>
        </NavLink>

        <NavLink
          to="/car-list"
          onClick={() => {
            setTitle("Cars List");
            window.scrollTo(0, 0);
          }}
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-6 py-3 text-custom bg-blue-50/50 border-r-4 border-gray-400 rounded-l-full font-medium"
              : "flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50/50 hover:rounded-l-full transition-all duration-200"
          }
        >
          <img src={assets.car_list} alt="Cars List Icon" className="w-5" />
          <span className="ml-3">Cars List</span>
        </NavLink>
      </nav>

    </div>
  )
}

export default Sidebar