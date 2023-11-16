import React, { useMemo } from "react"
import { Outlet, Navigate, useNavigate } from "react-router-dom"
import { useGameBlocFunction } from "./functions/GameblocHooks"
import { useConnect } from "@connect2ic/react"

interface Prop {
  isConnected: boolean
}

const ProtectedRoutes: React.FC<Prop> = ({ isConnected }) => {
  const { getProfile } = useGameBlocFunction()

  // Use the useNavigate hook outside the render phase
  const navigate = useNavigate()

  useMemo(() => {
    if (isConnected) {
      // Perform any necessary actions when the user is connected
      getProfile()
    } else {
      // Redirect to the homepage if the user is not connected
      navigate("/homepage")
    }
  }, [isConnected, navigate, getProfile])

  return isConnected ? <Outlet /> : <Navigate to="/homepage" />
}

export default ProtectedRoutes
