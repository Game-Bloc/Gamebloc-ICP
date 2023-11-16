import { useEffect, useState, lazy } from "react"
import ActiveTournament from "../components/overViewPageComponents/ActiveTournament"
import { Container } from "../styles/commonStyles/Container.styles"
import LoginModal from "../components/Popup/LoginModal"
import { useAppSelector } from "../redux/hooks"
import React from "react"
import { useGameBlocFunction } from "../functions/GameblocHooks"
import Loader from "../components/Popup/Loader/Loader"
import CommonHeader from "../common/CommonHeader"
import SideBar from "./SideBar"
import { Wrapper } from "../styles/commonStyles/Wrapper"

const ActiveStreams = lazy(
  () => import("../components/overViewPageComponents/ActiveStreams"),
)
const SliderView = lazy(
  () => import("../components/overViewPageComponents/SliderView"),
)
const PopularGame = lazy(
  () => import("../components/overViewPageComponents/PopularGame"),
)
const GamingHub = lazy(
  () => import("../components/overViewPageComponents/GamingHub"),
)

const OverviewPage = () => {
  // const { fetchAllTournaments } = useGameBlocFunction();
  const checkState = useAppSelector(
    (state) => state.userProfile.initializeState,
  )

  // useEffect(() => {
  //   fetchAllTournaments()
  // }, []);

  return (
    <>
      <CommonHeader />
      <Container display="flex" flexDirection="row">
        <SideBar />
        <Wrapper
          xmdmargin="7rem 1rem 0 1rem"
          xmdwidth="100%"
          width="79%"
          margin="7rem 0 0 19%"
        >
          <Container backgroundColor="#01070E" margin="0 0 1rem 0">
            <SliderView />
            <ActiveTournament />
            <PopularGame />
            <GamingHub />
            <ActiveStreams />
            {!checkState && <LoginModal />}
          </Container>
        </Wrapper>
      </Container>
    </>
  )
}

export default OverviewPage
