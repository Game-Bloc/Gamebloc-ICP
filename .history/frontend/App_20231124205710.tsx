import React, { useEffect, useMemo, useState } from "react"
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
// import * as gamebloc from "../.dfx/local/canisters/kitchen"

import * as gamebloc from "../.dfx/local/canisters/kitchen"

// import * as gamebloc from "../src/declarations/kitchen"

import { ThemeProvider } from "styled-components"
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom"
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
import { useGameBlocFunction } from "./functions/GameblocHooks"
import ProtectedRoutes from "./ProtectedRoutes"
import FallBackLoader from "./components/Popup/FallBackLoader"
import { useAppDispatch, useAppSelector } from "./redux/hooks"
import { updateAuthState } from "./redux/slice/authSlice"
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
  const { isConnected, isDisconnecting } = useConnect()
  const dispatch = useAppDispatch()
  const userAuthState = useAppSelector((state) => state.auth.auth)
  console.log(isDisconnecting)
  useEffect(() => {
    const authState = {
      auth: true,
    }
    if (isConnected && isDisconnecting == false) {
      dispatch(updateAuthState(authState))
    }
  }, [isConnected, isDisconnecting])

  return (
    <React.Suspense fallback={<FallBackLoader />}>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyles />
          <Routes>
            <Route
              path="/homepage"
              element={userAuthState ? <Navigate to="/" /> : <HomePage />}
            />
            <Route element={<ProtectedRoutes userAuthState={userAuthState} />}>
              <Route path="/" element={<OverviewPage />} />
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
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </React.Suspense>
  )
}

export const client = createClient({
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
