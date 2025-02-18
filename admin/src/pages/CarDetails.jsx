import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const CarDetails = () => {

    const { carId } = useParams()
    const navigate = useNavigate()
    const { aToken, backendUrl, cars, getAllCars } = useContext(AdminContext)
    const [carInfo, setCarInfo] = useState(false)
    const [image, setImage] = useState(false);


    const fetchCarInfo = async () => {
        const carInfo = cars.find((car) => car._id === carId)
        setCarInfo(carInfo)
    }

    const updateCar = async () => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/update-car', {
                carId,
                brand: carInfo.brand,
                model: carInfo.model,
                topSpeed: carInfo.topSpeed,
                range: carInfo.range,
                bodyStyle: carInfo.bodyStyle,
                segment: carInfo.segment,
                seats: carInfo.seats,
                price: carInfo.price,
                status: carInfo.status,
                image
            } ,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    aToken
                }
            });

            if (data.success) {
                toast.success(data.message)
                await getAllCars()
                navigate('/car-list')
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (cars.length > 0) {
            fetchCarInfo()
        }
    }, [cars, carId])

    return carInfo && (
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Brand</label>
                        <input onChange={(e) => setCarInfo({ ...carInfo, brand: e.target.value })} value={carInfo.brand} type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Model</label>
                        <input onChange={(e) => setCarInfo({ ...carInfo, model: e.target.value })} value={carInfo.model} type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Top Speed</label>
                        <div class="mt-1 flex rounded-button shadow-sm">
                            <input onChange={(e) => setCarInfo({ ...carInfo, topSpeed: e.target.value })} value={carInfo.topSpeed} type="text"
                                class="block w-full rounded-l-md border-gray-300 border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <select class="rounded-r-button border-l-0 border-gray-300 bg-gray-50 px-3 text-sm">
                                <option>km/h</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Range</label>
                        <div class="mt-1 flex rounded-button shadow-sm">
                            <input onChange={(e) => setCarInfo({ ...carInfo, range: e.target.value })} value={carInfo.range} type="text"
                                class="block w-full rounded-l-md border-gray-300 border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                            <select class="rounded-r-button border-l-0 border-gray-300 bg-gray-50 px-3 text-sm">
                                <option>km</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Body Style</label>
                        <select onChange={(e) => setCarInfo({ ...carInfo, bodyStyle: e.target.value })} value={carInfo.bodyStyle}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500">
                            <option>Sedan</option>
                            <option>Hatchback</option>
                            <option>Liftback</option>
                            <option>SUV</option>
                            <option>Pickup</option>
                            <option>MPV</option>
                            <option>Cabrio</option>
                            <option>SPV</option>
                            <option>Station</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Segment</label>
                        <select onChange={(e) => setCarInfo({ ...carInfo, segment: e.target.value })} value={carInfo.segment}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500">
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                            <option>N</option>
                            <option>S</option>
                        </select>
                    </div>
                </div>
                <div class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Seats</label>
                        <input onChange={(e) => setCarInfo({ ...carInfo, seats: e.target.value })} value={carInfo.seats} type="number"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Price</label>
                        <div class="mt-1 flex rounded-button shadow-sm">
                            <select class="rounded-l-button border-r-0 border-gray-300 border pl-2 pr-3 py-2 bg-gray-50 px-3 text-sm">
                                <option>MYR</option>
                            </select>
                            <input onChange={(e) => setCarInfo({ ...carInfo, price: e.target.value })} value={carInfo.price} type="text"
                                class="block w-full rounded-r-md border-gray-300 border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Status</label>
                        <select onChange={(e) => setCarInfo({ ...carInfo, status: e.target.value })} value={carInfo.status}
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500">
                            <option>Available</option>
                            <option>Unavailable</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Car Image</label>
                        <div
                            class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div class="space-y-1 text-center flex flex-col items-center">
                                <img src={image ? URL.createObjectURL(image) : carInfo.image}
                                    class="mx-auto h-64 w-auto object-cover rounded-button" />
                                <div class="flex text-sm text-gray-600">
                                    <label for="file-upload"
                                        class="relative cursor-pointer bg-white rounded-button font-medium text-custom hover:text-custom focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-custom">
                                        <span>Upload a file</span>
                                        <input onChange={(e) => setImage(e.target.files[0])} id="file-upload" name="file-upload" type="file" class="sr-only" />
                                    </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 flex justify-end space-x-4">
                <button onClick={() => navigate(-1)} type="button"
                    class="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md">Cancel</button>
                <button onClick={updateCar}
                    type="button"
                    class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Save
                    Changes
                </button>
            </div>
        </div>
    )
}

export default CarDetails