import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useGameBlocFunction } from "./functions/GameblocHooks"
import { useConnect } from "@connect2ic/react"
interface Prop {
  isConnected: boolean
}

const ProtectedRoutes = ({ isConnected }: Prop) => {
  const navigate = useNavigate()

  const isAuthenticated = useMemo(() => {
    return isConnected
  }, [isConnected])

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>{navigate("/homepage")}</>
  )
}

export default ProtectedRoutes
