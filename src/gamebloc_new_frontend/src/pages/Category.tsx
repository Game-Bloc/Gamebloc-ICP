import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import CategoryCard from "../components/category/CategoryCard"

const Category = () => {
  const navigate = useNavigate()

  const images = [
    {
      img: `cat1.png`,
      id: 1,
      title: "Call of Duty Mobile",
      hash: "L48D:--.~JV=?7NHxtWZ0RofE3WU",
    },
    {
      img: `cat2.png`,
      id: 2,
      title: "Apex Legends Mobile",
      hash: "L571TZ-Ux^xBTOR*RoaJt:T1W:R+",
    },
    {
      img: `cat3.png`,
      id: 3,
      title: "Fortnite",
      hash: "L24_qa_29FIU_3_3ofD%-:%MxuRj",
    },
    {
      img: `cat4.png`,
      id: 4,
      title: "Chess",
      hash: "L06spiWB0JK5{ls:^5r?D$S4?HjY",
    },
  ]

  return (
    <div className="">
      <section className="flex">
        <Header />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="m-4 mt-24">
            <div className="">
              <div
                onClick={() => navigate(-1)}
                className="flex  items-center cursor-pointer"
              >
                <IoIosArrowRoundBack className="text-primary-second" />
                <p className="text-primary-second ml-2 text-[0.8rem]">Back</p>
              </div>

              <div className="mx-4 mt-4  flex flex-col">
                <h1 className="text-white sm:ml-4 font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                  Game Category
                </h1>
                <div className="mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-8 w-full">
                  {images.map((category, index) => (
                    <CategoryCard key={index} category={category} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Category
