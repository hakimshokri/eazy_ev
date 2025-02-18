import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { format, addDays } from 'date-fns';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

    const { searchData, setSearchData } = useContext(AppContext)
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)


    return (
        <div class="relative h-[600px] bg-gray-900 pt-[60px]">
            <div class="absolute inset-0">
                <img src={assets.homepage_bg_img} class="w-full h-full object-cover" alt="Hero Image" />
                <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
            </div>
            <div class="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                <div class="max-w-3xl">
                    <h1 class="text-5xl font-bold text-white mb-6">Drive the Future Today</h1>
                    <p class="text-xl text-white mb-8">Experience luxury electric vehicles with zero emissions. Book your sustainable journey now.</p>
                    <div class="bg-white p-6 rounded-lg shadow-xl">
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
                            {/* <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <div class="relative">
                                    <i class="fas fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input type="text" class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black" placeholder="Select location" />
                                </div>
                            </div> */}
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Pick-up & Return Date</label>
                                <div onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} >
                                    <p className='block w-full pl-2 pr-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm'>{format(searchData.dateRange[0].startDate, 'dd MMM yyyy')} - {format(searchData.dateRange[0].endDate, 'dd MMM yyyy')}</p>
                                </div>
                                {
                                    isDatePickerOpen &&
                                    <DateRange
                                        onChange={(item) => {
                                            setSearchData({ ...searchData, dateRange: [item.selection] })
                                        }}
                                        ranges={searchData.dateRange}
                                        minDate={new Date()}
                                    />
                                }
                            </div>

                        </div>
                        <button onClick={() => { navigate('/cars'); scrollTo({ top: 0, behavior: 'smooth' }) }} class="mt-4 w-full bg-black text-white rounded-md px-6 py-3 text-sm font-medium">Search Available Cars</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header