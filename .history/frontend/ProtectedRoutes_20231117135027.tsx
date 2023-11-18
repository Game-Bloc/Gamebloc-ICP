import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useGameBlocFunction } from "./functions/GameblocHooks"
interface Prop {
  isAuthenticated: boolean
}

const ProtectedRoutes = ({ isAuthenticated }: Prop) => {
  const navigate = useNavigate()
  const isConnected = useMemo(() => {
    return isAuthenticated
  }, [isAuthenticated])

  return isConnected ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>{navigate("/homepage")}</>
  )
}

export default ProtectedRoutes
