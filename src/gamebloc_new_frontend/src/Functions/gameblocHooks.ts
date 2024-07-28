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
import { message } from "antd"
import {
  chatState,
  clearChat,
  pushToChat,
  updateChat,
} from "../redux/slice/chatSlice"
import { toNamespacedPath } from "path/posix"
import {
  addTransactions,
  clearTransaction,
} from "../redux/slice/transactionSlice"
import axios from "axios"
import { Principal } from "@dfinity/principal"
import { allNotification } from "../redux/slice/notificationSlice"
import { MultiSelect } from "@tremor/react"

export const useGameblocHooks = () => {
  const {
    isAuthenticated,
    whoamiActor,
    whoamiActor2,
    ledgerActor,
    indexActor,
    principal,
  } = useAuth()
  const [noData, setNoData] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isEnding, setIsEnding] = useState<boolean>(false)
  const [isAccount, setIsAccount] = useState<boolean>(false)
  const [isAssigningPoints, setIsAssigningPoints] = useState<boolean>(false)
  const accountId = useAppSelector((state) => state.userProfile.account_id)
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false)
  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)
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
    role: any,
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
        [],
        role,
      )
      if (user) {
        popUp(successMsg, route)
        setIsLoading(false)
        if (window.location.pathname === "/dashboard") {
          window.location.reload()
        }
        sessionStorage.setItem("userState", "true")
        // console.log("Account Created")
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
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd",
      )

      // Extract the price from the response data
      const price = response.data["internet-computer"].usd
      const Icp: any = {
        currentICPrice: Number(price),
      }
      // Set the ICP price in state
      dispatch(updateICP(Icp))
      // console.log(`The current price of ICP is $${price}`)
    } catch (error) {
      console.error("Error fetching ICP price:", error)
    }
  }

  const getPlayers = async () => {
    try {
      const player = await whoamiActor.count_all_users()
      console.log(player)
      sessionStorage.setItem("players", Number(player).toString())
    } catch (err) {
      console.log("Error getting no_of_players")
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
          role: user.role,
          points: [Number(user.points[0])],
          account_id: user.account_id,
          principal_id: user.principal_id,
          squad_badge: user.squad_badge,
          status: { Online: true },
          tournaments_created: user.tournaments_created,
          username: user.username,
          wins: user.wins,
          losses: user.losses[0],
          attendance: user.attendance[0],
          initializeState: true,
        }
        dispatch(updateUserProfile(profileData))
        sessionStorage.setItem("userSession", "true")
      } else {
        setIsAccount(false)
        console.log("No account created yet")
      }
    } catch (err) {
      if (!isAuthenticated) {
        sessionStorage.setItem("userSession", "false")
      }
      console.log("Error getting profile", err)
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const updateProfile = async () => {
    try {
      setUpdatingProfile(true)
      const user: any = await whoamiActor.getSelf()

      const profileData: UserProfileState = {
        age: user.age,
        canister_id: user.canister_id,
        date: user.date,
        id_hash: user.id_hash,
        is_mod: false,
        role: user.role,
        points: [Number(user.points[0])],
        account_id: user.account_id,
        principal_id: user.principal_id,
        squad_badge: user.squad_badge,
        status: { Online: true },
        tournaments_created: user.tournaments_created,
        username: user.username,
        wins: user.wins,
        losses: user.losses[0],
        attendance: user.attendance[0],
        initializeState: true,
      }
      dispatch(updateUserProfile(profileData))
      sessionStorage.setItem("userSession", "true")
      setIsAccount(true)
      console.log("Updating profile")
    } catch (err) {
      if (!isAuthenticated) {
        sessionStorage.setItem("userSession", "false")
      }
      console.log("Error getting profile", err)
    } finally {
      setUpdatingProfile(false)
    }
  }

  const getProfile2 = async () => {
    try {
      const profile = await whoamiActor2.getSelf(principal)
      // console.log("Profile - actor2:", profile)
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
    squad_points: [],
    squad_in_game_names: [],
    in_game_names: [],
    points: [],
    lobbies: [],
    tournament_lobby_type: any,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const creator_id: [string] = [owner_id]

      const tournamentData = {
        id_hash,
        creator,
        creator_id,
        status: status,
        idx,
        starting_date,
        tournament_rules,
        tournament_type: tournament_type,
        game,
        squad,
        squad_in_game_names,
        messages,
        user,
        winers,
        entry_prize,
        total_prize,
        no_of_winners,
        no_of_participants,
        game_type,
        end_date,
        title,
        squad_points,
        points,
        in_game_names,
        tournament_lobby_type,
        lobbies,
      }
      const create = await whoamiActor2.create_tournament(tournamentData)
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
    userId: string,
    playerIgn: string,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const ign: [string, string, string] = [name, userId, playerIgn]
      const join_tournament = await whoamiActor.join_tournament(name, id, ign)
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
    points: [],
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

      const wins: any = []
      const losses: any = []
      const attendance: any = []

      const squad = {
        tag,
        id_hash,
        status,
        members,
        name,
        wins,
        losses,
        attendance,
        captain,
        requests,
        points,
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
          balance: Number(value) / 100000000,
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
      popUp(successMsg, route)
      setIsLoading(false)
      window.location.reload()
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error joining squad:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const leaveSquad = async (
    id: string,
    principal: Principal,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      await whoamiActor2.leave_or_remove_squad_member(principal, id)
      setIsLoading(false)
      popUp(successMsg, route)
      window.location.reload()
    } catch (err) {
      errorPopUp(errorMsg)
      setIsLoading(false)
      console.log("Error removing member:", err)
    }
  }

  const joinTournamentSqaud = async (
    squad_id: string,
    id: string,
    igns: [string, string, string][],
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const join = await whoamiActor.join_tournament_with_squad(
        squad_id,
        id,
        igns,
        [],
      )
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
    _principal: any,
    date: string,
    notification_id: number,
    username,
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
        created_at_time: [],
      }
      const tokens = {
        e8s: BigInt(amount * 100000000),
      }

      // const send = await whoamiActor.transferICP(to, tokens, timeStamp)
      const send = await ledgerActor.send_dfx(args)
      if (send) {
        notify(
          "Withdrawal Successful",
          `You have successfully withdrawn ${amount} ICP from your account.`,
          _principal,
          date,
          BigInt(notification_id),
          username,
        )
        console.log("notify sent")
        setIsLoading(false)
        popUp(successMsg, route)
        setInterval(() => {
          window.location.reload()
        }, 2000)
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
    chatId: string,
    name: string,
    time: string,
    message: string,
  ) => {
    try {
      const chat = {
        id: chatId,
        name,
        time,
        message,
      }
      const send = whoamiActor2.send_message_tournament(id, chat)
    } catch (err) {
      console.log("Error Sending message:", err)
    }
  }

  const sendChatMessage = async (
    body: string,
    time: string,
    username: string,
    f_id: string,
  ) => {
    try {
      const message = await whoamiActor.sendMessage(body, time, username, f_id)
      if (message) {
        console.log("Success message")
      }
    } catch (err) {
      console.log("Error Sending message:", err)
    }
  }

  const getChatmessage = async (value: number) => {
    let num = BigInt(value)
    try {
      const messages = await whoamiActor.getUpdatedMessages(num)
      if (messages) {
        // console.log("chat fetched", messages)
        for (const data of messages) {
          const chats = {
            message: {
              body: data.body,
              f_id: data.f_id,
              sender: data.sender.toString(),
              id: Number(data.id),
              time: data.time,
              username: data.username,
            },
            isTyping: false,
          }
          dispatch(pushToChat(chats))
        }
      }
    } catch (err) {
      console.log("Error getting message:", err)
    }
  }
  const updateChatmessage = async (value: number) => {
    let num = BigInt(value)
    try {
      const messages = await whoamiActor.getAllMessages()
      // dispatch(clearChat())
      if (messages) {
        for (const data of messages) {
          const chats = {
            message: {
              body: data[1].body,
              f_id: data[1].f_id,
              sender: data[1].sender.toString(),
              id: Number(data[1].id),
              time: data[1].time,
              username: data[1].username,
            },
            isTyping: false,
          }
          dispatch(updateChat(chats))
        }
      }
    } catch (err) {
      console.log("Error getting message:", err)
    }
  }

  const isAdmin = async (msg: string, route: string) => {
    try {
      setIsLoading(true)
      const admin = await whoamiActor.is_mod(principal)
      if (admin) {
        popUp(msg, route)
        return true
      } else {
        errorPopUp("You are not an Admin!")
        return false
      }
    } catch (err) {
      setIsLoading(false)
      console.log("Error getting Admin state:", err)
      errorPopUp("You are not an Admin!")
      window.location.replace("/admin-login")
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactions = async (accountIdentifier: string) => {
    try {
      const account = {
        owner: principal,
        subaccount: [],
      }
      const args: any = {
        max_results: BigInt(100),
        start: [],
        account: account,
      }
      const history: any = await indexActor.get_account_transactions(args)
      console.log("Transaction History:", history.Ok.transactions)
      console.log(
        history.Ok.transactions.map(
          (i) => i.transaction.operation.Transfer.amount.e8s,
        ),
      )

      if (history) {
        dispatch(clearTransaction())
        for (const data of history.Ok.transactions) {
          const action = data.transaction.operation.Transfer.from == accountId
          const timestampNanos = BigInt(
            Number(data.transaction.created_at_time[0].timestamp_nanos),
          )
          const timestampMillis = Number(timestampNanos / BigInt(1000000))

          const date = new Date(timestampMillis)

          // Format the date
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
            action: action ? "sent" : "received",
            amount:
              Number(data.transaction.operation.Transfer.amount.e8s) /
              100000000,
            from: data.transaction.operation.Transfer.from,
            to: data.transaction.operation.Transfer.to,
            date: formattedDate,
          }
          dispatch(addTransactions(transaction))
          console.log(transaction)
        }
      }
    } catch (err) {
      console.log("Error getting transaction history:", err)
    }
  }

  // Notification functions

  const notify = async (
    body: string,
    title: string,
    principal: Principal,
    date: string,
    id: bigint,
    username: string,
  ) => {
    try {
      await whoamiActor.notify(title, body, principal, date, id, username)
      console.log("Notification created")
    } catch (err) {
      console.log("Error creating notification", err)
    }
  }

  const getMyNotifications = async (principal: Principal) => {
    try {
      const notifications: any = await whoamiActor.get_my_notifications(
        principal,
      )
      if (notifications) {
        for (const data of notifications) {
          for (const notification of data.notifications) {
            const notifi = {
              body: notification.body,
              date: notification.date,
              id: Number(notification.id),
              read: notification.read,
              title: notification.title,
              username: notification.username,
            }
            dispatch(allNotification(notifi))
            // console.log("notif", notifi)
          }
        }
        console.log("went")
      }
      // console.log("Noti :", notifications)
    } catch (err) {
      console.log("Error getting notifications", err)
    }
  }

  const getNotificationId = async (principal: Principal) => {
    try {
      const id: any = await whoamiActor.get_notification_id(principal)
      const _id: any = {
        id: Number(id),
      }
      dispatch(updateId(_id))
      console.log("Noti :", id)
    } catch (err) {
      console.log("Error getting notification id", err)
    }
  }

  const markAsRead = async (principal: Principal, id: bigint) => {
    try {
      const read = await whoamiActor.read_notification(principal, id)
      if (read) {
        console.log("Message marked as read")
      }
    } catch (err) {
      console.log("Error marking message as read", err)
    }
  }

  // ADMIN TOURNAMENT FUNCTIONS

  const multiSelect_user_profile = async (principal: Principal) => {
    try {
      setIsLoading(true)
      const user = await whoamiActor2.getSelf(principal)
      console.log("user", user)
      setIsLoading(false)
    } catch (err) {
      console.log("error getting profile", err)
      setIsLoading(false)
    }
  }

  const archive_tournament = async (
    id: string,
    success: string,
    error: string,
    route,
  ) => {
    try {
      setUpdating(true)
      await whoamiActor2.archive_tournament(id)
      popUp(success, route)
    } catch (err) {
      errorPopUp(error)
      console.log("error archiving tournament", err)
      setUpdating(false)
    }
  }

  const start_tournament = async (id: string) => {
    try {
      await whoamiActor2.start_tournament(id)
      console.log("Tournament successfully started")
    } catch (err) {
      console.log("error startinng tournament", err)
    }
  }

  const end_tournament = async (
    id: string,
    principal_id: Principal,
    no_of_winners: number,
    success: string,
    error: string,
    route,
  ) => {
    try {
      setIsEnding(true)
      await whoamiActor2.test_end_tournament(id, principal_id, no_of_winners)
      setIsEnding(false)
      popUp(success, route)
      console.log("Tournament Ended")
    } catch (error) {
      console.log("error ending tournament", error)
      errorPopUp(error)
      setIsEnding(false)
    }
  }

  const assign_solo_point = async (
    tournament_id: string,
    principal: Principal,
    user_id_and_points: any[],
    success: string,
    error: string,
    route,
  ) => {
    try {
      setIsLoading(true)
      const action = await whoamiActor2.assign_solo_points(
        tournament_id,
        user_id_and_points,
        principal,
      )

      popUp(success, route)
      window.location.reload()
    } catch (err) {
      errorPopUp(error)
      setIsLoading(false)
      console.log("Error assigning points:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const assign_squad_point = async (
    tournament_id: string,
    principal: Principal,
    user_id_and_points: any[],
    squad_id_and_points: any[],
    success: string,
    error: string,
    route,
  ) => {
    try {
      setIsAssigningPoints(true)

      await whoamiActor2.assign_squad_points(
        tournament_id,
        squad_id_and_points,
        principal,
      )
      assign_solo_point(
        tournament_id,
        principal,
        user_id_and_points,
        success,
        error,
        route,
      )
      console.log("Assigned")
      setIsAssigningPoints(false)
      popUp(success, route)
    } catch (err) {
      errorPopUp(error)
      setIsAssigningPoints(false)
      console.log("Error assigning points:", err)
    }
  }

  return {
    isLoading,
    isLoadingProfile,
    updating,
    noData,
    isAccount,
    fetching,
    isEnding,
    isAssigningPoints,
    isAdmin,
    updatingProfile,
    updateProfile,
    getPlayers,
    getTransactions,
    getICPrice,
    createAccount,
    createTournament,
    getProfile,
    getProfile2,
    joinTournament,
    createSquad,
    getICPBalance,
    joinSquad,
    leaveSquad,
    joinTournamentSqaud,
    sendICP,
    sendFeedBack,
    getFeedBacks,
    sendTournamentMessage,
    sendChatMessage,
    getChatmessage,
    updateChatmessage,
    notify,
    getMyNotifications,
    getNotificationId,
    markAsRead,
    assign_solo_point,
    multiSelect_user_profile,
    assign_squad_point,
    archive_tournament,
    start_tournament,
    end_tournament,
  }
}
