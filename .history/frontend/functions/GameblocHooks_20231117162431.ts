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
import { useAuth } from "../use-auth-client"

export const useGameBlocFunction = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [gamebloc] = useCanister("gamebloc")
  const { whoamiActor } = useAuth()
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

  if (whoamiActor != null) {
    console.log(
      "Profile",
      whoamiActor.getSelf().then((res) => console.log("res", res)),
    )
  }
  console.log("who am ", whoamiActor)

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
      const user = whoamiActor.createUserProfile(id_hash, age, name).then()
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
      const users = await whoamiActor.get_all_user()
      console.log("Users:", users)
    } catch (err) {
      console.log("Error getting all users", err)
    } finally {
      setIsLoading(false)
    }
  }

  const getProfile = async () => {
    try {
      console.log("Actor", whoamiActor)
      const user: any = await whoamiActor.getSelf()
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
    total_prize: any,
    tournament_rules: string,
    starting_date: string,
    no_of_participants: any,
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
      const create = whoamiActor.create_tournament(tournamentData).then()
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

  // const fetchAllTournaments = (): ThunkAction<Promise<void>, RootState, null, AnyAction> => {
  //   console.log("fetchAllTournaments function called");
  //   return  (dispatch, getState) => {
  //     const currentState = getState();
  //
  //       setIsLoading(true);
  //       console.log("works");

  //      const tour = gamebloc.get_all_tournament().then((res: any)=> {
  //         if(res){
  //         if ( res ) {
  //           console.log("res:", res)
  //           for (const data of res) {
  //             const existingTournament = currentState.tournamentData.find(
  //               (t) => t.id_hash === data.id_hash
  //             );

  //             const tournamentData = {
  //               creator: data.creator,
  //               entry_prize: data.entry_prize,
  //               game: data.game,
  //               id_hash: data.id_hash,
  //               idx: data.idx,
  //               no_of_participants: Number(data.no_of_participants),
  //               no_of_winners: data.no_of_winners,
  //               starting_date: data.starting_date,
  //               status: data.status,
  //               total_prize: Number(data.total_prize),
  //               tournament_rules: data.tournament_rules,
  //               tournament_type: data.tournament_type,
  //               users: data.users,
  //               winners: data.winners
  //             };

  //             if (existingTournament) {
  //               dispatch(updateActiveTournament(tournamentData));
  //             } else {
  //               dispatch(addToActiveTournament(tournamentData));
  //             }
  //           }

  //           setIsLoading(false);

  //         } else {
  //           setNoData(true);
  //         }

  //       }}).catch((err) => {
  //         setIsLoading(false);
  //         console.log("Error adding or updating tournament:", err);
  //       }).finally(()=> setIsLoading(false) )

  //      return Promise.resolve()
  //   };
  // };

  // const useFetchAllTournaments = () => {
  //   const dispatch = useAppDispatch();
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [noData, setNoData] = useState(false);

  //   const fetchAllTournaments = async () => {
  //     try {
  //       setIsLoading(true);
  //       console.log("get tournament was called");
  //       const tour: any = await gamebloc.get_all_tournament();

  //       if (tour && tour.length > 0) {
  //         for (const data of tour) {
  //           const tournamentData = {
  //             creator: data.creator,
  //             entry_prize: data.entry_prize,
  //             game: data.game,
  //             id_hash: data.id_hash,
  //             idx: data.idx,
  //             no_of_participants: Number(data.no_of_participants),
  //             no_of_winners: data.no_of_winners,
  //             starting_date: data.starting_date,
  //             status: data.status,
  //             total_prize: Number(data.total_prize),
  //             tournament_rules: data.tournament_rules,
  //             tournament_type: data.tournament_type,
  //             users: data.users,
  //             winners: data.winners,
  //           };
  //           dispatch(addToActiveTournament(tournamentData));
  //         }
  //       } else {
  //         setNoData(true);
  //       }
  //     } catch (err) {
  //       console.log("Error:", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   return { fetchAllTournaments, isLoading, noData };
  // };

  // const updateTournaments = (): ThunkAction<Promise<void>, RootState, null, AnyAction> => {

  //  return async (dispatch, getState) => {
  //     const currentState = getState();
  //
  //     setUpdating(true)
  //       dispatch(clearTournaments())
  //       console.log("updte");

  //      const tour = gamebloc.get_all_tournament().then((res: any)=> {
  //         if(res){
  //         if ( res ) {
  //           console.log("res:", res)
  //           for (const data of res) {
  //             const existingTournament = currentState.tournamentData.find(
  //               (t) => t.id_hash === data.id_hash
  //             );

  //             const tournamentData = {
  //               creator: data.creator,
  //               entry_prize: data.entry_prize,
  //               game: data.game,
  //               id_hash: data.id_hash,
  //               idx: data.idx,
  //               no_of_participants: Number(data.no_of_participants),
  //               no_of_winners: data.no_of_winners,
  //               starting_date: data.starting_date,
  //               status: data.status,
  //               total_prize: Number(data.total_prize),
  //               tournament_rules: data.tournament_rules,
  //               tournament_type: data.tournament_type,
  //               users: data.users,
  //               winners: data.winners
  //             };

  //             if (existingTournament) {
  //               dispatch(updateActiveTournament(tournamentData));
  //             } else {
  //               dispatch(addToActiveTournament(tournamentData));
  //             }
  //           }

  //           setUpdating(false);

  //         }

  //       }}).catch((err) => {
  //         setUpdating(false);
  //         console.log("Error adding or updating tournament:", err);
  //       }).finally(()=> setUpdating(false) )

  //      return Promise.resolve()
  //   };
  // };

  return {
    initilizeUser,
    isLoading,
    noData,
    updating,
    getAllUsers,
    getProfile,
    createTournament,
    // updateTournaments,
  }
}
