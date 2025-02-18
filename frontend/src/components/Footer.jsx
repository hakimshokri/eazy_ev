import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div class="bg-gray-900 text-white py-12 mt-16">
            <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <img src={assets.eazyev_logo} alt="EazyEV" class="h-8 mb-4" />
                        <p class="text-gray-400">Making sustainable travel accessible to everyone.</p>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a onClick={() => { navigate('/about'); scrollTo({ top: 0, behavior: 'smooth' }) }} class="text-gray-400 hover:text-white">About Us</a></li>
                            <li><a onClick={() => { navigate('/contact'); scrollTo({ top: 0, behavior: 'smooth' }) }} class="text-gray-400 hover:text-white">Contact</a></li>
                            <li><a onClick={() => { navigate('/cars'); scrollTo({ top: 0, behavior: 'smooth' }) }} class="text-gray-400 hover:text-white">Cars</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Connect</h4>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-400 hover:text-white">
                                <img src={assets.facebook} alt="Facebook" class="w-5 h-5" />
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <img src={assets.instagram} alt="Instagram" class="w-5 h-5" />
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <img src={assets.tiktok} alt="TikTok" class="w-5 h-5" />
                            </a>
                            <a href="#" class="text-gray-400 hover:text-white">
                                <img src={assets.whatsapp} alt="Whatsapp" class="w-5 h-5" />
                            </a>
                        </div>

                    </div>
                    <div>
                        <h4 class="text-lg font-bold mb-4">Newsletter</h4>
                        <form class="space-y-4">
                            <input type="email" class="!rounded-button w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white placeholder-gray-400" placeholder="Enter your email" />
                            <button type="submit" class="rounded-md w-full bg-black text-white py-2 hover:bg-blue-700">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2024 EazyEV. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default Footer