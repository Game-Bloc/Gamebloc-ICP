import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "./carousel.css"
import CarouselCard from "./CarouselCard"
import SoonModal from "../../../components/Modals/SoonModal"

const Carousell = () => {
  const [modal, setModal] = useState<boolean>(false)

  const handleModal = () => {
    setModal(!modal)
  }

  const carouselData = [
    {
      title: "THE CHAMPIONS TOURNAMENT",
      name: "E Football 2022 ",
      Host: "Gamesoft",
      img: `img1.png`,
      tags: ["Football", "Sport", "Multiplayer"],
    },
    {
      title: "CLASH ROYALE RUMBLE",
      name: "Clash Royale",
      Host: "Gamesoft",
      img: `img2.png`,
      tags: ["RPG", "Card", "Strategy", "Multiplayer"],
    },
    {
      title: "FIFA CHAMPIONSHIP",
      name: "EA Sports FC 24",
      Host: "EA Sports",
      img: `img3.png`,
      tags: ["Sport", "Strategy", "Multiplayer"],
    },
    {
      title: "KOMBAT CHAMPIONSHIP",
      name: "Mortal Kombat 1",
      Host: "Kobra Kia",
      img: `img4.png`,
      tags: ["Fighting", "Action", "Battle Royle", "Multiplayer"],
    },
    {
      title: "THE GENESIS TOURNAMENT",
      name: "Call of Duty: Mobile",
      Host: "Gamebloc",
      img: `img5.png`,
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
    {
      title: "FORTNITE ROYALE ",
      name: "Fortnite",
      Host: "Dealth Ream",
      img: `img6.png`,
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
  ]

  return (
    <div className="  justify-center items-center flex xl:block  text-white">
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
        // navigation={true}
        modules={[Autoplay, Pagination]}
        loop={true}
        className="mySwiper"
      >
        {carouselData.map((list, index) => (
          <SwiperSlide key={index}>
            <CarouselCard list={list} setModal={setModal} />
          </SwiperSlide>
        ))}
      </Swiper>
      {modal && <SoonModal modal={handleModal} />}
    </div>
  )
}

export default Carousell
