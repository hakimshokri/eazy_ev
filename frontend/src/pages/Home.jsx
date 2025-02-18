import React from 'react'
import Header from '../components/Header'
import FeaturedCars from '../components/FeaturedCars'
import ChooseEV from '../components/ChooseEV'
import DownloadApp from '../components/DownloadApp'

const Home = () => {
  return (
    <div className='pt-16'>
      <Header />
      <FeaturedCars />
      <ChooseEV />
      <DownloadApp />
    </div>
  )
}

export default Home