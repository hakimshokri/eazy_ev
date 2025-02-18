import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const FeaturedCars = () => {

    const navigate = useNavigate()
    const { cars } = useContext(AppContext)

    return (
        <div>
            <section class="py-16 bg-gray-50">
                <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Electric Vehicles</h2>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div class="contents" data-glide-el="track">
                            <ul class="contents">
                                {cars.slice(0, 6).map((car, index) => (
                                    <li key={index} className="glide__slide">
                                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                            <img
                                                src={car.image}
                                                className="w-full h-48 object-cover"
                                                alt={car.name}
                                            />
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900">{car.brand}{car.model}</h3>
                                                <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    <i className="fas fa-bolt mr-2"></i>
                                                    <span>{car.range} miles range</span>
                                                </div>
                                                {/* <div className="mt-2 flex items-center text-sm text-gray-500">
                                                    <i className="fas fa-gauge-high mr-2"></i>
                                                    <span>{car.acceleration}</span>
                                                </div> */}
                                                <div className="mt-4 flex items-center justify-between">
                                                    <span className="text-2xl font-bold text-black">RM{car.price}/day</span>
                                                    <button onClick={() => { navigate(`/booking/${car._id}`); scrollTo({ top: 0, behavior: 'smooth' }) }} className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium">
                                                        Book Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}

export default FeaturedCars