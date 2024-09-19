import React, { useEffect, useState } from "react"
import Header from "../components/landingPageComps/LandHeader"
import Hero from "../components/landingPageComps/Hero"
import Gamebloc from "../components/landingPageComps/Gamebloc"
import FeatureList from "../components/landingPageComps/Features/FeatureList"
import Secure from "../components/landingPageComps/Secure"
import Slider from "../components/landingPageComps/Slider/Slider"
import About from "../components/landingPageComps/About"
import Footer from "../components/landingPageComps/Footer"
import LoginModal from "../components/Modals/LoginModal"
import WelcomeModal from "../components/Modals/WelcomeModal"
import { useAuth } from "../Auth/use-auth-client"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import { useAppSelector } from "../redux/hooks"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const { principal, isAuthenticated, whoamiActor } = useAuth()
  const { getProfile, getProfile2, isLoadingProfile, isAccount } =
    useGameblocHooks()
  const state = useAppSelector((state) => state.userProfile.initializeState)
  const userSession = sessionStorage.getItem("userSession")
  const _principal = useAppSelector((state) => state.userProfile.principal_id)

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
      if (state && _principal !== "") {
        navigate("/dashboard")
      } else if (userSession === "true") {
        setAccountModal(false)
      } else {
        setAccountModal(true)
      }
    }
  }, [isAuthenticated, principal, whoamiActor, state])

  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="bg-[#08010E]">
        <Header setModal={setOpenModal} />
        <Hero setModal={setOpenModal} />
        <Gamebloc setModal={setOpenModal} />
        <FeatureList />
        <Secure />
        <Slider />
        <About setModal={setOpenModal} />
        <Footer />
        {openModal && <LoginModal modal={handleModal} />}
      </div>
    )
  }
}

export default LandingPage
