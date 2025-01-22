import { useState } from "react"
import { useAuth } from "../Auth/use-auth-client"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { Principal } from "@dfinity/principal"
import {
  updatePoint,
  updateStreak,
  updateTime,
} from "../redux/slice/dailyStreak"

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

  const claimToday = async (
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setClaimloading(true)
      const claim = await whoamiActor.claimToday()
      setClaimloading(false)
      popUp(successMsg, route)
      window.location.reload()
    } catch (err) {
      setClaimloading(false)
      console.log(err)
      errorPopUp(errorMsg)
    }
  }

  const getMyPoints = async (principal: Principal) => {
    try {
      setIsLoading(true)
      const points = await whoamiActor.get_user_point(principal)
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
      setUpdating(false)
    } catch (err) {
      setUpdating(false)
      console.log(err)
    }
  }

  const getStreakTime = async () => {
    try {
      const time = await whoamiActor.getStreakTime()
      const _time = Number(time)
      dispatch(updateTime({ time: _time }))
      // console.log("streakTime:", _time)
    } catch (err) {
      console.log(err)
    }
  }

  const whoami = async () => {
    try {
      const _whoami = await whoamiActor2.whoami()
      console.log("whoami principal:", _whoami.toText())
    } catch (err) {
      console.log("Whoami Error:", err)
    }
  }

  const allocateUserPoint = async (
    principal: Principal,
    point: any,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setActivateloading(true)
      const allocatePoint = await whoamiActor.allocatePoint(
        principal,
        BigInt(point),
      )
      setActivateloading(false)
      popUp(successMsg, route)
      console.log("Principal:", principal)
      console.log("Point:", point)
      console.log("Points allocated")
    } catch (err) {
      setActivateloading(false)
      console.log("Error allocating Points :", err)
      errorPopUp(errorMsg)
    }
  }

  return {
    done,
    sending,
    updating,
    isLoading,
    claimloading,
    activateloading,
    setAdmin,
    setTribunal,
    disburseFunds,
    claimToday,
    getMyPoints,
    getMyStreakCount,
    getStreakTime,
    whoami,
    allocateUserPoint,
  }
}

export default hooks
