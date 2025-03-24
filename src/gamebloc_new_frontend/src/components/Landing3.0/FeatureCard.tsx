import React from "react"

interface FeatureCardProps {
  img: string
  title: string
  description: string
}

function FeatureCard({ img, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-1 bg-gradient-to-br from-[rgb(127,125,125,0.3)] to-[rgb(48,47,47,0.3)] p-5 w-[200p] md:w-[300px] min-h-[300px]">
      <img src={img} alt="" className="" />
      <h1 className="font-valorant text-[#F6B8FC]">{title}</h1>
      <p className="text-white text-[12px] md:text-xs">{description}</p>
    </div>
  )
}

export default FeatureCard
