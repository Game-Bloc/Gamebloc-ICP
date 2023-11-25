import React, { useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"

interface Prop {
  userAuthState: string
}

const ProtectedRoutes = ({ userAuthState }: Prop) => {
  const navigate = useNavigate()

  const isAuthenticated = useMemo(() => {
    return userAuthState === "true"
  }, [userAuthState])

  useEffect(() => {
    // Use a conditional check to navigate only when needed
    if (!isAuthenticated) {
      navigate("/homepage")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate])

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : null
}

export default ProtectedRoutes
