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
      // Use setTimeout to avoid calling navigate during render
      const timeoutId = setTimeout(() => {
        navigate("/homepage")
      }, 0)

      // Cleanup the timeout to prevent memory leaks
      return () => clearTimeout(timeoutId)
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
