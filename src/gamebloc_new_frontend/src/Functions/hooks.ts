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
import { updateBet } from "../redux/slice/wagerSlice"

import { updateKitchenBalance } from "../redux/slice/icpBalanceSlice"
import {
  addAdminTransactions,
  clearTransaction,
} from "../redux/slice/adminTransaction"

// * Local dev
const admin_principal = Principal.fromText("a3shf-5eaaa-aaaaa-qaafa-cai")
// ! Production params
// const _principal = Principal.fromText("6cxww-biaaa-aaaal-adebq-cai")

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
  const [reward, setReward] = useState<any>()
  const [done, setDone] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activateloading, setActivateloading] = useState<boolean>(false)
  const [claimloading, setClaimloading] = useState<boolean>(false)
  const [sending, setIsSending] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)

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
  const getAdminTransaction = async () => {
    try {
      const account = {
        owner: admin_principal,
        subaccount: [],
      }
      const args: any = {
        max_results: BigInt(100),
        start: [],
        account: account,
      }

      const history: any = await indexActor.get_account_transactions(args)
      console.log("admin transaction history:", history.Ok.transactions)

      dispatch(clearTransaction())

      for (const data of history.Ok.transactions) {
        const operation = data.transaction.operation

        let action = ""
        let amount = 0
        let from = ""
        let to = ""

        if (operation.Transfer) {
          // operation.Transfer.from === accountId ? "sent" :
          action = "received"
          amount = Number(operation.Transfer.amount.e8s) / 100000000 // Convert e8s to ICP
          from = operation.Transfer.from
          to = operation.Transfer.to
        } else if (operation.Approve) {
          action = "approve"
          amount = Number(operation.Approve.allowance.e8s) / 100000000 // Convert e8s to ICP
          from = operation.Approve.from
          to = operation.Approve.spender
        }

        const timestampNanos =
          data.transaction.created_at_time?.[0]?.timestamp_nanos || BigInt(0)
        const timestampMillis = Number(timestampNanos / BigInt(1000000))
        const date = new Date(timestampMillis)

        const options: any = {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }
        const formattedDate = date
          .toLocaleString("en-US", options)
          .replace(",", " at")

        const transaction = {
          id: Number(data.id),
          action: action,
          amount: amount,
          from: from,
          to: to,
          date: formattedDate,
        }

        dispatch(addAdminTransactions(transaction))
        console.log("Dispatched admin transaction:", transaction)
      }
    } catch (err) {
      console.log("Error getting admin transaction history:", err)
    }
  }
  const kitchenBalance = async () => {
    try {
      setFetching(true)
      const balance = await whoamiActor.getKitchenBalance()

      if (balance) {
        const value = Object.values(balance)[0]
        const Icp: any = {
          balance: Number(value) / 100000000,
        }
        console.log("Kitchen Balance: ", Icp.balance)
        dispatch(updateKitchenBalance(Icp.balance))
        setFetching(false)
      }
    } catch (err) {
      console.log("Kitchen Balance Error: ", err)
      setFetching(false)
    } finally {
      setFetching(false)
    }
  }

  const getAdminAccID = async (principal_id: string) => {
    const admin_id = Principal.fromText(principal_id)
    try {
      setIsLoading(true)
      const id = whoamiActor.getAccountIdentifier(admin_id)
      console.log("admin_id", id)
      setIsLoading(false)
    } catch (err) {
      console.log("Error getting admin id: ", err)
      setIsLoading(false)
    }
  }

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
    } catch (err) {
      setActivateloading(false)
      console.log("Error allocating Points :", err)
      errorPopUp(errorMsg)
    }
  }

  // BET FUNCTIONS
  const bet = async (
    id: string,
    amount: bigint,
    staker_principal_id: string,
    staker_account_id: string,
    player_principal_id: string,
    route: string,
    successMsg: string,
    errorMsg: string,
  ) => {
    const wager = {
      amount,
      staker_principal_id,
      staker_account_id,
      player_principal_id,
    }
    try {
      setIsLoading(true)
      const wage = await whoamiActor2.add_or_increase_tournament_wager(
        id,
        wager,
      )
      popUp(successMsg, route)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log("Error placing bet :", err)
      errorPopUp(errorMsg)
    }
  }

  const getAllWager = async (id: string) => {
    try {
      const wager = await whoamiActor2.get_all_wagers(id)
      console.log("Wagers", wager)
    } catch (err) {
      console.log("Error getting wager :", err)
    }
  }

  const getUserBet = async (id: string, staker_principal_id: string) => {
    try {
      setUpdating(true)
      const bet = await whoamiActor2.get_wager(id, staker_principal_id)
      if (bet && bet.length !== 0) {
        for (const data of bet) {
          const betData = {
            amount: Number(data.amount),
            player_principal_id: data.player_principal_id,
            staker_account_id: data.staker_account_id,
            staker_principal_id: data.staker_principal_id,
          }
          // console.log("bet data", betData)
          dispatch(updateBet(betData))
        }
      }
      setUpdating(false)
    } catch (err) {
      setUpdating(false)
      console.log("Error getting user bet", err)
    }
  }

  const getExpectedReward = async (id: string, staker_principal_id: string) => {
    try {
      setActivateloading(true)
      const reward = await whoamiActor2.expected_wager_reward(
        id,
        staker_principal_id,
      )
      // console.log("reward:", reward[0])
      setReward(Number(reward[0]))
      setActivateloading(false)
    } catch (err) {
      setActivateloading(false)
      console.log("Error getting reward", err)
    }
  }

  return {
    bet,
    done,
    sending,
    fetching,
    updating,
    isLoading,
    claimloading,
    activateloading,
    reward,
    setAdmin,
    getAdminAccID,
    setTribunal,
    disburseFunds,
    claimToday,
    getMyPoints,
    getMyStreakCount,
    getStreakTime,
    whoami,
    getAllWager,
    allocateUserPoint,
    kitchenBalance,
    getUserBet,
    getExpectedReward,
    getAdminTransaction,
  }
}

export default hooks
