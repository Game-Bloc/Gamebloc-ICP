import * as React from "react"
import Dashboard from "./pages/Dashboard"
import { Routes, Route } from "react-router-dom"
import CreateTournament from "./pages/CreateTournament"
import Admin from "./Admin/AdminPages/Admin"
import { useAuth } from "./Auth/use-auth-client"
import ProtectedRoutes from "./ProtectedRoutes"
import FallBackLoader from "./components/Modals/FallBackLoader"
import ActiveTournament from "./pages/ActiveTournament"
import Profile from "./pages/Profile"
import Category from "./pages/Category"
import TournamentDetails from "./pages/TournamentDetails"
import AdminProtectedRoute from "./AdminProtectedRoute"
import WorldChat from "./pages/WorldChat"
import AdminLogin from "./Admin/AdminPages/AdminLogin"
import Prepaid from "./pages/Prepaid"
import AdminTournamentView from "./Admin/AdminPages/AdminTournamentView"
import AdminViewTournamentDetails from "./Admin/AdminPages/AdminViewTournamentDetails"
import ViewResult from "./pages/ViewResult"
import PaymentModal from "./components/Modals/PaymentModal"
import Leaderboard from "./pages/Leaderboard"
import Series from "./pages/Series"
import Blitzkrieg from "./pages/Blitzkrieg"
import AdminHub from "./Admin/AdminPages/AdminHub"
import NewPage from "./pages/NewPage"
import HowTo from "./pages/HowTo"
import Wager from "./pages/Wager"

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div>
      <React.Suspense fallback={<FallBackLoader />}>
        <Routes>
          <Route path="/" element={<NewPage />} />
          <Route element={<ProtectedRoutes userAuthState={isAuthenticated} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/howto" element={<HowTo />} />
            <Route path="/game-category/:id" element={<CreateTournament />} />
            <Route path="/active-tournament" element={<ActiveTournament />} />
            <Route path="/prepaid-tournament" element={<Prepaid />} />
            <Route path="/blitzkrieg-tournament" element={<Blitzkrieg />} />
            <Route
              path="/active-tournament/:id"
              element={<TournamentDetails />}
            />
            <Route
              path="/active-tournament/:id/view_result"
              element={<ViewResult />}
            />
            <Route
              path="/active-tournament/:id/Wager_account"
              element={<Wager />}
            />

            <Route path="/game-category" element={<Category />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/supernova-series" element={<Series />} />
            <Route path="/world-chat" element={<WorldChat />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
          <Route
            element={<AdminProtectedRoute adminAuthState={isAuthenticated} />}
          >
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<Admin />} />
            <Route
              path="/admin-tournament-view"
              element={<AdminTournamentView />}
            />
            <Route
              path="/admin-tournament-view/:id"
              element={<AdminViewTournamentDetails />}
            />
            <Route path="/admin-hub" element={<AdminHub />} />
          </Route>
        </Routes>
      </React.Suspense>
    </div>
  )
}
export default App
