import React, { useEffect, useState } from "react"
import logo from "./assets/dfinity.svg"
/*
 * Connect2ic provides essential utilities for IC app development
 */
import { createClient } from "@connect2ic/core"
import { defaultProviders } from "@connect2ic/core/providers"
import { Connect2ICProvider, useConnect } from "@connect2ic/react"
import "@connect2ic/core/style.css"

/*
 * Import canister definitions like this:
 */
import * as gamebloc from "../.dfx/local/canisters/hello_world_backend"

import { ThemeProvider } from "styled-components"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Container } from "./styles/commonStyles/Container.styles"
import { Wrapper } from "./styles/commonStyles/Wrapper"
import GlobalStyles from "./styles/Global"
import HomePage from "./pages/HomePage"
import Loader from "./components/Popup/Loader/Loader"
import CommonHeader from "./common/CommonHeader"
import SideBar from "./pages/SideBar"
import OverviewPage from "./pages/OverviewPage"
import ActiveTournamentPage from "./pages/ActiveTournamentPage"
import ActiveTournamentDetails from "./pages/ActiveTournamentDetails"
import TournamentCategory from "./pages/TournamentCategory"
import CreateTournament from "./pages/CreateTournament"
import "./App.scss"
import Admin from "./pages/Admin"
import AdminSideBar from "./components/adminComponents/AdminSideBar"
import SetAdmin from "./pages/SetAdmin"
const NewsPage = React.lazy(() => import("./pages/NewsPage"))
const NewsDetails = React.lazy(() => import("./pages/NewsDetails"))
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"))
const CrowdFunded = React.lazy(() => import("./pages/CrowdFunded"))
const History = React.lazy(() => import("./pages/History"))
const Profile = React.lazy(() => import("./pages/Profile"))

const theme = {
  colors: {
    header: "#01070E",
    body: "#01070E",
  },
}

function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const navigate = useNavigate()

  const { isConnected, principal, activeProvider } = useConnect()
  useEffect(() => {
    if (isConnected) {
      navigate("/home")
    } else if (isConnected && isAdmin) {
      navigate(
        "b3d7c2d4-58d4-4d40-b143-f15f344ee9a9/e06revg77353098e36/make-admin",
      )
    } else {
      navigate("/")
    }
  }, [isConnected, isAdmin])

  console.log("Status:", isConnected)

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <GlobalStyles />

        {/* {isConnected && !isAdmin ? ( */}
        <>
          <CommonHeader />
          <Container display="flex" flexDirection="row">
            <React.Suspense
              fallback={
                <Container
                  width="100%"
                  height="100vh"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Loader />
                </Container>
              }
            >
              <SideBar />
              <Wrapper
                xmdmargin="7rem 1rem 0 1rem"
                xmdwidth="100%"
                width="79%"
                margin="7rem 0 0 19%"
              >
                <Routes>
                  <Route path="/home" element={<OverviewPage />} />
                  <Route
                    path="/active-tournament"
                    element={<ActiveTournamentPage />}
                  />
                  <Route
                    path="active-tournament-details/:id"
                    element={<ActiveTournamentDetails />}
                  />
                  <Route
                    path="tournament-category"
                    element={<TournamentCategory />}
                  />
                  <Route
                    path="tournament-category/:id"
                    element={<CreateTournament />}
                  />
                  <Route path="new-page" element={<NewsPage />} />
                  <Route path="news-details" element={<NewsDetails />} />
                  <Route path="error-page" element={<ErrorPage />} />
                  <Route path="crowd-funded" element={<CrowdFunded />} />
                  <Route path="history" element={<History />} />
                  <Route path="profile" element={<Profile />} />
                  <Route
                    path="b3d7c2d4-58d4-4d40-b143-f15f344ee9a9/e06revg77353098e36/make-admin"
                    element={<SetAdmin />}
                  />
                </Routes>
              </Wrapper>
            </React.Suspense>
          </Container>
        </>
        {/* ) : isAdmin && isConnected ? ( */}
        <>
          <CommonHeader />
          <Container display="flex" flexDirection="row">
            <React.Suspense
              fallback={
                <Container
                  width="100%"
                  height="100vh"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Loader />
                </Container>
              }
            >
              <AdminSideBar />
              <Wrapper
                xmdmargin="7rem 1rem 0 1rem"
                xmdwidth="100%"
                width="79%"
                margin="7rem 0 0 19%"
              >
                <Routes>
                  <Route
                    path="b3d7c2d4-58d4-4d40-b143-f15f344ee9a9/admin-page"
                    element={<Admin />}
                  />
                </Routes>
              </Wrapper>
            </React.Suspense>
          </Container>
        </>
        {/* ) : ( */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* )} */}
      </Container>
    </ThemeProvider>
  )
}

const client = createClient({
  canisters: {
    gamebloc,
  },
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
})

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
)

//  const handleSignOut = () => {
//    window.localStorage.clear()
//    window.location.reload()
//    navigate("/")
//  }
