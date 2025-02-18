import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MyBookings from './pages/MyBookings'
import Booking from './pages/Booking'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'
import Cars from './pages/Cars'
import BookingDetails from './pages/BookingDetails'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import VerifyResetPassword from './pages/VerifyResetPassword'
import SetNewPassword from './pages/SetNewPassword'
import MyProfile from './pages/MyProfile'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ToastContainer />
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<Cars />} />
          <Route path='/login' element={<Login />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/verify-reset-password' element={<VerifyResetPassword />} />
          <Route path='/set-new-password' element={<SetNewPassword />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-bookings' element={<MyBookings />} />
          <Route path='/booking/:carId' element={<Booking />} />
          <Route path='/booking-details/:carId' element={<BookingDetails />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App