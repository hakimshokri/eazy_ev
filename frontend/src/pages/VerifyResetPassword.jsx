import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const VerifyResetPassword = () => {

    const { backendUrl, userData, loadUserProfileData, token, setToken, forgotPasswordEmail } = useContext(AppContext)

    const navigate = useNavigate()

    const inputsRef = useRef([]);

    const handleChange = (e, index) => {
        const { value } = e.target;

        // Move to the next input if a character is entered
        if (value.length === 1 && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && index > 0 && e.target.value === "") {
            inputsRef.current[index - 1].focus();
        }
    }

    const handlePaste = (e) => {

        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputsRef.current[index]) {
                inputsRef.current[index].value = char
            }
        })
    }

    const onSubmitHandler = async (e) => {

        try {
            e.preventDefault()
            const otpArray = inputsRef.current.map((e) => e.value)
            const otp = otpArray.join('')

            const { data } = await axios.post(backendUrl + '/api/user/verify-reset-otp', { otp, email: forgotPasswordEmail })

            if (data.success) {
                toast.success(data.message)
                navigate('/set-new-password')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }

    }

    return (
        <div class="min-h-screen flex flex-col items-center justify-center px-4">
            <form onSubmit={onSubmitHandler} class="max-w-md w-full bg-white rounded-lg shadow-sm p-8 space-y-6">
                <div class="text-center">
                    <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                        <img src={assets.shield} alt="Shield Icon" class="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 class="text-2xl font-semibold text-gray-900">Verify OTP Code</h1>
                    <p class="mt-2 text-sm text-gray-600">Enter the 6-digit code sent to your email</p>
                    <p class="text-sm font-medium text-gray-800">{forgotPasswordEmail}</p>
                </div>
                <div class="space-y-6">
                    <div class="flex justify-center gap-3" onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                required5
                                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                ref={(e) => (inputsRef.current[index] = e)}
                                onInput={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-600">Time remaining: <span id="timer" class="font-semibold text-blue-600">05:00</span></p>
                    </div>
                    <div class="space-y-3">
                        <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Verify Code
                        </button>
                        <button id="resendBtn" class="w-full bg-gray-50 text-gray-700 py-3 rounded-md font-medium border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                            Resend Code (60s)
                        </button>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-600">
                            Didn&#39;t receive the code?
                            <a href="#" class="text-blue-600 hover:text-blue-700 font-medium"> Contact Support</a>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default VerifyResetPassword