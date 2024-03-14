import { DotChartOutlined } from "@ant-design/icons"
import { Skeleton } from "antd"
import React, { useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"
import { Link } from "react-router-dom"

// const loader = require("../../../assets/category1.svg").default

interface Props {
  category: any
}

const CategoryCard = ({ category }: Props) => {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = category.img
  }, [category.img])

  return (
    <Link
      to={`/game-category/${category.id}?title=${encodeURIComponent(
        category.title,
      )}`}
      key={category.id}
    >
      <div className="rounded-[10px] flex w-full h-full relative cursor-pointer">
        {!isImageLoaded && (
          <div className="flex flex-col w-full h-full justify-center items-center">
            <Skeleton.Node className=" bg-[#505050] " active={true}>
              <DotChartOutlined style={{ fontSize: 40, color: "#bfbfbf" }} />
            </Skeleton.Node>
            <Skeleton.Input
              className="mt-[1rem] bg-[#505050] h-[1.2rem]"
              active={true}
              size={"small"}
            />
          </div>
        )}
        {isImageLoaded && (
          <>
            <img
              style={{ display: isImageLoaded ? "inline" : "none" }}
              src={category.img}
              className="border hover:scale-105 m-0 border-white/15 border-solid rounded-[10px]  "
              alt=""
            />
            <h2 className="absolute top-[1.1rem] left-4 text-[.72rem] sm:text-sm text-white md:text-base  lg:text-lg ">
              {category.title}
            </h2>
          </>
        )}
      </div>
    </Link>
  )
}

export default CategoryCard
