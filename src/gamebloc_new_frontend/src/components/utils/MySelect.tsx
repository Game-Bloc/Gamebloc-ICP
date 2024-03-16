import { Select } from "antd"
import React, { useReducer, useState } from "react"
import { INITIAL_STATE, formReducer } from "../../Reducers/formReducer"
import { ACTION_TYPE } from "../../Reducers/postReducerAction"

const MySelect = ({ name, ...rest }) => {
  const [selectedValue, setSelectedValue] = useState("")
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)

  const handleChange = (e) => {
    setSelectedValue(e)
    // Dispatch action with name and selected value
    dispatch({
      type: ACTION_TYPE.CHANGE_INPUT,
      payload: { name: e.target.name, value: e.target.value },
    })
  }

  return <Select {...rest} value={selectedValue} onChange={handleChange} />
}

export default MySelect
