import React from "react"
import { useAuth } from "../../Auth/use-auth-client"
export interface ModalOptionsProps {
  icon: string
  text: string
  setModal?: () => void
}

function LoginModalOptions({ setModal, icon, text }: ModalOptionsProps) {
  const { login, loginNFID, loginWithMetaMask } = useAuth()
  return (
    <div
      className="border border-button cursor-pointer flex gap-3 justify-start items-center pl-2 pr-7 py-2 md:pl-8 md:pr-28 md:py-5 hover:bg-[#353763] bg-[#222226] rounded-md"
      onClick={() => {
        setModal()
        if (icon === `nfid.png`) {
          loginNFID()
        } else if (icon === `identity.png`) {
          login()
        } else if (icon === `metamask.png`) {
          loginWithMetaMask()
        }
      }}
    >
      <img src={icon} alt="connect icon" className="w-5" />
      <p className="font-opsans font-bold text-[#FBFBFC] text-[10px] md:text-base">
        {text}
      </p>
    </div>
  )
}

export default LoginModalOptions
