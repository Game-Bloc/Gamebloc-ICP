import React, { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css/pagination"
import "./feature.css"
import { Element } from "react-scroll"

interface Props {
  setModal: any
}

const FeatureList = ({ setModal }: Props) => {
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
    if (swiperRef.current) {
      setCenterIndex(swiperRef.current.realIndex)
    }
  }, [])

  const handleSlideChange = (swiper: any) => {
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
            <div className=" flex flex-col mt-6 text-center justify-center items-center">
              <p className="text-primary-second text-[1rem] lg:text-[1.2rem] font-semibold">
                {list.title}
              </p>
              <p className="mt-[8px] text-primary-second text-[0.69rem] md:text-[0.7rem]">
                {list.descript}
              </p>
              <button
                onClick={() => setModal(true)}
                className="pt-1 pb-[.25rem]  px-[.6rem] w-[6rem]  sm:w-[10rem] lg:w-[15rem] sm:px-6 text-[.6rem] sm:text-base text-black justify-between mt-[2rem]  hover:bg-primary-second/70  flex bg-primary-second rounded-md items-center cursor-pointer sm:py-3"
              >
                <p className="text-[0.65rem] sm:text-[.85rem]">Get Started</p>
                <img
                  src={`details.png`}
                  alt=""
                  className="m-0 w-[.75rem] sm:w-6"
                />
              </button>
            </div>
          )}
        </div>
      </SwiperSlide>
    ))
  }

  return (
    <Element name="features" id="features">
      <div className="relative my-[2rem] lg:my-[5rem]  w-full">
        <div className="mb-8 lg:mb-[5rem]">
          <p className="text-primary-second text-[1.1rem] sm:text-[2rem] flex w-full justify-center 2xl:text-[3rem] font-valorant mt-4">
            Features
          </p>
        </div>
        <Swiper
          ref={(swiper) => swiper && (swiperRef.current = swiper)}
          autoplay={{ delay: 3000 }}
          onSlideChange={handleSlideChange}
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 40 },
            1452: { slidesPerView: 4, spaceBetween: 80 },
          }}
        >
          {renderIcons()}
        </Swiper>
        <img
          src={`page_1.png`}
          alt=""
          className="absolute left-0 top-[-6rem]"
        />
      </div>
    </Element>
  )
}

export default FeatureList
