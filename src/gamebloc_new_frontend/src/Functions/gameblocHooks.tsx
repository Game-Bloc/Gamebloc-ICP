import { useState } from "react"
import { useAuth } from "../Auth/use-auth-client"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import {
  UserProfileState,
  updateUserProfile,
} from "../redux/slice/userProfileSlice"
import { useAppDispatch } from "../redux/hooks"
import {
  IcpBalanceState,
  updateBalance,
  updateICP,
} from "../redux/slice/icpBalanceSlice"
import { message } from "antd"
// import { AccountIdentifier, SendArgs } from "./ledger.int"

export const useGameblocHooks = () => {
  const { whoamiActor, whoamiActor2, ledgerActor, principal } = useAuth()
  const [noData, setNoData] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAccount, setIsAccount] = useState<boolean>(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false)
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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

  const createAccount = async (
    id_hash: string,
    age: number,
    name: string,
    time: string,
    squad_badge: string,
    successMsg: string,
    errorMsg: string,
    route: any,
  ) => {
    try {
      setIsLoading(true)
      const user = await whoamiActor.createUserProfile(
        id_hash,
        age,
        name,
        time,
        squad_badge,
      )
      if (user) {
        popUp(successMsg, route)
        setIsLoading(false)
        console.log("Account Created")
      } else {
        setIsLoading(false)
        errorPopUp(errorMsg)
      }
    } catch (err) {
      setIsLoading(false)
      console.log("Failed to create an account:", err)
      errorPopUp(errorMsg)
    } finally {
      setIsLoading(false)
      return
    }
  }

  const getICPrice = async () => {
    const response = fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd",
    )
    const getPricePromise: any = (await response).json()
    if (getPricePromise) {
      getPricePromise
        .then((data: any) => {
          const usdValue: number = data["internet-computer"]["usd"]
          const Icp: any = {
            currentICPrice: Number(usdValue),
          }
          dispatch(updateICP(Icp))
          console.log(`The current price of ICP is $${usdValue}`)
        })
        .catch((error) => {
          console.error("Error fetching the price:", error)
        })
    }
  }

  const getProfile = async () => {
    try {
      setIsLoadingProfile(true)
      const user: any = await whoamiActor.getSelf()
      if (user.username != "") {
        setIsAccount(true)
        console.log("user..:", user)
        const profileData: UserProfileState = {
          age: user.age,
          canister_id: user.canister_id,
          date: user.date,
          id_hash: user.id_hash,
          is_mod: false,
          account_id: user.account_id,
          principal_id: user.principal_id,
          squad_badge: user.squad_badge,
          status: { Online: true },
          tournaments_created: user.tournaments_created,
          username: user.username,
          wins: user.wins,
          initializeState: true,
        }
        dispatch(updateUserProfile(profileData))
      } else {
        setIsAccount(false)
        console.log("No account created yet")
      }
    } catch (err) {
      console.log("Error getting profile", err)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const getProfile2 = async () => {
    try {
      const profile = await whoamiActor2.getSelf(principal)
      console.log("Profile - actor2:", profile)
    } catch (err) {
      console.log(err)
    }
  }

  const createTournament = async (
    idx: number,
    id_hash: string,
    status: any,
    creator: string,
    messages: [],
    owner_id: string,
    game: string,
    squad: any,
    user: string[],
    winers: string[],
    total_prize: bigint,
    tournament_rules: string,
    starting_date: string,
    tournament_type: any,
    entry_prize: number,
    no_of_winners: number,
    no_of_participants: bigint,
    game_type: string,
    end_date: string,
    title: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const creator_id: [string] = [owner_id]

      const tournamentData = {
        idx,
        id_hash,
        status: status,
        creator,
        messages,
        creator_id,
        game,
        squad,
        user,
        winers,
        total_prize,
        tournament_rules,
        starting_date,
        tournament_type: tournament_type,
        entry_prize,
        no_of_winners,
        no_of_participants,
        game_type,
        end_date,
        title,
      }
      const create = await whoamiActor.create_tournament(tournamentData)
      if (create) {
        popUp(successMsg, route)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        errorPopUp(errorMsg)
      }
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error creating tournament:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const joinTournament = async (
    name: string,
    id: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const join_tournament = await whoamiActor.join_tournament(name, id)
      setIsLoading(false)
      popUp(successMsg, route)
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error joining tournament:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const createSquad = async (
    id_hash: string,
    captain: string,
    status: any,
    name: string,
    tag: string,
    principal: string,
    requests: string[],
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const members = [
        {
          name: captain,
          principal_id: principal,
        },
      ]
      const squad = {
        tag,
        id_hash,
        status,
        members,
        name,
        captain,
        requests,
      }
      const _squad = await whoamiActor.create_squad(squad)
      if (_squad) {
        popUp(successMsg, route)
        setIsLoading(false)
        window.location.reload()
      } else {
        setIsLoading(false)
        errorPopUp(errorMsg)
      }
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error creating Squad:", err)
    }
  }

  const getICPBalance = async () => {
    try {
      setFetching(true)
      const Balance = await whoamiActor.icp_balance()
      console.log("Balance:", Balance)
      if (Balance) {
        const value = Object.values(Balance)[0]
        const Icp: any = {
          balance: Number(value),
        }
        dispatch(updateBalance(Icp))
        setFetching(false)
      }
    } catch (err) {
      setFetching(false)
      console.log("Error getting Balance:", err)
    } finally {
      setFetching(false)
    }
  }

  const joinSquad = async (
    id: string,
    member: string,
    principal: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const user = {
        name: member,
        principal_id: principal,
      }
      const join = await whoamiActor.join_squad(user, id)
      setIsLoading(false)
      popUp(successMsg, route)
      window.location.reload()
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error joining squad:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const joinTournamentSqaud = async (
    squad_id: string,
    id: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const join = await whoamiActor.join_tournament_with_squad(squad_id, id)
      setIsLoading(false)
      popUp(successMsg, route)
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error joining tournament:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const sendICP = async (
    to: string,
    amount: number,
    created_at_time: any,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    const defaultArgs = {
      fee: BigInt(10_000),
      memo: BigInt(0),
    }
    try {
      setIsLoading(true)

      const timeStamp = {
        timestamp_nanos: BigInt(created_at_time),
      }

      const args: any = {
        to: to,
        amount: { e8s: BigInt(amount * 100000000) },
        fee: { e8s: defaultArgs.fee },
        memo: defaultArgs.memo,
        from_subaccount: [],
        created_at_time: [timeStamp],
      }
      // const tokens = {
      //   e8s: BigInt(amount * 100000000),
      // }

      // const send = await whoamiActor.transferICP(to, tokens, timeStamp)
      const send = await ledgerActor.send_dfx(args)
      if (send) {
        setIsLoading(false)
        popUp(successMsg, route)
      }
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      errorPopUp(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const sendFeedBack = async (
    content: string,
    title: string,
    time: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const feedback = await whoamiActor.send_feedback(content, title, time)
      setIsLoading(false)
      popUp(successMsg, route)
    } catch (err) {
      setIsLoading(false)
      console.log(err)
      errorPopUp(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  const getFeedBacks = async () => {
    try {
      const messages = await whoamiActor.get_all_feedback()
      if (messages) {
        console.log("Feedback:", messages)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const sendTournamentMessage = async (
    id: string,
    name: string,
    time: string,
    message: string,
  ) => {
    try {
      const chat = {
        name,
        time,
        message,
      }
      const send = whoamiActor2.send_message_tournament(id, chat)
    } catch (err) {
      console.log("Error Sending message:", err)
    }
  }

  return {
    isLoading,
    isLoadingProfile,
    updating,
    noData,
    isAccount,
    fetching,
    getICPrice,
    createAccount,
    createTournament,
    getProfile,
    getProfile2,
    joinTournament,
    createSquad,
    getICPBalance,
    joinSquad,
    joinTournamentSqaud,
    sendICP,
    sendFeedBack,
    getFeedBacks,
    sendTournamentMessage,
  }
}
