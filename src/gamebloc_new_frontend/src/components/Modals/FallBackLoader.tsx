import React from "react"
import { PulseLoader } from "react-spinners"

const FallbackLoading = () => {
  return (
    // <div className="fallloader">
    //   <PulseLoader color="#f6b8fc" />
    // </div>
    <div
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <img src={`Fast Loader.gif`} alt="" />
    </div>
  )
}

export default FallbackLoading
