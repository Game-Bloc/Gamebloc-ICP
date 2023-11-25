import React, { useEffect, useMemo, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useGameBlocFunction } from "./functions/GameblocHooks"
import { useConnect } from "@connect2ic/react"
interface Prop {
  userAuthState: string
}

const ProtectedRoutes = ({ userAuthState }: Prop) => {
  const navigate = useNavigate()
  const isAuthenticated = useMemo(() => {
    if (userAuthState) {
      return userAuthState
    }
  }, [userAuthState])

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : (
    <>{navigate("/homepage")}</>
  )
}

export default ProtectedRoutes
