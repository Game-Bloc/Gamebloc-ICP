import React, { useEffect, useState } from "react"
import { RiCloseFill } from "react-icons/ri"
import ClipLoader from "react-spinners/ClipLoader"
import { useGameblocHooks } from "../../Functions/gameblocHooks"
import { errorPopUp } from "../utils/ErrorModal"
interface Props {
  modal: () => void
}

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "white",
}

const FeedbackModal = ({ modal }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [content, setContent] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [color, setColor] = useState("#ffffff")
  const { isLoading, sendFeedBack } = useGameblocHooks()

  const generateDate = () => {
    const currentDate = new Date()
    const date =
      currentDate.getDate() +
      "/" +
      (currentDate.getMonth() + 1) +
      "/" +
      currentDate.getFullYear() +
      " @ " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds()
    setDate(date)
  }

  const onTitleChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setTitle(input)
  }
  const onContentChange = (e: any) => {
    e.preventDefault()
    const input = e.target.value
    setContent(input)
  }

  useEffect(() => {
    generateDate()
  }, [])

  const submit = () => {
    if (title.trim() && content.trim() !== "") {
      sendFeedBack(content, title, date, "Submitted", "Failed", "/")
    } else {
      errorPopUp("A field is empty !")
    }
  }

  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-[#fff]/20 bg-opacity-75 transition-opacity">
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full ">
              <div className="relative border-white/10 border border-solid bg-primary-first w-[90%] md:max-w-[55%]  lg:max-w-[40%] 2xl:max-w-[30%] rounded-[25px] overflow-hidden">
                <div className="bg-primary-first  p-[2rem] flex flex-col justify-center items-center">
                  <RiCloseFill
                    onClick={modal}
                    className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                  />
                  <div className="">
                    <img
                      src={`gamelogo.png`}
                      className="mt-3rem mb-[.3rem] w-[3rem] h-[3rem]"
                      alt=""
                    />
                  </div>
                  <h1 className="font-bold mt-4 text-primary-second text-[1.1rem] text-semibold">
                    Send a feedback
                  </h1>

                  <div className="flex flex-col w-[100%] md:w-[80%] mt-4">
                    <p className="text-[.7rem] lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      Title
                    </p>
                    <div className="flex flex-col items-center  h-[2.5rem] border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border border-solid rounded-[8px] w-full">
                      <input
                        className="border-none bg-[transparent] text-white/80 placeholder:text-[0.8rem] placeholder:text-white/80 focus:outline-none focus:ring-0 text-[0.8rem] appearance-none w-full"
                        type="text"
                        placeholder="Title"
                        onChange={onTitleChange}
                        value={title}
                      />
                    </div>
                    <p className="text-[.7rem] mt-8 lg:text-[.82rem]  text-primary-second/80  my-[.2rem]">
                      Description
                    </p>

                    <div className=" mb-4 items-center  border-[#F6B8FC]/30 bg-[#f6b8fc7a]/20 border-solid border rounded-lg flex">
                      <textarea
                        className="r border-none w-full text-white/80 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-white/80  appearance-none text-[0.9rem] bg-[transparent]"
                        placeholder="Description"
                        rows={4}
                        onChange={onContentChange}
                        value={content}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => submit()}
                    className="justify-center w-[10rem] px-6 text-[.6rem] sm:text-base text-black mt-[0.8rem]  sm:mt-[1.5rem] flex bg-primary-second/70 hover:bg-primary-second rounded-[9999px] items-center cursor-pointer py-3"
                  >
                    {isLoading ? (
                      <ClipLoader
                        color={color}
                        loading={isLoading}
                        cssOverride={override}
                        size={10}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackModal
