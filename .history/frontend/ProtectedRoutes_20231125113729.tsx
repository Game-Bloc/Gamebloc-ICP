import React, { useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import debounce from "lodash/debounce"

interface Prop {
  userAuthState: string
}

const ProtectedRoutes = ({ userAuthState }: Prop) => {
  const navigate = useNavigate()

  const debouncedNavigate = useMemo(() => {
    return debounce(navigate, 500) // Adjust the delay as needed
  }, [navigate])

  const isAuthenticated = useMemo(() => {
    return userAuthState === "true"
  }, [userAuthState])

  useEffect(() => {
    // Use a conditional check to navigate only when needed
    if (!isAuthenticated) {
      debouncedNavigate("/homepage")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, debouncedNavigate])

  return isAuthenticated ? (
    <div>
      <Outlet />
    </div>
  ) : null
}

export default ProtectedRoutes
