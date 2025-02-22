'use client'

import { ImagesSlider } from '@/components/ui/images-slider'
import { Button, Link } from '@nextui-org/react'
import { motion } from 'framer-motion'

const images = [
  '/images/carousel1.avif',
  '/images/carousel2.avif',
  '/images/carousel3.avif',
]

function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-12">
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
                Discover Your
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                Perfect Space
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-foreground/80 mb-8 md:mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              EstateHub: Your gateway to premium real estate. Find, buy, or rent your perfect property with ease.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <Link href="/properties" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg
                  hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300"
                >
                  Explore Properties
                </Button>
              </Link>

              <Link href="#features" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="bordered"
                  className="w-full border-2 border-violet-600/30 hover:border-violet-600/60
                  hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full md:w-fit mt-8 md:mt-0"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur opacity-20 animate-pulse" />
            <ImagesSlider
              images={images}
              overlay={false}
              className="rounded-lg h-[180px] md:w-[23rem] md:h-[22rem] lg:w-[35rem] lg:h-[30rem] xl:w-[45rem]"
            >
              {null}
            </ImagesSlider>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
