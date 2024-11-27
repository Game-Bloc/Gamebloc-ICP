import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css/pagination"
import "./feature.css"
import { Element } from "react-scroll"

const FeatureList = () => {
  const [centerIndex, setCenterIndex] = useState<number>(0)
  const swiperRef = useRef<any | null>(null)

  const description = [
    {
      title: "Ranking and Leaderboards",
      descript:
        "Game ranking and leaderboards based on performance in tournaments",
      img: `Rank1.svg`,
    },
    {
      title: "NFT Marketplace",
      descript:
        "Mint, exchange, and sell game skins, maps, items, and more as NFTs.",
      img: `Rank2.svg`,
    },
    {
      title: "Live Streaming",
      descript: "Real-life tournament event streaming",
      img: `Rank3.svg`,
    },
    {
      title: "Prepaid Tournaments",
      descript: "Host prepaid tournaments for others to compete and win prizes",
      img: `Rank4.svg`,
    },
    {
      title: "Crowd-Funded Tournaments",
      descript:
        "Host tournaments funded by individual users with prizes to win",
      img: `Rank5.svg`,
    },
    {
      title: "Game Launching",
      descript: "Launch games on GameBloc through prepaid tournaments",
      img: `Rank6.svg`,
    },
  ]

  useEffect(() => {
    // Set the initial centerIndex after Swiper initializes
    if (swiperRef.current) {
      setCenterIndex(swiperRef.current.realIndex)
    }
  }, [])

  const handleSlideChange = (swiper: any) => {
    // Update center index on each slide change
    setCenterIndex(swiper.realIndex)
  }

  const renderIcons = () => {
    return description.map((list, index) => (
      <SwiperSlide style={{ background: "transparent" }} key={index}>
        <div className="flex flex-col items-center">
          <img
            src={list.img}
            alt={`Icon ${index + 1}`}
            className={index === centerIndex ? "center-icon" : ""}
          />
          {index === centerIndex && (
            <div className="mt-4 text-center">
              <p className="text-primary-second text-[1rem] lg:text-[1.2rem] font-semibold">
                {list.title}
              </p>
              <p className="mt-[8px] text-primary-second text-[0.69rem] md:text-[0.7rem]">
                {list.descript}
              </p>
            </div>
          )}
        </div>
      </SwiperSlide>
    ))
  }

  return (
    <Element name="features" id="features">
      <div className="my-[5rem] w-full">
        <div style={{ marginBottom: "5rem" }}>
          <p className="text-primary-second text-[1.1rem] sm:text-[2rem] flex w-full justify-center 2xl:text-[3rem] font-valorant mt-4">
            GameBloc Active Feature List
          </p>
        </div>
        <Swiper
          ref={(swiper) => swiper && (swiperRef.current = swiper)}
          autoplay={{ delay: 3000 }}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination]}
          slidesPerView={3}
          spaceBetween={20}
          loop={true}
          centeredSlides={true} // Ensures slides are centered
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1452: { slidesPerView: 4, spaceBetween: 80 },
          }}
        >
          {renderIcons()}
        </Swiper>
      </div>
    </Element>
  )
}

export default FeatureList
