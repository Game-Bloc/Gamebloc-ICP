import React, { useEffect, useState } from "react"
import { Blurhash } from "react-blurhash"
import { Link } from "react-router-dom"

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
      <div className="rounded-[10px] w-full relative cursor-pointer">
        <div style={{ display: isImageLoaded ? "none" : "inline" }}>
          <Blurhash
            hash={category.hash}
            resolutionX={32}
            resolutionY={32}
            punch={1}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <img
          style={{ display: isImageLoaded ? "inline" : "none" }}
          src={category.img}
          className="border hover:scale-105 m-0 border-white/15 border-solid rounded-[10px]  "
          alt=""
        />
        <h2 className="absolute top-[1.1rem] left-4 text-sm text-white md:text-base  lg:text-lg ">
          {category.title}
        </h2>
      </div>
    </Link>
  )
}

export default CategoryCard
