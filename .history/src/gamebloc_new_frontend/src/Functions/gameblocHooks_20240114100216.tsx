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

export const useGameblocHooks = () => {
  const { whoamiActor } = useAuth()
  const [noData, setNoData] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
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
      title: successMsg,
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
      title: errorMsg,
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
          principal_id: user.principal_id,
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

  const createTournament = async (
    idx: number,
    id_hash: string,
    status: any,
    creator: string,
    game: string,
    user: string[],
    winers: string[],
    total_prize: bigint,
    tournament_rules: string,
    starting_date: string,
    no_of_participants: bigint,
    no_of_winners: number,
    tournament_type: any,
    entry_prize: number,
    successMsg: string,
    errorMsg: string,
    route: string,
  ) => {
    try {
      setIsLoading(true)
      const tournamentData = {
        idx,
        id_hash,
        status: status,
        creator,
        game,
        user,
        winers,
        total_prize,
        tournament_rules,
        starting_date,
        no_of_participants,
        no_of_winners,
        tournament_type: tournament_type,
        entry_prize,
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

  return {
    isLoading,
    isLoadingProfile,
    updating,
    noData,
    isAccount,
    createAccount,
    createTournament,
    getProfile,
  }
}
