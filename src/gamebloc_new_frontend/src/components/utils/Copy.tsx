import React, { useRef, useState } from "react"
import copy from "clipboard-copy"

const CopyToClipboardButton = ({ textToCopy }) => {
  const [toolTip, setToolTip] = useState<boolean>(false)
  const textRef = useRef()

  const handleCopyClick = async () => {
    try {
      await copy(textToCopy)
      console.log("Text copied to clipboard:", textToCopy)
    } catch (err) {
      console.error("Copy to clipboard failed:", err)
    }
  }

  const update = setTimeout(() => {
    setToolTip(false)
  }, 3000)

  return (
    <div className="relative flex ">
      <button
        ref={textRef}
        onClick={() => {
          handleCopyClick()
          setToolTip(true)
          update
        }}
        className="bg-[#0D101A] cursor-pointer rounded-tl-[.375rem] rounded-bl-[.375rem] flex  justify-center  w-[2.7rem]  items-center"
      >
        <img src={`copy.svg`} className=" w-4 h-4 m-0" alt="" />
      </button>
      {toolTip && (
        <span className="bg-white/10 flex justify-center items-center w-[3.5rem] absolute rounded-lg -bottom-[2rem] text-white p-1 text-[.7rem]">
          Copied !
        </span>
      )}
    </div>
  )
}

export default CopyToClipboardButton
