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
    if (isAuthenticated) {
      try {
        setIsLoading(true)
        // console.log("get tournament was called")
        dispatch(clearTournaments())
        const tour: any = await whoamiActor.get_all_tournament()
        // console.log("Tour:", tour)
        if (tour && tour.length !== 0) {
          console.log("went")
          for (const data of tour) {
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
            }
            // console.log(tournamentData)
            dispatch(addToActiveTournament(tournamentData))
          }
          setIsLoading(false)
        } else {
          setNoData(true)
        }
      } catch (err) {
        console.log("Error:", err)
      } finally {
        setIsLoading(false)
      }
    } else {
      console.log("err: User not authenticated")
    }
  }

  return { fetchAllTournaments, loading, nodata }
}

export const useUpdateTournament = () => {
  const { whoamiActor, isAuthenticated } = useAuth()
  const dispatch = useAppDispatch()
  const [updating, setUpdating] = useState<boolean>(false)
  const [noData, setNoData] = useState<boolean>(false)

  const updateTournament = async () => {
    if (isAuthenticated) {
      try {
        setUpdating(true)
        const update: any = await whoamiActor.get_all_tournament()
        if (update && update.length !== 0) {
          // console.log("update function working")
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
            }
            console.log(tournamentData)
            dispatch(updateActiveTournament(tournamentData))
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
    } else {
      console.log("User not authenticated")
    }
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
