import React, { useEffect, useState } from "react"
import Header from "../components/landingPageComps/LandHeader"
import Hero from "../components/onePager/Hero"
import Gamebloc from "../components/onePager/Gamebloc"
import LoginModal from "../components/Modals/LoginModal"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Auth/use-auth-client"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { useAppSelector } from "../redux/hooks"
import FallbackLoading from "../components/Modals/FallBackLoader"
import FeatureList from "../components/onePager/Features/FeatureList"
import Secure from "../components/onePager/Secure"

const NewPage = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const { principal, isAuthenticated, whoamiActor } = useAuth()
  const { getProfile, getProfile2, isLoadingProfile, isAccount } =
    useGameblocHooks()
  const state = useAppSelector((state) => state.userProfile.initializeState)
  const userSession = sessionStorage.getItem("userSession")

  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }

  console.log("state", state)

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

  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <Header setModal={setOpenModal} />
        <Hero setModal={setOpenModal} />
        <Gamebloc setModal={setOpenModal} />
        <FeatureList setModal={setOpenModal} />
        <Secure />
        {openModal && <LoginModal modal={handleModal} />}
      </div>
    )
  }
}

export default NewPage
