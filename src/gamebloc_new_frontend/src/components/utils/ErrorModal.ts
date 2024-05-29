import React from "react"
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
const MySwal = withReactContent(Swal)

export const errorPopUp = (errorMsg: string) => {
  MySwal.fire({
    position: "center",
    icon: "error",
    text: errorMsg,
    showConfirmButton: true,
    background: "#01070E",
    color: "#fff",
  })
}
