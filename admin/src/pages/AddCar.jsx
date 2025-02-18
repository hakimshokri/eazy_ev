import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCar = () => {

  const { aToken, backendUrl } = useContext(AdminContext)

  const navigate = useNavigate()

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [topSpeed, setTopSpeed] = useState('')
  const [range, setRange] = useState('')
  const [bodyStyle, setBodyStyle] = useState('Sedan')
  const [segment, setSegment] = useState('A')
  const [seats, setSeats] = useState('')
  const [price, setPrice] = useState('')
  const [status, setStatus] = useState('Available')
  const [image, setImage] = useState(false)

  const addCar = async (event) => {
    event.preventDefault()

    try {

      if (!image) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('brand', brand)
      formData.append('model', model)
      formData.append('topSpeed', topSpeed)
      formData.append('range', range)
      formData.append('bodyStyle', bodyStyle)
      formData.append('segment', segment)
      formData.append('seats', seats)
      formData.append('price', price)
      formData.append('status', status)
      formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/admin/add-car', formData, { headers: { 'Content-Type': 'multipart/form-data', aToken } },)

      if (data.success) {
        toast.success(data.message)
        navigate('/car-list')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Brand</label>
            <input onChange={(e) => setBrand(e.target.value)} value={brand} type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Model</label>
            <input onChange={(e) => setModel(e.target.value)} value={model} type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Top Speed</label>
            <div class="mt-1 flex rounded-button shadow-sm">
              <input onChange={(e) => setTopSpeed(e.target.value)} value={topSpeed} type="text"
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
              <input onChange={(e) => setRange(e.target.value)} value={range} type="text"
                class="block w-full rounded-l-md border-gray-300 border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
              <select class="rounded-r-button border-l-0 border-gray-300 bg-gray-50 px-3 text-sm">
                <option>km</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Body Style</label>
            <select onChange={(e) => setBodyStyle(e.target.value)} value={bodyStyle}
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
            <select onChange={(e) => setSegment(e.target.value)} value={segment}
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
            <input onChange={(e) => setSeats(e.target.value)} value={seats} type="number"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Price</label>
            <div class="mt-1 flex rounded-button shadow-sm">
              <select class="rounded-l-button border-r-0 border-gray-300 border pl-2 pr-3 py-2 bg-gray-50 px-3 text-sm">
                <option>MYR</option>
              </select>
              <input onChange={(e) => setPrice(e.target.value)} value={price} type="number"
                class="block w-full rounded-r-md border-gray-300 border pl-2 pr-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select onChange={(e) => setStatus(e.target.value)} value={status}
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
                <img src={image ? URL.createObjectURL(image) : ''}
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
        <button onClick={addCar}
          type="button"
          class="px-4 py-2 border border-transparent shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Save
          Changes
        </button>
      </div>
    </div>
  )
}

export default AddCar