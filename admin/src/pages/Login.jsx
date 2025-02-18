import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { setAToken, backendUrl } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {
            const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })

            if (data.success) {
                localStorage.setItem('aToken', data.token)
                setAToken(data.token)
                navigate('/admin-dashboard')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <div class="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div class="w-full max-w-md space-y-8">
                <div class="text-center">
                    <img class="mx-auto h-16 w-auto" src={assets.eazyev_logo} alt="Bonda Car" />
                    <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Administrator Portal</h2>
                    <p class="mt-2 text-sm text-gray-600">Sign in to access your admin dashboard</p>
                </div>
                <div class="mt-8 bg-white py-8 px-6 shadow-sm rounded-lg border border-gray-200">
                    <form onSubmit={onSubmitHandler} class="space-y-6" action="#" method="POST">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                            <div class="mt-1 relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="fas fa-envelope text-gray-400"></i>
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" autocomplete="email" required="" class="block w-full pl-2 rounded-md border-gray-300 pr-3 py-2 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="admin@bondacar.com" />
                            </div>
                        </div>
                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                            <div class="mt-1 relative">
                                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <i class="fas fa-lock text-gray-400"></i>
                                </div>
                                <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full pl-2 rounded-md border-gray-300 pr-3 py-2 border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="••••••••" />
                                <button type="button" class="absolute inset-y-0 right-0 flex items-center pr-3" onclick="togglePassword()">
                                    <i class="fas fa-eye text-gray-400 hover:text-gray-500"></i>
                                </button>
                            </div>
                        </div>
                        {/* <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                            </div>
                            <div class="text-sm">
                                <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
                            </div>
                        </div> */}
                        <div>
                            <button type="submit" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">Protected access</span>
                            </div>
                        </div>
                        <p class="mt-2 text-center text-sm text-gray-500">
                            This portal is restricted to authorized administrators only
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login