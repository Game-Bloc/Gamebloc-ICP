import { useCanister } from "@connect2ic/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const useGameBlocFunction = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [gamebloc] = useCanister("gamebloc")

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
      const user = await gamebloc.create_profile(
        age,
        id_hash,
        status,
        username,
        date,
        wins,
        is_mod,
        tournaments_created,
      )

      popUp(successMsg, route)
    } catch (err) {
      console.log("Failed to initialize User:", err)
      errorPopUp(errorMsg)
    } finally {
      setIsLoading(false)
    }
  }

  return { initilizeUser, isLoading }
}
