import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16">
      <div class="max-w-2xl mx-auto space-y-8">

        <div class="space-y-8">
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Business Information</h2>
            <div class="space-y-4">
              <div class="flex items-center">
                <img src={assets.email_2} alt="Email Icon" class="w-6" />
                <span class="ml-3 text-gray-600">contact@eazyev.com</span>
              </div>
              <div class="flex items-center">
                <img src={assets.phone_call} alt="Phone Icon" class="w-6" />
                <span class="ml-3 text-gray-600">+60 3-1234 5678</span>
              </div>
              <div class="flex items-center">
                <img src={assets.location_black} alt="Location Icon" class="w-6" />
                <span class="ml-3 text-gray-600">No. 123, Jalan Tun Dr Ismail, 50450 Kuala Lumpur, Malaysia</span>
              </div>
              <div class="flex items-center">
                <img src={assets.clock} alt="Clock Icon" class="w-6" />
                <span class="ml-3 text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Follow Us</h2>
            <div class="flex space-x-4">
              <a class="hover:opacity-80 transition-opacity">
                <img src={assets.facebook} alt="Facebook" class="w-8 h-8" />
              </a>
              <a class="hover:opacity-80 transition-opacity">
                <img src={assets.instagram} alt="Instagram" class="w-8 h-8" />
              </a>
              <a class="hover:opacity-80 transition-opacity">
                <img src={assets.tiktok} alt="TikTok" class="w-8 h-8" />
              </a>
              <a class="hover:opacity-80 transition-opacity">
                <img src={assets.whatsapp} alt="Whatsapp" class="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
