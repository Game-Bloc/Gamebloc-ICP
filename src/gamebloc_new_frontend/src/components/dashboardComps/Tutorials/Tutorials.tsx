import { Swiper, SwiperClass, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/swiper-bundle.css"
import "swiper/css/navigation"
import { Navigation, Autoplay } from "swiper/modules"
import React, { useCallback, useState } from "react"
// import { ChevronRight, ChevronLeft } from "lucide-react"
import {Link} from "react-router-dom"

const Tutorials = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>()
  const handlePrevious = useCallback(() => {
    swiperRef?.slidePrev()
  }, [swiperRef])

  const handleNext = useCallback(() => {
    swiperRef?.slideNext()
  }, [swiperRef])

  return (
    <div className="w-full flex flex-col gap-4 my-7 bg-[#040D17] rounded-[1.5rem]">
      <div className="flex justify-between">
        <h2 className="text-white text-lg">Know your way around Gamebloc</h2>
        {/* <div>
          <div className="rounded-md border p-2">
            <ChevronLeft />
          </div>
          <div className="rounded-md border p-2">
            <ChevronRight color="#F6B8FC" />
          </div>
        </div> */}
      </div>
      <div className="w-full flex justify-center">
        <Swiper
          onSwiper={setSwiperRef}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          className="mySwiper mx-auto"
        >
          <SwiperSlide className="w-[300px] lg:w-[480px] bg-">
            <div className="w-full flex flex-col gap-3 justify-center">
              <iframe
              className="w-full h-[220px]"             
                src="https://www.youtube.com/embed/cdUxwm-WjHo?si=sqRJ3dvWALhH7lw3"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <p className="text-base text-center text-white">
                How to withdraw ICP from Gamebloc
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-[300px] lg:w-[480px]">
            <div className="w-full flex flex-col gap-3 justify-center">
              <iframe
              className="w-full h-[220px]"
                src="https://www.youtube.com/embed/JbUwfy5TjK8?si=LnS5Ib-JGz9V37p1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <p className="text-base text-center text-white">
                How to withdraw ICP from Gameblock
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-[300px] lg:w-[480px]">
            <div className="w-full flex flex-col gap-3 justify-center">
              <iframe
              className="w-full h-[220px]"
                src="https://www.youtube.com/embed/de61Hplfv-8?si=jw8yOoO3I0cWnMiK"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <p className="text-base text-center text-white">
                How to withdraw ICP from Gameblock
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-full ">
        <Link to="howto"><button className=" mx-auto text-[#F6B8FC] text-center text-base px-3 py-2 border border-[#F6B8FC] rounded-lg">See All</button></Link>
      </div>
    </div>
  )
}

export default Tutorials
