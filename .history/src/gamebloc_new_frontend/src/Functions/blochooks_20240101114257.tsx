import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useAuth } from "../Auth/use-auth-client";
import {
  addToActiveTournament,
  clearTournaments,
  updateActiveTournament,
} from "../redux/slice/tournamentDataSlice";

export const useFetchAllTournaments = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { whoamiActor, isAuthenticated } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [nodata, setNoData] = useState(false);

  const fetchAllTournaments = async () => {
    if (isAuthenticated) {
      try {
        setIsLoading(true);
        console.log("get tournament was called");
        dispatch(clearTournaments());
        const tour: any = await whoamiActor.get_all_tournament();
        console.log("Tour:", tour);
        if (tour && tour.length !== 0) {
          console.log("went");
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
              users: data.user.map((user) => user),
              winners: data.winers.map((winner) => winner),
            };
            console.log(tournamentData);
            dispatch(addToActiveTournament(tournamentData));
          }
          setIsLoading(false);
        } else {
          setNoData(true);
        }
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("err: User not authenticated");
    }
  };

  return { fetchAllTournaments, loading, nodata };
};

export const useUpdateTournament = () => {
  const { whoamiActor, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [updating, setUpdating] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  const updateTournament = async () => {
    if (isAuthenticated) {
      try {
        setUpdating(true);
        const update: any = await whoamiActor.get_all_tournament();
        if (update && update.length !== 0) {
          console.log("update function working");
          for (const data of update) {
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
              users: data.user.map((user) => user),
              winners: data.winers.map((winner) => winner),
            };
            console.log(tournamentData);
            dispatch(updateActiveTournament(tournamentData));
          }
          setUpdating(false);
        } else {
          setNoData(true);
        }
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setUpdating(false);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  return { updateTournament, updating, setNoData };
};
