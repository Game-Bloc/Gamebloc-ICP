import React from "react"
import Button from "./Button"
// import { useContext } from "react"

interface props {
  setVisible: (arg0: boolean) => void
}
function Header({ setVisible }: props) {
  return (
    <div className=" flex justify-between mt-8 pb-5 px-[5%] border-b border-b-slate-300">
      <img className="w-20 md:w-28" src={`GBLogo.png`} alt="GameBloc Logo" />
      <div onClick={() => setVisible(true)}>
        <Button text="Connect Wallet" />
      </div>
    </div>
  )
}

export default Header
