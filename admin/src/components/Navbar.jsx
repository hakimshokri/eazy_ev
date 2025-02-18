import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const { aToken, setAToken, title } = useContext(AdminContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
    }

    return (
        <div className="bg-white shadow-sm backdrop-blur-sm bg-white/50 sticky top-0 z-10">
            <div className="flex items-center justify-between px-8 py-4">
                <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center cursor-pointer" onClick={logout}>
                        <img src={assets.logout} alt="Logout Icon" className="w-5 h-5" />
                        <p className="ml-2 text-md font-medium text-gray-900">Logout</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar