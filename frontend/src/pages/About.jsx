import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';


const About = () => {

  const navigate = useNavigate();
  return (
    <div class="pt-16">
      <section class="relative h-[600px] bg-gray-900">
        <img src={assets.about_bg_1} class="absolute inset-0 w-full h-full object-cover object-center opacity-60" alt="EazyEV Hero" />
        <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"></div>
        <div class="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div class="max-w-2xl">
            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Driving Sustainability Forward
            </h1>
            <p class="mt-6 text-xl text-gray-300">
              Experience the future of mobility with EazyEV. We&#39;re making electric vehicle rental simple, sustainable, and accessible for everyone.
            </p>
            <div class="mt-10 flex gap-x-6">
              <button onClick={() => { navigate('/cars'); scrollTo({ top: 0, behavior: 'smooth' }) }} class="rounded-lg bg-black text-white px-8 py-3 text-base font-medium hover:bg-gray-800">
                Rent Now
              </button>
              <button class="rounded-lg bg-white text-gray-900 px-8 py-3 text-base font-medium hover:bg-gray-100">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="py-24 bg-white">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Revolutionizing Urban Mobility
              </h2>
              <p class="mt-6 text-lg text-gray-600">
                Founded in 2020, EazyEV was born from a simple idea: make electric vehicles accessible to everyone. We believe that sustainable transportation shouldn&#39;t be a luxury, but a convenient choice for all.
              </p>
              <p class="mt-4 text-lg text-gray-600">
                Today, we&#39;re proud to operate the largest fleet of electric vehicles in the region, serving thousands of environmentally conscious customers daily.
              </p>
            </div>
            <div class="relative h-[400px]">
              <img src={assets.about_bg_2} class="absolute inset-0 w-full h-full object-contain" alt="EazyEV Vision" />
            </div>
          </div>
        </div>
      </section>
      <section class="py-24 bg-gray-50">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission &amp; Vision</h2>
            <p class="mt-4 text-lg text-gray-600">Driving change through sustainable mobility solutions</p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={assets.eco_friendly} alt="Sustainability Icon" className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Sustainability First</h3>
              <p className="mt-4 text-gray-600">
                Committed to reducing carbon emissions through our 100% electric fleet and eco-friendly operations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={assets.clock} alt="Convenience Icon" className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Convenience Redefined</h3>
              <p className="mt-4 text-gray-600">
                Book, unlock, and drive in minutes with our seamless digital platform and 24/7 support.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={assets.road} alt="Mobility Icon" className="w-6 h-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">Future of Mobility</h3>
              <p className="mt-4 text-gray-600">
                Leading the transition to sustainable transportation through innovation and accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-24 bg-white">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
            <p class="mt-4 text-lg text-gray-600">Four simple steps to start your sustainable journey</p>
          </div>
          <div class="mt-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div class="relative">
                <div class="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-xl font-semibold">1</div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900">Sign Up</h3>
                <p class="mt-2 text-gray-600">Create your account in minutes with just your email and driver&#39;s license</p>
              </div>
              <div class="relative">
                <div class="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-xl font-semibold">2</div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900">Choose Vehicle</h3>
                <p class="mt-2 text-gray-600">Browse our fleet of premium electric vehicles and select your perfect ride</p>
              </div>
              <div class="relative">
                <div class="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-xl font-semibold">3</div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900">Book &amp; Pay</h3>
                <p class="mt-2 text-gray-600">Secure your booking with our transparent pricing and flexible payment options</p>
              </div>
              <div class="relative">
                <div class="flex items-center justify-center w-16 h-16 bg-black text-white rounded-full text-xl font-semibold">4</div>
                <h3 class="mt-6 text-lg font-semibold text-gray-900">Drive Green</h3>
                <p class="mt-2 text-gray-600">Unlock your vehicle with our app and enjoy your sustainable journey</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-24 bg-gray-50">
        <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Impact</h2>
            <p class="mt-4 text-lg text-gray-600">Making a difference with every ride</p>
          </div>
          <div class="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div class="bg-white rounded-lg shadow-sm p-8 text-center">
              <div class="text-4xl font-bold text-black">150K+</div>
              <p class="mt-2 text-gray-600">Tons of CO2 Saved</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-8 text-center">
              <div class="text-4xl font-bold text-black">500K+</div>
              <p class="mt-2 text-gray-600">Trips Completed</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-8 text-center">
              <div class="text-4xl font-bold text-black">100K+</div>
              <p class="mt-2 text-gray-600">Happy Customers</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-8 text-center">
              <div class="text-4xl font-bold text-black">1000+</div>
              <p class="mt-2 text-gray-600">Available Vehicles</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
