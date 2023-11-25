import React, { useEffect, useMemo, useState } from "react"
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useGameBlocFunction } from "./functions/GameblocHooks"
import { useConnect } from "@connect2ic/react"
interface Prop {
  userAuthState: string
}

const ProtectedRoutes = ({ userAuthState }: Prop) => {
  const navigate = useNavigate()
  const isAuthenticated = useMemo(() => {
    if (userAuthState == "true") {
      return true
    } else if (userAuthState == "false") {
      return false
    }
  }, [userAuthState])

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>{<Navigate to="/homepage" />}</>
  )
}

export default ProtectedRoutes
