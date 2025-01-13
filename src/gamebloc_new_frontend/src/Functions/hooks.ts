import { useState } from "react"
import { useAuth } from "../Auth/use-auth-client"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Principal } from "@dfinity/principal"
import { updatePoint, updateStreak } from "../redux/slice/dailyStreak"

export const hooks = () => {
  const {
    isAuthenticated,
    whoamiActor,
    whoamiActor2,
    ledgerActor,
    indexActor,
    principal,
  } = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const MySwal = withReactContent(Swal)
  const [done, setDone] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activateloading, setActivateloading] = useState<boolean>(false)
  const [claimloading, setClaimloading] = useState<boolean>(false)
  const [sending, setIsSending] = useState<boolean>(false)

  const popUp = (successMsg: string, route: any) => {
    MySwal.fire({
      position: "center",
      icon: "success",
      text: successMsg,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(route)
      }
    })
  }

  const errorPopUp = (errorMsg: string) => {
    MySwal.fire({
      position: "center",
      icon: "error",
      text: errorMsg,
      showConfirmButton: true,
      background: "#01070E",
      color: "#fff",
    })
  }

  // ADMIN HUB FUNCTION

  const setAdmin = async (principal: Principal) => {
    try {
      setUpdating(true)
      await whoamiActor2.set_mod(principal)
      popUp("Principal set as Admin", "")
      setUpdating(false)
    } catch (err) {
      setUpdating(false)
      errorPopUp("Can't set principal as Admin")
      console.log("Can't set principal as Admin", err)
    }
  }

  const setTribunal = async (principal: Principal) => {
    try {
      setIsLoading(true)
      await whoamiActor2.add_mod_to_tribunal(principal)
      popUp("Principal set as Tribunal", "")
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      errorPopUp("Can't set principal as Tribunal Mod")
      console.log("Can't set principal as Tribunal Mod", err)
    }
  }

  const disburseFunds = async (
    id: string,
    icp_price: bigint,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsSending(true)
      console.log("backend icp", icp_price)
      const disburse = await whoamiActor.disbursePayment(id, icp_price)
      console.log("Funds disbursed")
      setIsSending(false)
      setDone(true)
      popUp(successMsg, route)
      console.log("sent")
    } catch (err) {
      setIsSending(false)
      console.log(err)
      errorPopUp(errorMsg)
    }
  }

  // Daily Streak Functions

  const activateDailyClaims = async (
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setActivateloading(true)
      const claim = await whoamiActor.activateDailyClaims()
      const points = await whoamiActor.getMyPoints()
      const streak = await whoamiActor.getMyStreakCount()
      setActivateloading(false)
      popUp(successMsg, route)
    } catch (err) {
      setActivateloading(false)
      console.log(err)
      errorPopUp(errorMsg)
    }
  }

  const claimToday = async (
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setClaimloading(true)
      const claim = await whoamiActor.claimToday()
      const points = await whoamiActor.getMyPoints()
      const streak = await whoamiActor.getMyStreakCount()
      setClaimloading(false)
      popUp(successMsg, route)
    } catch (err) {
      setClaimloading(false)
      console.log(err)
      errorPopUp(errorMsg)
    }
  }

  const getMyPoints = async () => {
    try {
      setIsLoading(true)
      const points = await whoamiActor.getMyPoints()
      const _points = Number(points)
      dispatch(updatePoint({ point: _points }))
      // console.log("my point:", _points)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
    }
  }

  const getMyStreakCount = async () => {
    try {
      setUpdating(true)
      const points = await whoamiActor.getMyStreakCount()
      const _points = Number(points)
      dispatch(updateStreak({ streak: _points }))
      // console.log("my streak:", _points)
      setUpdating(false)
    } catch (err) {
      setUpdating(false)
      console.log(err)
    }
  }

  return {
    done,
    updating,
    isLoading,
    activateloading,
    claimloading,
    sending,
    setAdmin,
    setTribunal,
    disburseFunds,
    activateDailyClaims,
    claimToday,
    getMyPoints,
    getMyStreakCount,
  }
}

export default hooks
