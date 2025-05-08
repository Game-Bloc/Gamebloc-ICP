import { useEffect } from "react"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Landing3.0/Header"
import Hero from "../components/Landing3.0/Hero"
import SubHero from "../components/Landing3.0/SubHero"
import Games from "../components/Landing3.0/Games"
import NewFeatures from "../components/Landing3.0/NewFeatures"
import Ancient from "../components/Landing3.0/Ancient"
import Roadmap from "../components/Landing3.0/Roadmap"
import Contact from "../components/Landing3.0/Contact"
import Footer from "../components/Landing3.0/Footer"
import LoginModal from "../components/Modals/LoginModal3"
import { useAuth } from "../Auth/use-auth-client"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { useAppSelector } from "../redux/hooks"
import FallbackLoading from "../components/Modals/FallBackLoader"

function Landing() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const { principal, isAuthenticated, whoamiActor } = useAuth()
  const { getProfile, getProfile2, isLoadingProfile, isAccount } =
    useGameblocHooks()
  const state = useAppSelector((state) => state.userProfile.initializeState)
  const userSession = sessionStorage.getItem("userSession")
  const navigate = useNavigate()
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }

  useEffect(() => {
    localStorage.setItem("userSession", "false")
    if (isAuthenticated) {
      getProfile()
      if (state) {
        navigate("/dashboard")
      } else if (userSession === "true") {
        setAccountModal(false)
      } else {
        setAccountModal(true)
      }
    }
  }, [isAuthenticated, principal, whoamiActor, state])

  console.log("state", state)
  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="App overflow-hidden">
        <img
          src={`blur.png`}
          alt=""
          className="hidden lg:block absolute -top-10 -right-20 -z-10"
        />
        <img
          src={`touch1.png`}
          alt=""
          className="absolute top-72 left-0 -z-10 h-[300px] w-32"
        />
        <Header setVisible={setOpenModal} />
        <Hero setVisible={setOpenModal} />
        <SubHero />
        <Games setVisible={setOpenModal} />
        <NewFeatures />
        <Ancient setVisible={setOpenModal} />
        <Roadmap />
        <Contact />
        <Footer />
        {openModal && <LoginModal modal={handleModal} />}
      </div>
    )
  }
}

export default Landing
