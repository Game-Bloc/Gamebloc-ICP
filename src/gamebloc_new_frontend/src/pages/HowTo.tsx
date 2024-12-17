import React from "react"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const HowTo = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-8 sm:px-10 py-8 w-screen">
      <div onClick={() => navigate(-1)} className="flex gap-4 items-center text-[#F6B8FC] cursor-pointer px-10 sm:px-0">
        <ArrowLeft className="color-[#F6B8FC]" />
        <span className="text-sm" >Go Back</span>
      </div>
      <div className="flex flex-col gap-5 px-10 sm:px-0">
        <h1 className="text-white text-4xl font-semibold">Tutorial Videos</h1>
        <p className="text-white text-base">
          Here are videos to help you Know and find your way Around GameBloc
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 flex-wrap mx-auto">
        <div className="w-[300px] xl:w-[480px] flex flex-col gap-4 justify-center">
          <iframe
            className="w-full h-[220px] rounded-lg"
            src="https://www.youtube.com/embed/cdUxwm-WjHo?si=sqRJ3dvWALhH7lw3"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="text-base text-center text-white">
            How to withdraw ICP from Gamebloc
          </p>
        </div>
        <div className="w-[300px] xl:w-[480px] flex flex-col gap-4 justify-center">
          <iframe
            className="w-full h-[220px] rounded-lg"
            src="https://www.youtube.com/embed/JbUwfy5TjK8?si=LnS5Ib-JGz9V37p1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="text-base text-center text-white">
            How to Create a Squad on GameBloc
          </p>
        </div>
        <div className="w-[300px] xl:w-[480px] flex flex-col gap-4 justify-center">
          <iframe
            className="w-full h-[220px] rounded-lg"
            src="https://www.youtube.com/embed/de61Hplfv-8?si=jw8yOoO3I0cWnMiK"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="text-base text-center text-white">
            How to buy ICP on GameBloc
          </p>
        </div>
      </div>
    </div>
  )
}

export default HowTo
