import * as React from "react"
import { useEffect, useState } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import Carousel from "../components/dashboardComps/Carousel/Carousell"
import Tutorials from "../components/dashboardComps/Tutorials/Tutorials"
import Recommended from "../components/dashboardComps/Recommended/Recommended"
import FreeRegistration from "../components/dashboardComps/FreeRegistration/FreeRegistration"
import GameblocTournaments from "../components/dashboardComps/Tournament/GameblocTournaments"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { ConfigProvider, FloatButton, theme, Tooltip } from "antd"
import { VscFeedback } from "react-icons/vsc"
import FeedbackModal from "../components/Modals/FeedbackModal"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import WelcomeModal from "../components/Modals/WelcomeModal"
import { useAuth } from "../Auth/use-auth-client"
import { useNavigate } from "react-router-dom"
import FallbackLoading from "../components/Modals/FallBackLoader"
import { useFetchAllTournaments } from "../Functions/blochooks"
import LoginModal2 from "../components/Modals/LoginModal2"
import { Principal } from "@dfinity/principal"
import Blitz from "../components/dashboardComps/Blitz"
import Funded from "../components/dashboardComps/Funded"
import Prepaid from "../components/dashboardComps/Prepaid"
import hooks from "../Functions/hooks"
import { IoIosCreate } from "react-icons/io"
import { MdOutlineCreate } from "react-icons/md"

const Dashboard = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const {
    getProfile,
    isLoadingProfile,
    updatingProfile,
    updateProfile,
    getMyNotifications,
    getNotificationId,
    getChatmessage,
    getICPrice,
  } = useGameblocHooks()
  const { getMyPoints, getMyStreakCount, whoami, getAdminAccID } = hooks()
  const principalText = useAppSelector(
    (state) => state.userProfile.principal_id,
  )
  const username = useAppSelector((state) => state.userProfile.username)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const userSession = sessionStorage.getItem("userSession")

  useEffect(() => {
    getICPrice()
    if (isAuthenticated) {
      if (username === "") {
        getProfile()
        whoami()
      } else {
        updateProfile()
        whoami()
      }
      getChatmessage(20)
      if (userSession === "true") {
        setAccountModal(false)
      } else {
        setAccountModal(true)
      }
    }
  }, [isAuthenticated, userSession])

  useEffect(() => {
    if (userSession === "true") {
      const principal = Principal.fromText(principalText)
      getAdminAccID()
      getMyNotifications(principal)
      getNotificationId(principal)
      getMyPoints(principal)
      getMyStreakCount()
    }
  }, [isAuthenticated, userSession])

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }
  const handleModal = () => {
    setOpenModal(!openModal)
  }
  if (isLoadingProfile) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <FallbackLoading />
      </div>
    )
  } else {
    return (
      <div className="">
        <section className="flex gap-6">
          <Header />
          <Sidebar />
          <div className="flex flex-col w-full ">
            <div className="m-4 mt-24 ">
              <h2 className="text-base text-white sm:text-lg my-4">
                Featured and Hot
              </h2>
              <Carousel />
              <FreeRegistration />
              <Blitz />
              <Funded />
              <Prepaid />
              <Tutorials />
              <GameblocTournaments loading={isLoadingProfile} />
            </div>
          </div>
        </section>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: "#F6B8FC",
            },
          }}
        >
          <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
            <Tooltip
              placement="left"
              title="Create Tournament"
              color="#bfa9c27e"
            >
              <FloatButton
                shape="circle"
                type="primary"
                icon={<MdOutlineCreate className="text-black" />}
                onClick={
                  isAuthenticated
                    ? () => navigate("/game-category")
                    : () => handleLoginModal()
                }
              />
            </Tooltip>
            {/* <Tooltip placement="left" title="Feedback" color="#bfa9c27e">
              <FloatButton
                shape="circle"
                type="primary"
                icon={<VscFeedback className="text-black" />}
                onClick={
                  isAuthenticated
                    ? () => setOpenModal(!openModal)
                    : () => handleLoginModal()
                }
              />
            </Tooltip> */}
          </FloatButton.Group>
        </ConfigProvider>
        {openModal && <FeedbackModal modal={handleModal} />}
        {openLoginModal && <LoginModal2 modal={handleLoginModal} />}
        {accountModal && <WelcomeModal modal={handleAccModal} />}
      </div>
    )
  }
}

export default Dashboard
