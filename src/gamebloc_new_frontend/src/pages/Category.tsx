import React, { useEffect, useState } from "react"
import Header from "../components/Header/Header"
import Sidebar from "../components/dashboardComps/Sidebar"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io"
import FallbackLoading from "../components/Modals/FallBackLoader"

const Category = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(true)

  const images = [
    { img: `category1.svg`, id: 1, title: "Call of Duty Mobile" },
    { img: `category2.svg`, id: 2, title: "Apex Legends Mobile" },
    { img: `category3.svg`, id: 3, title: "Call of Duty Modern Warfare" },
    { img: `category4.svg`, id: 4, title: "Valorant" },
  ]

  useEffect(() => {
    const timeOut = setInterval(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timeOut)
  }, [])

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <FallbackLoading />
        </div>
      ) : (
        <div className="">
          <section className="flex">
            <Header />
            <Sidebar />
            <div className="flex flex-col w-full">
              <div className="m-4 mt-24  ">
                <div className="">
                  <div
                    onClick={() => navigate(-1)}
                    className="flex  items-center cursor-pointer"
                  >
                    <IoIosArrowRoundBack className="text-primary-second" />
                    <p className="text-primary-second ml-2 text-[0.8rem]">
                      Back
                    </p>
                  </div>

                  <div className="mx-4 mt-4  flex flex-col">
                    <h1 className="text-white sm:ml-4 font-bold mt-4 text-base md:text-[1.5rem] 2xl:text-[2rem]">
                      Choose a game
                    </h1>
                    <div className="mt-8 gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 xl:gap-8 w-full">
                      {images.map((category) => (
                        <Link
                          to={`/game-category/${
                            category.id
                          }?title=${encodeURIComponent(category.title)}`}
                          key={category.id}
                        >
                          <div className="rounded-[10px] w-full relative cursor-pointer">
                            <img
                              src={category.img}
                              className="border hover:scale-105 m-0 border-white/15 border-solid rounded-[10px]  "
                              alt=""
                            />
                            <h2 className="absolute top-[1.1rem] left-4 text-sm text-white md:text-base  lg:text-lg ">
                              {category.title}
                            </h2>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Category
