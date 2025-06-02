import React from "react"
import LoginModalOptions from "./LoginModalOptions"
import { ModalOptionsProps } from "./LoginModalOptions"
import { X } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Props {
  modal: () => void
}
function LoginModal({ modal }: Props) {
  const navigate = useNavigate()
  return (
    <div
      className={`w-screen h-screen bg-[#222226] fixed inset-0 top-0 left-0 z-50 flex justify-center items-center bg-opacity-80 backdrop-blur-sm $`}
    >
      <div className="flex flex-col md:gap-2 p-3 w-max bg-[#151718] rounded-md">
        <div className="w-full flex justify-end" onClick={() => modal()}>
          <X className="text-white cursor-pointer w-3 md:w-5" />
        </div>
        <div className="flex flex-col gap-3 md:gap-8 items-center pt-2 pb-3 md:pb-10 px-5 md:px-9">
          <h1 className="font-opsans font-bold text-[11px] md:text-xl text-white">
            Connect a Wallet
          </h1>
          <div className="flex flex-col gap-5">
            {/* <ConnectKitButton.Custom>
              {({ show }) => {
                if (isConnected) {
                  return (
                    <div onClick={show}>
                      <LoginModalOptions
                        icon={ethereum}
                        text="Disconnect Ethereum Wallet"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div onClick={show}>
                      <LoginModalOptions
                        icon={ethereum}
                        text="Connect with Ethereum Wallet"
                      />
                    </div>
                  );
                }
              }}
            </ConnectKitButton.Custom> */}
            {options.map((option, index) => (
              <LoginModalOptions
                key={index}
                icon={option.icon}
                text={option.text}
                setModal={() => modal()}
              />
            ))}
          </div>
          <p className="font-opsans text-white text-[11px]">
            You can't wait?{" "}
            <span
              className="text-button cursor-pointer"
              onClick={() => {
                modal()
                navigate("/dashboard")
              }}
            >
              Explore Gameboc as Guest
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

const options: ModalOptionsProps[] = [
  {
    icon: `metamask.png`,
    text: "Connect with Metamask",
  },
  {
    icon: `nfid.png`,
    text: "Connect with NFID(Google)",
  },
  {
    icon: `identity.png`,
    text: "Connect with Internet Identity",
  },
]
export default LoginModal
