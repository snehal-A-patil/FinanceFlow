import React from 'react'
import Navbar from '../components/homecomponent/Navbar'
import Hero from '../components/homecomponent/Hero'
import Features from '../components/homecomponent/Features'
import CTA from '../components/homecomponent/CTA'
import Footer from '../components/homecomponent/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Features/>
      <CTA/>
      <Footer/>
    </div>
  )
}

export default Home
