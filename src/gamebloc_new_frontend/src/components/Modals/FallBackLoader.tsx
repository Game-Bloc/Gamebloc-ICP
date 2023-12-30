import React from "react"
import { PulseLoader } from "react-spinners"

const FallbackLoading = () => {
  return (
    <div className="fallloader">
      <PulseLoader color="#f6b8fc" />
    </div>
  )
}

export default FallbackLoading
