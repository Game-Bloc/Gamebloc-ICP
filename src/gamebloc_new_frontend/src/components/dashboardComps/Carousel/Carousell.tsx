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
      title: "BLITZKRIEG",
      name: "Call of Duty: Mobile",
      Host: "GAMEBLOC",
      img: `nova_I.png`,
      hash: "LCD]Va0t~dn3^}0DIcIL-#%Fxp-z",
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
    {
      title: "BLITZKRIEG",
      name: "Call of Duty: Mobile",
      Host: "GAMEBLOC",
      img: `nova_II.png`,
      hash: "L9EA%0{p-a#Q1bwFES5kO7gDEcE*",
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
    {
      title: "BLITZKRIEG",
      name: "Call of Duty: Mobile",
      Host: "GAMEBLOC",
      img: `nova_III.png`,
      hash: "L28hE@~VQm.m8yyBJ|$-0000s@ne",
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
    // {
    //   title: "KOMBAT CHAMPIONSHIP",
    //   name: "Mortal Kombat 1",
    //   Host: "Kobra Kia",
    //   img: `img4.png`,
    //   hash: "LMKnl5t7_2oI.TRjVXofxvt6RPWB",
    //   tags: ["Fighting", "Action", "Battle Royle", "Multiplayer"],
    // },
    {
      title: "BLITZKRIEG",
      name: "Call of Duty: Mobile",
      Host: "GAMEBLOC",
      img: `img5.png`,
      hash: "LJF5yU-.~KV=-gRkxsWZ0ToeE4WU",
      tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    },
    // {
    //   title: "FORTNITE ROYALE ",
    //   name: "Fortnite",
    //   Host: "Dealth Ream",
    //   img: `img6.png`,
    //   hash: "LUF=z3XmJRt6uPaeNFR+xvaKRjRj",
    //   tags: ["FPS", "Shooting", "Battle Royale", "Multiplayer"],
    // },
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
