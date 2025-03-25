import React from "react"
import Button from "./Button"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import ClipLoader from "react-spinners/ClipLoader"
import { useState } from "react"
import { motion } from "motion/react"

function Contact() {
  const MySwal = withReactContent(Swal)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const color = "#ffffff"

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "white",
  }

  const popUp = () => {
    MySwal.fire({
      position: "center",
      icon: "success",
      text: `Email: ${email}`,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    })
  }

  const errorPopUp = () => {
    MySwal.fire({
      position: "center",
      icon: "error",
      text: "Failed",
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    })
  }

  function isValidEmail(email: any) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const onChange = (e: any) => {
    const newEmail = e.target.value.trim()
    setEmail(newEmail)
    setIsValid(isValidEmail(newEmail))
  }

  const handleSubmit = () => {
    if (email) {
      setLoading(true)
      fetch(`/api/memberAdd?email=${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }

          // Check if response is JSON
          const contentType = res.headers.get("content-type")
          if (contentType && contentType.includes("application/json")) {
            return res.json() // Parse as JSON only if it's JSON
          } else {
            throw new Error("Unexpected response format: expected JSON")
          }
        })
        .then((data) => {
          console.log("Response data:", data) // Handle the JSON data
          setLoading(false)
          popUp() // Show success popup
          setEmail("") // Clear email input
        })
        .catch((err) => {
          setLoading(false)
          errorPopUp() // Show error popup
          console.error("Error:", err)
        })
    }
  }

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
      className="containerr sectionn flex flex-col gap-8"
    >
      <div className="w-full md:w-3/4 mx-auto flex flex-col gap-3 text-center">
        <h1 className="md:text-4xl font-valorant text-white">
          Stay up to date
        </h1>
        <p className="font-opsans text-white text-[12px] md:text-base mx-auto">
          Sign up for updates. No spam, just exciting stuff from our world of
          Web3 gaming.
        </p>
      </div>
      <div className="flex flex-col gap-3 justify-center h-max">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Enter your email address"
            className="bg-[#3B3A3A] border-y border-l border-white text-white text-[10px] md:text-base p-2 rounded-l-sm w-2/3 md:w-1/2 outline-none focus:ring-0 border-r-0"
            onChange={onChange}
            value={email}
          />
          <div className="h-full" onClick={() => handleSubmit()}>
            {loading ? (
              <button
                className={` h-full bg-button px-3 py-2 md:px-10 md:py-3 rounded-sm font-opsans text-[10px] md:text-xs hover:bg-gradient-to-r from-[#F6B8FC] to-[#E875FC] transition-all`}
              >
                <ClipLoader
                  color={color}
                  loading={loading}
                  cssOverride={override}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            ) : (
              <Button
                text="Subscribe"
                style="rounded-none rounded-r-sm h-[41.33px] font-semibold"
              />
            )}
          </div>
        </div>
        {!isValid && email !== "" && (
          <div className="text-[.8rem]  w-full text-[#f73939] my-1 text-center">
            Invalid Address
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Contact
