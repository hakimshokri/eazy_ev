import React from 'react'
import { assets } from '../assets/assets'

const DownloadApp = () => {
    return (
        <div>
            <section class="py-16 bg-gray-50">
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-center mb-12">Download Our App</h2>
                    <div class="flex flex-col md:flex-row items-center justify-between">
                        <div class="md:w-1/2 mb-8 md:mb-0">
                            <h3 class="text-2xl font-bold mb-4">Rent Electric Cars on the Go</h3>
                            <p class="text-gray-600 mb-6">Download our mobile app to access exclusive deals, manage your bookings, and unlock cars directly from your phone.</p>
                            <div class="flex space-x-4">
                                <button class="!rounded-button bg-black text-white px-6 py-3 flex items-center">
                                    <i class="fab fa-apple text-2xl mr-2"></i>
                                    <span>App Store</span>
                                </button>
                                <button class="!rounded-button bg-black text-white px-6 py-3 flex items-center">
                                    <i class="fab fa-google-play text-2xl mr-2"></i>
                                    <span>Play Store</span>
                                </button>
                            </div>
                        </div>
                        <div class="md:w-1/2">
                            <img src={assets.eazyev_app} class="w-full max-w-md mx-auto" alt="App Screenshot" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DownloadApp