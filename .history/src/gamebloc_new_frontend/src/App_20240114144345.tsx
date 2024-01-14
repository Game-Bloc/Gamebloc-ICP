import * as React from "react"
import Dashboard from "./pages/Dashboard"
import { Routes, Route } from "react-router-dom"
import CreateTournament from "./pages/CreateTournament"
import LandingPage from "./pages/LandingPage"
import Admin from "./Admin/AdminSections/Admin"
import { useAppSelector } from "./redux/hooks"
import { useAuth } from "./Auth/use-auth-client"
import ProtectedRoutes from "./ProtectedRoutes"
import FallBackLoader from "./components/Modals/FallBackLoader"
import ActiveTournament from "./pages/ActiveTournament"
import Profile from "./pages/Profile"
import Category from "./pages/Category"
import TournamentDetails from "./pages/TournamentDetails"

const App = () => {
  const auth = useAppSelector((state) => state.authenticationClient.auth)
  const { principal, isAuthenticated, whoamiActor } = useAuth()
  return (
    <div>
      <React.Suspense fallback={<FallBackLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoutes userAuthState={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/game-category/:id" element={<CreateTournament />} />
            <Route path="/active-tournament" element={<ActiveTournament />} />
            <Route
              path="/active-tournament/:id"
              element={<TournamentDetails />}
            />
            <Route path="/game-category" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </React.Suspense>
    </div>
  )
}
export default App
