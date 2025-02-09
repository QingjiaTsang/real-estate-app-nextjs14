'use client'

import FeatureSection from './_components/FeatureSection'
import HeroSection from './_components/HeroSection'
import TestimonialSection from './_components/TestimonialSection'

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="relative">
        <FeatureSection />
        <TestimonialSection />
      </div>
    </main>
  )
}
