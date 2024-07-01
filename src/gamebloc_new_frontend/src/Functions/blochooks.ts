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
  const { whoamiActor, isAuthenticated } = useAuth()
  const [loading, setIsLoading] = useState(false)
  const [nodata, setNoData] = useState(false)

  const fetchAllTournaments = async () => {
    // if (isAuthenticated) {
    try {
      setIsLoading(true)
      // console.log("get tournament was called")
      dispatch(clearTournaments())
      const tour: any = await whoamiActor.get_all_tournament()
      // console.log("Tour:", tour)
      if (tour && tour.length !== 0) {
        const tourArray: any[] = []
        for (const data of tour) {
          const convertedPoints = data.points.map((pointsArray) =>
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
            tournament_type: data.tournament_type,
            users: data.user.map((user: any) => user),
            winners: data.winers.map((winner: any) => winner),
            squad_points: data.squad_points.map((points: any) => points),
            squad_in_game_names: data.squad_in_game_names.map(
              (points: any) => points,
            ),
            in_game_names: data.in_game_names.map((points: any) => points),
            points: convertedPoints,
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
      console.log("Error:", err)
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
  const { whoamiActor, isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateTournament = async () => {
    // if (isAuthenticated) {
    try {
      setUpdating(true)
      const update: any = await whoamiActor.get_all_tournament()
      if (update && update.length !== 0) {
        console.log("update function working")
        const tourArray: any[] = []
        for (const data of update) {
          const convertedPoints = data.points.map((pointsArray) =>
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
          // console.log("convertedPoints update", convertedPoints)
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
            tournament_type: data.tournament_type,
            users: data.user.map((user: any) => user),
            winners: data.winers.map((winner: any) => winner),
            squad_points: data.squad_points.map((points: any) => points),
            squad_in_game_names: data.squad_in_game_names.map(
              (points: any) => points,
            ),
            in_game_names: data.in_game_names.map((points: any) => points),
            points: convertedPoints,
            lobbies: data.lobbies.map((points: any) => points),
          }
          console.log(tournamentData)
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
      console.log("Error:", err)
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
  const { whoamiActor, isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateMessages = async () => {
    if (isAuthenticated) {
      try {
        setUpdating(true)
        const update: any = await whoamiActor.get_all_tournament()
        if (update && update.length !== 0) {
          // console.log("message function working")
          for (const data of update) {
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
              tournament_type: data.tournament_type,
              users: data.user.map((user: any) => user),
              winners: data.winers.map((winner: any) => winner),
              squad_points: data.squad_points.map((points: any) => points),
              squad_in_game_names: data.squad_in_game_names.map(
                (points: any) => points,
              ),
              in_game_names: data.in_game_names.map((points: any) => points),
              points: data.points.map((points: any) => points),
              lobbies: data.lobbies.map((points: any) => points),
            }
            console.log(tournamentData)

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
    } else {
      console.log("User not authenticated")
    }
  }

  return { updateMessages }
}

export const useGetAllSquad = () => {
  const { whoamiActor } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const getAllSquads = async () => {
    try {
      setUpdating(true)
      const fetchSquads: any = await whoamiActor.get_all_squad()
      dispatch(clearSquad())
      // console.log("All Squads", fetchSquads)
      if (fetchSquads && fetchSquads.length !== 0) {
        for (const data of fetchSquads) {
          const squads: SquadState = {
            id_hash: data.id_hash,
            captain: data.captain,
            status: data.status,
            name: data.name,
            tag: data.tag,
            members: data.members.map((member: string) => member),
            requests: data.requests.map((gamer: string) => gamer),
            points: data.points.map((points: any) => points),
          }
          console.log("checking squads", squads)
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
  const { whoamiActor } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateAllSquads = async () => {
    try {
      setUpdating(true)

      const fetchSquads: any = await whoamiActor.get_all_squad()
      // console.log("update Squads", fetchSquads)
      if (fetchSquads && fetchSquads.length !== 0) {
        for (const data of fetchSquads) {
          const squads: SquadState = {
            id_hash: data.id_hash,
            captain: data.captain,
            status: data.status,
            name: data.name,
            tag: data.tag,
            members: data.members.map((member: string) => member),
            requests: data.requests.map((gamer: string) => gamer),
            points: data.points.map((points: any) => points),
          }
          console.log("updating squads", squads)
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
