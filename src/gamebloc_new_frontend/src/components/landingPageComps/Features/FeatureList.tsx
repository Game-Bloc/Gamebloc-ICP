import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./feature.css";
import { Element } from "react-scroll";

const FeatureList = () => {
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const swiperRef = useRef<any | null>(null);

  const icons = [
    `Rank1.svg`,
    `Rank2.svg`,
    `Rank3.svg`,
    `Rank4.svg`,
    `Rank5.svg`,
    `Rank6.svg`,
  ];

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
        "Mint, Exchange and sell Game skins, maps, items and more as NFTs.",
      img: `Rank2.svg`,
    },
    {
      title: "Live Streaming",
      descript: "Real life tournament Events Streaming",
      img: `Rank3.svg`,
    },
    {
      title: "Prepaid Tournaments",
      descript:
        "Hosting of prepaid tournaments for other users to compete and win prizes",
      img: `Rank4.svg`,
    },
    {
      title: "Crowd Funded Tournaments",
      descript:
        "Hosting tournaments funded by individual users with prices to be won",
      img: `Rank5.svg`,
    },
    {
      title: "Game Launching",
      descript: "Launching of games on GameBloc by hosting Prepaid tournaments",
      img: `Rank6.svg`,
    },
  ];

  useEffect(() => {
    // Set up an interval for autoplay
    const autoplayInterval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 3000); // Change the interval as needed

    return () => clearInterval(autoplayInterval);
  }, []);

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setCenterIndex(swiperRef.current.activeIndex);
    }
  };

  const renderIcons = () => {
    return description.map((list, index) => (
      <SwiperSlide style={{ background: "transparent" }} key={index}>
        <img
          src={list.img}
          alt={`Icon ${index + 1}`}
          className={index === centerIndex ? "center-icon" : ""}
        />
        <div className="mt-4 flex flex-col justify-center items-center">
          <p className="text-primary-second text-[1rem] lg:text-[1.2rem] text-semibold">
            {list.title}
          </p>
          <p className="mt-[8px] text-center text-[0.69rem] md:text-[0.7rem] text-primary-second">
            {list.descript}
          </p>
        </div>
      </SwiperSlide>
    ));
  };

  return (
    <Element name="features" id="features">
      <div className=" my-[5rem] w-full">
        <div style={{ marginBottom: "5rem" }} className="">
          <p
            className="text-primary-second text-[1.1rem] sm:text-[2rem] flex w-full justify-center   lg:text-[3rem] 
              xl:text-[3rem] h-fit  2xl:text-[3rem] font-valorant mt-4  "
          >
            Feature List
          </p>
        </div>

        <div className="">
          <Swiper
            ref={(swiper) => {
              if (swiper) swiperRef.current = swiper;
            }}
            autoplay={{ delay: 3000 }}
            onSlideChange={handleSlideChange}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={4}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1452: {
                slidesPerView: 4,
                spaceBetween: 80,
              },
            }}
            style={{ background: "transparent" }}
          >
            {renderIcons()}
          </Swiper>
        </div>
      </div>
    </Element>
  );
};

export default FeatureList;
