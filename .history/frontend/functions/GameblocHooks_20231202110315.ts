import { useCanister } from "@connect2ic/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useAppDispatch } from "../redux/hooks"
import {
  UserProfileState,
  updateUserProfile,
} from "../redux/slice/userProfileSlice"
import { ThunkAction } from "redux-thunk"
import { RootState, AppDispatch } from "../redux/store"
import {
  TournamentState,
  addToActiveTournament,
  clearTournaments,
  updateActiveTournament,
} from "../redux/slice/tournamentDataSlice"
import { AnyAction } from "@reduxjs/toolkit"
import { useFetchAllTournaments } from "./BlocHooks"

export const useGameBlocFunction = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [gamebloc] = useCanister("gamebloc")
  const [noData, setNoData] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const { loading, nodata, fetchAllTournaments } = useFetchAllTournaments()

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

  const initilizeUser = async (
    id_hash: string,
    age: number,
    name: string,
    successMsg: string,
    errorMsg: string,
    route: any,
  ) => {
    try {
      setIsLoading(true)
      const user = await gamebloc.createUserProfile(id_hash, age, name)
      if (user) {
        popUp(successMsg, route)
        setIsLoading(false)
        window.location.reload()
        console.log("Worked")
      } else {
        setIsLoading(false)
        errorPopUp(errorMsg)
      }
    } catch (err) {
      setIsLoading(false)
      console.log("Failed to initialize User:", err)
      errorPopUp(errorMsg)
    } finally {
      setIsLoading(false)
      return
    }
  }

  const getAllUsers = async () => {
    try {
      setIsLoading(true)
      const users = await gamebloc.get_all_user()
      console.log("Users:", users)
    } catch (err) {
      console.log("Error getting all users", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getProfile = async () => {
    try {
      setIsLoading(true)
      const user: any = await gamebloc.getSelf()
      if (user.username != "") {
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
        console.log("Error getting profile")
      }
    } catch (err) {
      console.log("Error getting profile", err)
    } finally {
      setIsLoading(false)
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
    total_prize: number,
    tournament_rules: string,
    starting_date: string,
    no_of_participants: number,
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
      const create = await gamebloc.create_tournament(tournamentData)
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
      console.log("Error adding tournament:", err)
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
      const join_tournament = await gamebloc.join_tournament(name, id)
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

  return {
    initilizeUser,
    isLoading,
    noData,
    updating,
    getAllUsers,
    getProfile,
    createTournament,
    joinTournament,
  }
}
