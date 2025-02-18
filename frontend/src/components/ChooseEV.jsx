import React from 'react'
import { assets } from '../assets/assets'

const ChooseEV = () => {
    return (
        <div>
            <div class="py-16 bg-gray-50">
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose EazyEV</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8" id="how-it-works">
                        <div class="text-center">
                            <div class="inline-block p-4 bg-black bg-opacity-10 rounded-lg mb-4">
                                <img src={assets.eco_friendly} alt="Icon" class="w-12 h-12 text-black" />
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Eco-Friendly</h3>
                            <p class="text-gray-500">Zero emissions and sustainable travel options for environmentally conscious drivers.</p>
                        </div>
                        <div class="text-center">
                            <div class="inline-block p-4 bg-black bg-opacity-10 rounded-lg mb-4">
                                <img src={assets.charging} alt="Icon" class="w-12 h-12 text-black" />
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">Free Charging</h3>
                            <p class="text-gray-500">Access to our network of charging stations included with every rental.</p>
                        </div>
                        <div class="text-center">
                            <div class="inline-block p-4 bg-black bg-opacity-10 rounded-lg mb-4">
                                <img src={assets.customer_service} alt="Icon" class="w-12 h-12 text-black" />
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">24/7 Support</h3>
                            <p class="text-gray-500">Round-the-clock customer service to assist you whenever you need help.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-16 bg-white">
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="relative">
                            <div class="text-center">
                                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-custom text-white text-xl font-bold mb-4">
                                    <img src={assets.number1} alt="Icon" class="w-12 h-12 text-black" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Choose Your Car</h3>
                                <p class="text-gray-500">Browse our selection of premium electric vehicles and select your perfect ride.</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="text-center">
                                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-custom text-white text-xl font-bold mb-4">
                                    <img src={assets.number2} alt="Icon" class="w-12 h-12 text-black" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Book Online</h3>
                                <p class="text-gray-500">Complete your reservation with our easy online booking system.</p>
                            </div>
                        </div>
                        <div class="relative">
                            <div class="text-center">
                                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-custom text-white text-xl font-bold mb-4">
                                    <img src={assets.number3} alt="Icon" class="w-12 h-12 text-black" />
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-2">Pick Up &amp; Go</h3>
                                <p class="text-gray-500">Get your keys and start your sustainable journey with EazyEV.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseEV