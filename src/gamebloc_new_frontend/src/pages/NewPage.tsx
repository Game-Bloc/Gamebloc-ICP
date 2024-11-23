import React, { useState } from "react"
import Header from "../components/landingPageComps/LandHeader"
import Hero from "../components/onePager/Hero"

const NewPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  return (
    <div className="">
      <Header setModal={setOpenModal} />
      <Hero />
    </div>
  )
}

export default NewPage
