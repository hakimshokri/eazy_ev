import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

      if (state === 'Sign Up') {

        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password, confirmPassword })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }
      else {

        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [token])

  return (
    <div class="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 mt-[70px] pt-[20px]">
      <div class="w-full max-w-md">
        {
          state === 'Login'
            ? <div class="text-center mb-10">
              <img class="mx-auto h-12 w-auto" src={assets.eazyev_logo} alt="" />
              <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Welcome Back to EazyEV</h2>
              <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
            </div>
            : <div class="text-center mb-10">
              <img class="mx-auto h-12 w-auto" src={assets.eazyev_logo} alt="" />
              <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">Create your account</h2>
              <p class="mt-2 text-sm text-gray-600">Join us and get started today</p>
            </div>
        }
        {state === 'Login'
          ? <div class="bg-white py-8 px-6 shadow rounded-lg">
            <form class="space-y-6" onSubmit={onSubmitHandler}>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src={assets.email_2} alt="Email Icon" class="w-5 h-5 text-gray-400" />
                  </div>
                  <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" required="" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your email" />
                </div>
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1 relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src={assets.lock} alt="Lock Icon" class="w-5 h-5 text-gray-400" />
                  </div>
                  <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type={isPasswordVisible ? "text" : "password"} required="" class="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Enter your password" />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" id="togglePassword" class="text-gray-400 hover:text-gray-500">
                      <img src={isPasswordVisible ? assets.not_hidden : assets.hidden} alt="Toggle Password Visibility" class="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a onClick={() => navigate('/forgot-password')} class="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">Forgot password?</a>
              </div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">Login</button>
            </form>
          </div>
          :
          <div class="bg-white py-8 px-6 shadow rounded-lg">
            <form class="space-y-6" onSubmit={onSubmitHandler}>
              <div>
                <label for="fullname" class="block text-sm font-medium text-gray-700">Full name</label>
                <div class="mt-1">
                  <input onChange={(e) => setName(e.target.value)} value={name} id="fullname" name="fullname" type="text" required="" class="block w-full px-4 py-2.5 border border-gray-300 rounded-button text-gray-900 placeholder-gray-500 focus:border-custom focus:ring-custom sm:text-sm" placeholder="Enter your full name" />
                </div>
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                <div class="mt-1">
                  <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" name="email" type="email" autocomplete="email" required="" class="block w-full px-4 py-2.5 border border-gray-300 rounded-button text-gray-900 placeholder-gray-500 focus:border-custom focus:ring-custom sm:text-sm" placeholder="Enter your email" />
                </div>
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                <div class="mt-1 relative">
                  <input onChange={(e) => setPassword(e.target.value)} value={password} id="password" name="password" type={isPasswordVisible ? "text" : "password"} required="" class="block w-full px-4 py-2.5 border border-gray-300 rounded-button text-gray-900 placeholder-gray-500 focus:border-custom focus:ring-custom sm:text-sm" placeholder="••••••••" />
                  <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500">
                    <img src={isPasswordVisible ? assets.not_hidden : assets.hidden} alt="Toggle Password Visibility" class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div>
                <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm password</label>
                <div class="mt-1 relative">
                  <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id="confirm-password" name="confirm-password" type={isPasswordVisible ? "text" : "password"} required="" class="block w-full px-4 py-2.5 border border-gray-300 rounded-button text-gray-900 placeholder-gray-500 focus:border-custom focus:ring-custom sm:text-sm" placeholder="••••••••" />
                  <button onClick={() => setIsPasswordVisible(!isPasswordVisible)} type="button" class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-500">
                    <img src={isPasswordVisible ? assets.not_hidden : assets.hidden} alt="Toggle Password Visibility" class="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div class="space-y-4">
                <p class="text-sm font-medium text-gray-700">Password requirements:</p>
                <ul class="space-y-2">
                  <li class="flex items-center text-sm text-gray-500">
                    {/* <i class="far fa-check-circle text-green-500 mr-2"></i> */}
                    - Minimum 8 characters
                  </li>
                  <li class="flex items-center text-sm text-gray-500">
                    {/* <i class="far fa-check-circle text-green-500 mr-2"></i> */}
                    - At least one uppercase letter
                  </li>
                  <li class="flex items-center text-sm text-gray-500">
                    {/* <i class="far fa-check-circle text-green-500 mr-2"></i> */}
                    - At least one number
                  </li>
                  <li class="flex items-center text-sm text-gray-500">
                    {/* <i class="far fa-check-circle text-green-500 mr-2"></i> */}
                    - At least one special character
                  </li>
                </ul>
              </div>
              <div class="flex items-start">
                <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-custom border-gray-300 rounded focus:ring-custom" />
                <label for="terms" class="ml-2 block text-sm text-gray-600">
                  I agree to the <a href="#" class="text-blue-600 hover:text-blue-700">Terms of Service</a> and <a href="#" class="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                </label>
              </div>
              <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-md">Create Account</button>
            </form>
          </div>
        }



        {
          state === 'Login'
            ? <p class="mt-8 text-center text-sm text-gray-600">
              New to EazyEV?
              <a onClick={() => setState('Sign Up')} class="font-medium text-blue-600 hover:text-blue-700"> Create an account</a>
            </p>
            : <p class="mt-8 text-center text-sm text-gray-600">
              Already have an account?
              <a onClick={() => {setState('Login'); scrollTo(0, 0)}} class="font-medium text-blue-600 hover:text-blue-700"> Login</a>
            </p>
        }

      </div >
    </div >
  )
}

export default Login