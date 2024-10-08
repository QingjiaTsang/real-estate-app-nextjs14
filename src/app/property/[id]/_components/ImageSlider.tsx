'use client'
import type { PropertyPicture } from '@prisma/client'

import { Image } from '@nextui-org/react'
import Zoom from 'react-medium-image-zoom'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'react-medium-image-zoom/dist/styles.css'

interface ImageSliderProps {
  images: PropertyPicture[]
}

function ImageSlider({ images }: ImageSliderProps) {
  return (
    <div className="flex items-center justify-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
      >
        {images.map(image => (
          <SwiperSlide key={image.id}>
            <Zoom>
              <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
                <Image
                  src={image.url}
                  alt={image.id}
                  className="max-w-full max-h-full object-contain rounded-none"
                />
              </div>
            </Zoom>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ImageSlider
