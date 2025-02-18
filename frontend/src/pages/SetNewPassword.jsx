import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const SetNewPassword = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { backendUrl, userData, loadUserProfileData, token, setToken, forgotPasswordEmail, setForgotPasswordEmail } = useContext(AppContext)

    const navigate = useNavigate()

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            console.log(forgotPasswordEmail)

            const { data } = await axios.post(backendUrl + '/api/user/reset-password', { email: forgotPasswordEmail, newPassword, confirmPassword })

            if (data.success) {
                toast.success(data.message)
                navigate('/login')
                setForgotPasswordEmail('')
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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <div class="w-full max-w-md px-8 py-12 bg-white rounded-lg shadow mt-16">
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <img src={assets.lock_blue} alt="Lock Icon" class="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 class="text-2xl font-semibold text-gray-900">Set New Password</h1>
                </div>
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 class="text-sm font-medium text-blue-800 mb-2">Password Requirements</h3>
                    <ul class="text-sm text-blue-700 space-y-1">
                        <li class="flex items-center gap-2">
                            - Minimum 8 characters
                        </li>
                        <li class="flex items-center gap-2">
                            - Include letters, numbers, and special characters
                        </li>
                        <li class="flex items-center gap-2">
                            - Case sensitive
                        </li>
                    </ul>
                </div>
                <form onSubmit={onSubmitHandler} class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="new-password">
                            New Password
                        </label>
                        <div class="relative">
                            <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type={isPasswordVisible ? "text" : "password"} id="new-password" name="new-password" class="block w-full border border-gray-300 rounded-md shadow-sm pl-2 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required="" />
                            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500">
                                <img src={isPasswordVisible ? assets.not_hidden : assets.hidden} alt="Toggle Password Visibility" class="w-5 h-5" />
                            </button>
                        </div>

                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2" for="confirm-password">
                            Confirm Password
                        </label>
                        <div class="relative">
                            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type={isPasswordVisible ? "text" : "password"} id="confirm-password" name="confirm-password" class="block w-full border border-gray-300 rounded-md shadow-sm pl-2 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required="" />
                            <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500">
                                <img src={isPasswordVisible ? assets.not_hidden : assets.hidden} alt="Toggle Password Visibility" class="w-5 h-5" />
                            </button>
                        </div>
                        <p class="mt-2 text-sm text-gray-500 hidden" id="password-match">
                            <i class="fas fa-check-circle text-green-500 mr-1"></i>
                            Passwords match
                        </p>
                    </div>
                    <button type="submit" class="w-full rounded-md bg-blue-600 text-white py-2.5 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled="">
                        Set Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SetNewPassword