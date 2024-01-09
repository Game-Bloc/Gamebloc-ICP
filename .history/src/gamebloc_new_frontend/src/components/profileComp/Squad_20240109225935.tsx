import React, { useState } from "react"

const Squad = () => {
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col ">
        <img src={`empty.svg`} alt="" />
      </div>
    </div>
  )
}

export default Squad
