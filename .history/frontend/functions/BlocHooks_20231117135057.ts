import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import {
  addToActiveTournament,
  clearTournaments,
} from "../redux/slice/tournamentDataSlice"
import { useAuth } from "../use-auth-client"

export const useFetchAllTournaments = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const [gamebloc] = useCanister("gamebloc")
  const [loading, setIsLoading] = useState(false)
  const [nodata, setNoData] = useState(false)
  // const { isConnected } = useConnect()
  const { isAuthenticated, whoamiActor } = useAuth()

  const fetchAllTournaments = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true)
        console.log("get tournament was called")
        dispatch(clearTournaments())
        const tour: any = await whoamiActor.get_all_tournament()
        console.log("Tour:", tour)
        if (tour) {
          console.log("went")
          for (const data of tour) {
            const tournamentData = {
              creator: data.creator,
              entry_prize: data.entry_prize,
              game: data.game,
              id_hash: data.id_hash,
              idx: data.idx,
              no_of_participants: Number(data.no_of_participants),
              no_of_winners: data.no_of_winners,
              starting_date: data.starting_date,
              status: data.status,
              total_prize: Number(data.total_prize),
              tournament_rules: data.tournament_rules,
              tournament_type: data.tournament_type,
              users: data.users,
              winners: data.winners,
            }
            console.log(tournamentData)
            dispatch(addToActiveTournament(tournamentData))
          }
          setIsLoading(false)
        } else if (tour.length == 0) {
          setNoData(true)
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
