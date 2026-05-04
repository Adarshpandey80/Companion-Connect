import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import FeaturedCompanions from '../components/FeaturedCompanions'
import Reviews from '../components/Reviews'
import Safety from '../components/Safety'
import CTA from '../components/CTA'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedCompanions />
      <Reviews />
      <Safety />
      <CTA />
    </div>
  )
}
