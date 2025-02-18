import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {

    const navigate = useNavigate()

    const { token, setToken, userData, backendUrl } = useContext(AppContext)

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sendVerificationOtp = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/send-verify-otp', { email: userData.email }, { headers: { token } })

            if (data.success) {
                navigate('/verify-email')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }


    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
        navigate('/')
    }


    return (
        <div class='fixed top-0 left-0 right-0 z-50 bg-white shadow-sm'>
            <nav class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    {/* Left Section: Logo & Navigation Links */}
                    <div className="flex items-center">
                        <a onClick={() => { navigate('/'); scrollTo({ top: 0, behavior: 'smooth' }) }} className="flex-shrink-0">
                            <img className="h-8 w-auto" src={assets.eazyev_logo} alt="EazyEV" />
                        </a>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <NavLink to="/" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? "text-black border-black border-b-2 px-1 pt-1 text-sm font-medium" : "text-gray-500 hover:text-black px-1 pt-1 text-sm font-medium"}>
                                Home
                            </NavLink>
                            <NavLink to="/cars" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? "text-black border-black border-b-2 px-1 pt-1 text-sm font-medium" : "text-gray-500 hover:text-black px-1 pt-1 text-sm font-medium"}>
                                Cars
                            </NavLink>
                            <NavLink to="/about" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? "text-black border-black border-b-2 px-1 pt-1 text-sm font-medium" : "text-gray-500 hover:text-black px-1 pt-1 text-sm font-medium"}>
                                About
                            </NavLink>
                            <NavLink to="/contact" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} className={({ isActive }) => isActive ? "text-black border-black border-b-2 px-1 pt-1 text-sm font-medium" : "text-gray-500 hover:text-black px-1 pt-1 text-sm font-medium"}>
                                Contact
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Section: Profile or Book Now Button */}
                    <div className="hidden sm:flex ml-auto items-center space-x-6">
                        {
                            token && userData
                                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                                    <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white'>
                                        {userData.name[0].toUpperCase()}
                                    </div>
                                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                        <div className='min-w-48 bg-white border-gray-200 border rounded flex flex-col gap-4 p-4'>
                                            {!userData.isAccountVerified && <p onClick={sendVerificationOtp} className='hover:text-black cursor-pointer'>Verify Email</p>}
                                            <p onClick={() => { navigate('/my-profile'); scrollTo(0, 0) }} className='hover:text-black cursor-pointer'>My Profile</p>
                                            <p onClick={() => { navigate('/my-bookings'); scrollTo(0, 0) }} className='hover:text-black cursor-pointer'>My Bookings</p>
                                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                        </div>
                                    </div>
                                </div>
                                :
                                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="rounded-lg bg-black text-white px-6 py-2.5 font-medium">
                                    Book Now
                                </button>
                        }
                    </div>


                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-black"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <img src={assets.menu} alt="Menu Icon" className="w-8 h-8" />
                    </button>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 md:hidden">
                            <div className="flex flex-col py-4 px-6 space-y-4 text-right">
                                <NavLink
                                    to="/"
                                    onClick={() => { scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                                    className={({ isActive }) => isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"}>
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/cars"
                                    onClick={() => { scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                                    className={({ isActive }) => isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"}>
                                    Our Cars
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    onClick={() => { scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                                    className={({ isActive }) => isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"}>
                                    About
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    onClick={() => { scrollTo(0, 0); setIsMobileMenuOpen(false); }}
                                    className={({ isActive }) => isActive ? "text-black font-medium" : "text-gray-600 hover:text-black"}>
                                    Contact
                                </NavLink>

                                {token && userData ? (
                                    <div className='ml-auto flex items-center gap-2 cursor-pointer relative'>
                                        <div
                                            className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white'
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        >
                                            {userData.name[0].toUpperCase()}
                                        </div>
                                        {isDropdownOpen && (
                                            <div className='absolute top-full right-0 mt-2 text-base font-medium text-gray-600 z-20 bg-white border-gray-200 border rounded flex flex-col gap-4 p-4 min-w-48 shadow-lg'>
                                                {!userData.isAccountVerified &&
                                                    <p onClick={sendVerificationOtp} className='hover:text-black cursor-pointer'>Verify Email</p>}
                                                <p onClick={() => { navigate('/my-profile'); scrollTo(0, 0); setIsMobileMenuOpen(false); setIsDropdownOpen(false); }} className='hover:text-black cursor-pointer'>My Profile</p>
                                                <p onClick={() => { navigate('/my-bookings'); scrollTo(0, 0); setIsMobileMenuOpen(false); setIsDropdownOpen(false); }} className='hover:text-black cursor-pointer'>My Bookings</p>
                                                <p onClick={() => { logout(); setIsMobileMenuOpen(false); setIsDropdownOpen(false); }} className='hover:text-black cursor-pointer'>Logout</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button onClick={() => { navigate('/login'); scrollTo(0, 0); setIsMobileMenuOpen(false) }} className="rounded-lg bg-black text-white px-6 py-2.5 font-medium">
                                        Book Now
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Navbar