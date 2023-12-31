import { useEffect, useState, lazy } from "react"
import ActiveTournament from "../components/overViewPageComponents/ActiveTournament"
import { Container } from "../styles/commonStyles/Container.styles"
import LoginModal from "../components/Popup/LoginModal"
import { useAppSelector } from "../redux/hooks"
import React from "react"
// import { useGameblocFunction } from "../functions/GameblocHook";

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
  // const { getTournamentCount } = useGameblocFunction();
  const checkState = useAppSelector(
    (state) => state.userProfile.initializeState,
  )

  // useEffect(() => {
  //   getTournamentCount();
  // }, []);

  return (
    <Container backgroundColor="#01070E" margin="0 0 1rem 0">
      <SliderView />
      <ActiveTournament />
      <PopularGame />
      <GamingHub />
      <ActiveStreams />
      {!checkState && <LoginModal />}
    </Container>
  )
}

export default OverviewPage
