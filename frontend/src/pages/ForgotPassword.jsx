import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const { cars, getCarsData, backendUrl, token, searchData, setSearchData, userData, setUserData, setForgotPasswordEmail} = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const { data } = await axios.post(backendUrl + '/api/user/send-reset-otp', { email })

            if (data.success) {
                toast.success(data.message)
                navigate('/verify-reset-password')
                setForgotPasswordEmail(email)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    return (
        <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 mt-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-md">
                <a class="flex justify-center mb-8">
                    <img class="h-16 w-auto" src={assets.car_logo} alt="Logo" />
                </a>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Reset your password</h2>
                <p class="mt-4 text-center text-sm text-gray-600">
                    Enter your email address and we'll send you a verification code.
                </p>
            </div>
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={onSubmitHandler} class="space-y-6">
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                            <div class="mt-1 relative rounded-md shadow-sm">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <img src={assets.email_2} alt="Email Icon" class="w-5 h-5 text-gray-400" />
                                </div>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" autocomplete="email" required class="block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md border pl-10 pr-3 py-2" placeholder="Enter your email" />
                            </div>
                        </div>
                        <div>
                            <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">
                                <i class="fas fa-paper-plane mr-2"></i>
                                Send Reset Link
                            </button>
                        </div>
                    </form>
                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>
                        <div class="mt-6 flex flex-col space-y-4">
                            <a onClick={() => navigate('/login')} class="flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                <i class="fas fa-arrow-left mr-2"></i>
                                Return to Login
                            </a>
                            {/* <a href="/help" class="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600">
                                <i class="fas fa-question-circle mr-2"></i>
                                Need Help?
                            </a> */}
                        </div>
                    </div>
                </div>
                <div class="mt-8 bg-blue-50 rounded-lg p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <i class="fas fa-info-circle text-blue-400"></i>
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-blue-800">Security Notice</h3>
                            <div class="mt-2 text-sm text-blue-700">
                                <p>For your security, the password reset link will expire in 24 hours. You should receive the email within 5-10 minutes. Please also check your spam folder.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword