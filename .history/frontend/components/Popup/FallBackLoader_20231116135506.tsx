import React from "react"
import { PulseLoader } from "react-spinners"

const FallbackLoading = () => {
  return (
    <div className="fallloader">
      <PulseLoader color="#008cff" />
    </div>
  )
}

export default FallbackLoading
