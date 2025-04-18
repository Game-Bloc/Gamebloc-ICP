import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { useAuth } from "../Auth/use-auth-client"
import {
  addToActiveTournament,
  clearTournaments,
  updateActiveTournament,
} from "../redux/slice/tournamentDataSlice"
import {
  SquadState,
  addSquad,
  clearSquad,
  updateSquad,
} from "../redux/slice/squadSlice"

export const useFetchAllTournaments = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { whoamiActor2 } = useAuth()
  const [loading, setIsLoading] = useState(false)
  const [nodata, setNoData] = useState(false)

  const fetchAllTournaments = async () => {
    // if (isAuthenticated) {
    try {
      setIsLoading(true)
      // console.log("get tournament was called")
      dispatch(clearTournaments())
      const tour: any = await whoamiActor2.get_all_tournament()
      console.log("Tour:", tour)
      if (tour && tour.length !== 0) {
        const tourArray: any[] = []
        for (const data of tour) {
          const point_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }

          const user_function = (value: any) => {
            return value.map((userArray) =>
              userArray.map((user) => ({
                account_id: user.account_id,
                age: Number(user.age),
                attendance: user.attendance.map(Number),
                canister_id: user.canister_id,
                date: user.date,
                id_hash: user.id_hash,
                is_mod: user.is_mod,
                losses: user.losses.map(Number),
                points: user.points.map((pointArray) =>
                  pointArray.map((pointPair) => [
                    pointPair[0], // Username
                    pointPair[1], // Principal ID
                    {
                      kill_points: Number(pointPair[2].kill_points),
                      total_points: Number(pointPair[2].total_points),
                      position_points: Number(pointPair[2].position_points),
                    },
                  ]),
                ),
                principal_id: user.principal_id,
                referral_id: user.referral_id,
                role: user.role,
                squad_badge: user.squad_badge,
                status: user.status,
                tournaments_created: Number(user.tournaments_created),
                username: user.username,
                wins: Number(user.wins),
              })),
            )
          }

          const squad_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }
          const winners = (value: any) => {
            return value.map((winnerArray) =>
              winnerArray.map((wins) => [
                {
                  amount: Number(wins.amount),
                  position: wins.position,
                  user_account: wins.user_account,
                },
              ]),
            )
          }

          // console.log("convertedPoints", convertedPoints)
          const tournamentData = {
            creator: data.creator,
            creator_id: data.creator_id,
            messages: data.messages.map((message: any) => message),
            end_date: data.end_date,
            entry_prize: data.entry_prize,
            game: data.game,
            game_type: data.game_type,
            id_hash: data.id_hash,
            idx: data.idx,
            no_of_participants: Number(data.no_of_participants),
            no_of_winners: data.no_of_winners,
            squad: data.squad.map((squad: any) => squad),
            starting_date: data.starting_date,
            status: data.status,
            title: data.title,
            total_prize: Number(data.total_prize),
            tournament_rules: data.tournament_rules,
            tournament_variation: data.tournament_variation[0],
            tournament_type: data.tournament_type,
            users: data.user.map((user: any) => user),
            winers: data.winers.map((winner: any) => winner),
            winners: winners(data.winners),
            squad_points: squad_function(data.squad_points),
            user_details: user_function(data.user_details),
            squad_vector_mod_1: squad_function(data.squad_vector_mod_1),
            points_vector_mod_1: point_function(data.points_vector_mod_1),
            squad_vector_mod_2: squad_function(data.squad_vector_mod_2),
            points_vector_mod_2: point_function(data.points_vector_mod_2),
            squad_vector_mod_3: squad_function(data.squad_vector_mod_3),
            points_vector_mod_3: point_function(data.points_vector_mod_3),
            squad_in_game_names: data.squad_in_game_names.map(
              (points: any) => points,
            ),
            in_game_names: data.in_game_names.map((points: any) => points),
            points: point_function(data.points),
            lobbies: data.lobbies.map((points: any) => points),
          }
          // console.log(tournamentData)
          dispatch(addToActiveTournament(tournamentData))
          tourArray.push(tournamentData)
        }
        sessionStorage.setItem("noTournament", "false")
        setIsLoading(false)
      } else {
        setNoData(true)
      }
    } catch (err) {
      sessionStorage.setItem("noTournament", "true")
      console.log("Fetch Error:", err)
    } finally {
      setIsLoading(false)
    }
    // } else {
    //   console.log("err: User not authenticated")
    // }
  }

  return { fetchAllTournaments, loading, nodata }
}

export const useUpdateTournament = () => {
  const {whoamiActor2} = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateTournament = async () => {
    // if (isAuthenticated) {
    try {
      setUpdating(true)
      const update: any = await whoamiActor2.get_all_tournament()
      if (update && update.length !== 0) {
        console.log("update function working")
        console.log("update", update)
        const tourArray: any[] = []
        for (const data of update) {
          const point_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }

          const user_function = (value: any) => {
            return value.map((userArray) =>
              userArray.map((user) => ({
                account_id: user.account_id,
                age: Number(user.age),
                attendance: user.attendance.map(Number),
                canister_id: user.canister_id,
                date: user.date,
                id_hash: user.id_hash,
                is_mod: user.is_mod,
                losses: user.losses.map(Number),
                points: user.points.map((pointArray) =>
                  pointArray.map((pointPair) => [
                    pointPair[0], // Username
                    pointPair[1], // Principal ID
                    {
                      kill_points: Number(pointPair[2].kill_points),
                      total_points: Number(pointPair[2].total_points),
                      position_points: Number(pointPair[2].position_points),
                    },
                  ]),
                ),
                principal_id: user.principal_id,
                referral_id: user.referral_id,
                role: user.role,
                squad_badge: user.squad_badge,
                status: user.status,
                tournaments_created: Number(user.tournaments_created),
                username: user.username,
                wins: Number(user.wins),
              })),
            )
          }

          const squad_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }

          const winners = (value: any) => {
            return value.map((winnerArray) =>
              winnerArray.map((wins) => [
                {
                  amount: Number(wins.amount),
                  position: wins.position,
                  user_account: wins.user_account,
                },
              ]),
            )
          }
          // console.log("user profile", data.user_details[0])
          const tournamentData = {
            creator: data.creator,
            creator_id: data.creator_id,
            messages: data.messages.map((message: any) => message),
            end_date: data.end_date,
            entry_prize: data.entry_prize,
            game: data.game,
            game_type: data.game_type,
            id_hash: data.id_hash,
            idx: data.idx,
            no_of_participants: Number(data.no_of_participants),
            no_of_winners: data.no_of_winners,
            squad: data.squad.map((squad: any) => squad),
            starting_date: data.starting_date,
            status: data.status,
            title: data.title,
            total_prize: Number(data.total_prize),
            tournament_rules: data.tournament_rules,
            tournament_variation: data.tournament_variation[0],
            tournament_type: data.tournament_type,
            users: data.user.map((user: any) => user),
            winers: data.winers.map((winner: any) => winner),
            winners: winners(data.winners),
            user_details: user_function(data.user_details),
            squad_points: squad_function(data.squad_points),
            squad_vector_mod_1: squad_function(data.squad_vector_mod_1),
            points_vector_mod_1: point_function(data.points_vector_mod_1),
            squad_vector_mod_2: squad_function(data.squad_vector_mod_2),
            points_vector_mod_2: point_function(data.points_vector_mod_2),
            squad_vector_mod_3: squad_function(data.squad_vector_mod_3),
            points_vector_mod_3: point_function(data.points_vector_mod_3),
            squad_in_game_names: data.squad_in_game_names.map(
              (points: any) => points,
            ),
            in_game_names: data.in_game_names.map((points: any) => points),
            points: point_function(data.points),
            lobbies: data.lobbies.map((points: any) => points),
          }
          // console.log(tournamentData)
          dispatch(updateActiveTournament(tournamentData))
          tourArray.push(tournamentData)
        }
        sessionStorage.setItem("noTournament", "false")
        setUpdating(false)
      } else {
        setNoData(true)
      }
    } catch (err) {
      sessionStorage.setItem("noTournament", "true")
      console.log("update Error:", err)
    } finally {
      setUpdating(false)
    }
    // } else {
    //   console.log("User not authenticated")
    // }
  }

  return { updateTournament, updating, setNoData }
}
export const useGetTournamentMessages = () => {
  const { whoamiActor2 } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateMessages = async () => {
    // if (isAuthenticated) {
    try {
      setUpdating(true)
      const update: any = await whoamiActor2.get_all_tournament()
      if (update && update.length !== 0) {
        // console.log("message function working")
        for (const data of update) {
          const point_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }

          const squad_function = (value: any) => {
            return value.map((pointsArray) =>
              pointsArray.map((pointPair) => [
                pointPair[0],
                pointPair[1],
                {
                  kill_points: Number(pointPair[2].kill_points),
                  total_points: Number(pointPair[2].total_points),
                  position_points: Number(pointPair[2].position_points),
                },
              ]),
            )
          }
          const tournamentData = {
            creator: data.creator,
            creator_id: data.creator_id,
            messages: data.messages.map((message: any) => message),
            end_date: data.end_date,
            entry_prize: data.entry_prize,
            game: data.game,
            game_type: data.game_type,
            id_hash: data.id_hash,
            idx: data.idx,
            no_of_participants: Number(data.no_of_participants),
            no_of_winners: data.no_of_winners,
            squad: data.squad.map((squad: any) => squad),
            starting_date: data.starting_date,
            status: data.status,
            title: data.title,
            total_prize: Number(data.total_prize),
            tournament_rules: data.tournament_rules,
            tournament_variation: data.tournament_variation[0],
            tournament_type: data.tournament_type,
            users: data.user.map((user: any) => user),
            winers: data.winers.map((winner: any) => winner),
            winners: data.winners,
            squad_points: squad_function(data.squad_points),
            user_details: data.user_details[0],
            squad_vector_mod_1: squad_function(data.squad_vector_mod_1),
            points_vector_mod_1: point_function(data.points_vector_mod_1),
            squad_vector_mod_2: squad_function(data.squad_vector_mod_2),
            points_vector_mod_2: point_function(data.points_vector_mod_2),
            squad_vector_mod_3: squad_function(data.squad_vector_mod_3),
            points_vector_mod_3: point_function(data.points_vector_mod_3),
            squad_in_game_names: data.squad_in_game_names.map(
              (points: any) => points,
            ),
            in_game_names: data.in_game_names.map((points: any) => points),
            points: point_function(data.points),
            lobbies: data.lobbies.map((points: any) => points),
          }
          // console.log(tournamentData)

          dispatch(updateActiveTournament(tournamentData))
        }
        setUpdating(false)
      } else {
        setNoData(true)
      }
    } catch (err) {
      console.log("Error getting messages:", err)
    } finally {
      setUpdating(false)
    }
    // } else {
    //   console.log("User not authenticated")
    // }
  }

  return { updateMessages }
}

export const useGetAllSquad = () => {
  const { whoamiActor2 } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const getAllSquads = async () => {
    try {
      setUpdating(true)
      const fetchSquads: any = await whoamiActor2.get_all_squad()
      dispatch(clearSquad())
      // console.log("All Squads", fetchSquads)
      if (fetchSquads && fetchSquads.length !== 0) {
        for (const data of fetchSquads) {
          const squads: SquadState = {
            id_hash: data.id_hash,
            captain: data.captain,
            status: data.status,
            name: data.name,
            wins: data.wins,
            losses: data.losses[0],
            attendance: data.attendance[0],
            tag: data.tag,
            members: data.members.map((member: string) => member),
            requests: data.requests.map((gamer: string) => gamer),
            points: data.points.map((points: any) => points),
          }
          // console.log("checking squads", squads)
          dispatch(addSquad(squads))
        }
        setUpdating(false)
      } else {
        setNoData(true)
      }
    } catch (err) {
      console.log("Error:", err)
    } finally {
      setUpdating(false)
    }
  }

  return { updating, noData, getAllSquads }
}

export const useUpdateAllSquad = () => {
  const { whoamiActor2 } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateAllSquads = async () => {
    try {
      setUpdating(true)

      const fetchSquads: any = await whoamiActor2.get_all_squad()
      // console.log("update Squads", fetchSquads)
      if (fetchSquads && fetchSquads.length !== 0) {
        for (const data of fetchSquads) {
          const squads: SquadState = {
            id_hash: data.id_hash,
            captain: data.captain,
            status: data.status,
            name: data.name,
            wins: data.wins,
            losses: data.losses[0],
            attendance: data.attendance[0],
            tag: data.tag,
            members: data.members.map((member: string) => member),
            requests: data.requests.map((gamer: string) => gamer),
            points: data.points.map((points: any) => points),
          }
          // console.log("updating squads", squads)
          dispatch(updateSquad(squads))
        }
        setUpdating(false)
      } else {
        setNoData(true)
      }
    } catch (err) {
      console.log("Error:", err)
    } finally {
      setUpdating(false)
    }
  }

  return { updating, noData, updateAllSquads }
}
