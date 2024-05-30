import React, { useState, useEffect } from "react"
import { RiCloseFill } from "react-icons/ri"

type Prop = {
  modal: any
  player: any
  onSave: any
}

const AssignPointsModal = ({ modal, player, onSave }: Prop) => {
  const [kills, setKills] = useState<number>(null)
  const [positionPoints, setPositionPoints] = useState<number>(null)
  const [pointsDeduction, setPointsDeduction] = useState<number>(null)

  useEffect(() => {
    if (player) {
      setKills(player.killPoints)
      setPositionPoints(player.positionPoints)
    }
  }, [player])

  const handleSave = () => {
    onSave({
      kill_points: kills,
      position_points: positionPoints,
      pointsDeduction,
    })
    modal()
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    let value = parseInt(e.target.value)
    console.log("Input value:", value)

    if (isNaN(value)) {
      value = 0 // Set value to 0 if NaN
    }

    if (value < 0) {
      console.log("Value is less than 0. Setting to 0.")
      value = 0 // Set value to 0 if less than 0
    }

    console.log("Final value:", value)

    switch (field) {
      case "kills":
        setKills(value)
        break
      case "positionPoints":
        setPositionPoints(value)
        break
      case "pointsDeduction":
        setPointsDeduction(value)
        break
      default:
        break
    }
  }

  const increaseValue = (field: string) => {
    switch (field) {
      case "kills":
        setKills(kills + 1)
        break
      case "positionPoints":
        setPositionPoints(positionPoints + 1)
        break
      case "pointsDeduction":
        setPointsDeduction(pointsDeduction + 1)
        break
      default:
        break
    }
  }

  const decreaseValue = (field: string) => {
    switch (field) {
      case "kills":
        if (kills !== 0) setKills(kills - 1)
        break
      case "positionPoints":
        if (positionPoints !== 0) setPositionPoints(positionPoints - 1)
        break
      case "pointsDeduction":
        if (pointsDeduction !== 0) setPointsDeduction(pointsDeduction - 1)
        break
      default:
        break
    }
  }

  const calculateTotalPoints = () => {
    return kills + positionPoints - pointsDeduction
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
            <div className="flex items-center justify-center min-h-full">
              <div className="relative  bg-primary-first border border-solid border-[#5041BC] rounded-lg  overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className=" bg-primary-first pt-5 shadow-md pb-4 ">
                  <div className="flex flex-col">
                    <RiCloseFill
                      onClick={() => modal()}
                      className="absolute text-white right-4 text-[1rem] top-4 cursor-pointer"
                    />
                    <div className="px-8 ">
                      <p className="text-white text-base my-3">Player IGN</p>
                      <p className="text-[#999999] text-[.8rem]">
                        {player?.IGN}
                      </p>
                    </div>
                    <div className="my-3 border border-solid border-[#2E3438] w-full" />
                    <div className="px-8  flex flex-col gap-8">
                      <div className="flex justify-between items-center">
                        <p className="text-white text-base my-3">Kills</p>
                        <div className="flex ml-[5rem] items-center gap-2">
                          <img
                            src={`minus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                            onClick={() => decreaseValue("kills")}
                          />
                          <div className="  items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second  bg-[#141414] border-solid border rounded-[3px] flex">
                            <input
                              name="kills"
                              type="number"
                              value={kills}
                              className="border-none w-[3rem] text-white pl-0 flex justify-center items-center focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              onChange={(e) => handleInputChange(e, "kills")}
                            />
                          </div>
                          <img
                            src={`plus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                            onClick={() => increaseValue("kills")}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-white text-base my-3">
                          Position points
                        </p>
                        <div className="flex items-center gap-2">
                          <img
                            src={`minus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                            onClick={() => decreaseValue("positionPoints")}
                          />
                          <div className="  items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second  bg-[#141414] border-solid border rounded-[3px] flex">
                            <input
                              name="positionPoints"
                              type="number"
                              value={positionPoints}
                              className="border-none w-[3rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                              onChange={(e) =>
                                handleInputChange(e, "positionPoints")
                              }
                            />
                          </div>
                          <img
                            src={`plus.png`}
                            className="m-0 cursor-pointer w-[1rem] h-[1rem]"
                            alt=""
                            onClick={() => increaseValue("positionPoints")}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="text-white text-base my-3">
                          Points deduction
                        </p>

                        <div className="  items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second  bg-[#141414] border-solid border rounded-[3px] flex">
                          <input
                            name="pointsDeduction"
                            className="border-none w-[3rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                            placeholder=""
                            type="number"
                            onChange={(e) =>
                              handleInputChange(e, "pointsDeduction")
                            }
                            value={pointsDeduction}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 items-center">
                        <p className="text-white text-base my-3">
                          Total points
                        </p>

                        <div className="ml-[2.3rem] items-center pl-2 h-[2rem] border-primary-second hover:border-primary-second bg-[#141414] border-solid border rounded-[3px] flex">
                          <input
                            className="border-none w-[3rem] text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                            placeholder=""
                            type="number"
                            value={calculateTotalPoints()}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full px-8 mt-4 justify-end">
                      <button
                        className="bg-[#303B9C] py-2 px-4 flex justify-around items-center"
                        onClick={handleSave}
                      >
                        <p className="text-[.85rem] text-white">Done</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignPointsModal
