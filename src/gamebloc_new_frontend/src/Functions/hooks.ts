import { useState } from "react"
import { useAuth } from "../Auth/use-auth-client"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import {
  UserProfileState,
  updateUserProfile,
} from "../redux/slice/userProfileSlice"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  IcpBalanceState,
  updateBalance,
  updateICP,
  updateId,
} from "../redux/slice/icpBalanceSlice"
import {
  chatState,
  clearChat,
  pushToChat,
  updateChat,
} from "../redux/slice/chatSlice"
import {
  addTransactions,
  clearTransaction,
} from "../redux/slice/transactionSlice"
import axios from "axios"
import { Principal } from "@dfinity/principal"
import { allNotification } from "../redux/slice/notificationSlice"
import {
  clearBoard,
  LeaderboardState,
  updateLeaderboard,
} from "../redux/slice/leaderboardSlice"
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
  const [updating, setUpdating] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

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

  return {
    updating,
    isLoading,
    setAdmin,
    setTribunal,
  }
}

export default hooks
