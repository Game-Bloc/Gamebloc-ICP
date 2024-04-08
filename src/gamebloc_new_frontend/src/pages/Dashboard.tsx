import * as React from "react"
import { useEffect, useState } from "react"
import Sidebar from "../components/dashboardComps/Sidebar"
import Header from "../components/Header/Header"
import Carousel from "../components/dashboardComps/Carousel/Carousell"
import Recommended from "../components/dashboardComps/Recommended/Recommended"
import FreeRegistration from "../components/dashboardComps/FreeRegistration/FreeRegistration"
import GameblocTournaments from "../components/dashboardComps/Tournament/GameblocTournaments"
import { useGameblocHooks } from "../Functions/gameblocHooks"
import { ConfigProvider, FloatButton, theme } from "antd"
import { VscFeedback } from "react-icons/vsc"
import FeedbackModal from "../components/Modals/FeedbackModal"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import LoginModal from "../components/Modals/LoginModal"
import WelcomeModal from "../components/Modals/WelcomeModal"
import { useAuth } from "../Auth/use-auth-client"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAuth()
  const {
    getProfile,
    isLoadingProfile,
    getProfile2,
    getFeedBacks,
    getChatmessage,
  } = useGameblocHooks()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openLoginModal, setOpenLoginModal] = useState<boolean>(false)
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const state = useAppSelector((state) => state.userProfile.initializeState)

  useEffect(() => {
    if (isAuthenticated) {
      getProfile()
      getFeedBacks()
      getChatmessage(20)
      if (state) {
        navigate("/dashboard")
        // window.location.reload()
      } else {
        setAccountModal(true)
      }
    }
  }, [])

  const handleLoginModal = () => {
    setOpenLoginModal(!openLoginModal)
  }
  const handleAccModal = () => {
    setAccountModal(!accountModal)
  }
  const handleModal = () => {
    setOpenModal(!openModal)
  }

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
            {/* <Recommended /> */}
            <FreeRegistration />
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
        <FloatButton
          shape="circle"
          type="primary"
          tooltip="Feedback"
          style={{ right: 15, bottom: 15 }}
          icon={<VscFeedback className="text-black" />}
          onClick={() => setOpenModal(!openModal)}
        />
      </ConfigProvider>
      {openModal && <FeedbackModal modal={handleModal} />}
      {openLoginModal && <LoginModal modal={handleLoginModal} />}
      {accountModal && <WelcomeModal modal={handleAccModal} />}
    </div>
  )
}

export default Dashboard

{
  /* <div className="">
  <section className="flex">
    <Header />
    <Sidebar />
    <div className="flex flex-col w-full">
      <div className="m-4 mt-24  "></div>
    </div>
  </section>
</div>; */
}
