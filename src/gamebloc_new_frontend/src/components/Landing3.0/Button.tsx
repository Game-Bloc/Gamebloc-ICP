import React from "react"

interface Props {
  text: string | undefined
  style?: string
}
function Button({ text, style }: Props) {
  return (
    <button
      className={`bg-button px-3 py-2 md:px-10 md:py-3 rounded-sm font-opsans text-[10px] md:text-xs hover:bg-gradient-to-r from-[#F6B8FC] to-[#E875FC] transition-all ${style}`}
    >
      {text}
    </button>
  )
}

export default Button
