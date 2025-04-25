import React from "react"

const FallbackLoading = () => {
  return (
    <div
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm`}
    >
      <img src={`fast_loader.gif`} alt="" />
    </div>
  )
}

export default FallbackLoading
