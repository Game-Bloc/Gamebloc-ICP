import { useCanister } from "@connect2ic/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

enum Status {
  Online,
  Offline,
}

export const useGameBlocFunction = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [gamebloc] = useCanister("gamebloc")
  const [Initialized, setInitialized] = useState<boolean>(false)

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
    age: number,
    id_hash: string,
    status: any,
    username: string,
    date: string,
    wins: number,
    is_mod: boolean,
    tournaments_created: number,
    successMsg: string,
    errorMsg: string,
    route: any,
  ) => {
    try {
      setIsLoading(true)
      const userProfileData = {
        age: age,
        id_hash: id_hash,
        status: status,
        username: username,
        date: date,
        wins: wins,
        is_mod: is_mod,
        tournaments_created: tournaments_created,
      }
      await gamebloc.create_profile(userProfileData)

      popUp(successMsg, route)
      setIsLoading(false)
      setInitialized(true)
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

  return { initilizeUser, isLoading, getAllUsers }
}
