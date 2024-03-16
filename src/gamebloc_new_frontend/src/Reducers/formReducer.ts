import { ACTION_TYPE } from "./postReducerAction"

export const INITIAL_STATE = {
  poolPrize: "",
  entryPrice: "",
  noOfUsers: 0,
  tournamentType: "",
  variantType: null,
  gameName: "",
  tourType: "",
  title: "",
  tournamentRules: "",
  initialTime: "",
  initialDate: "",
  startingDate: "",
  endDate: "",
  tournamentID: "",
  active: "first",
  openModal: false,
  isImageLoaded: false,
}

export const formReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      }
    case ACTION_TYPE.TOUR_TYPE:
      return {
        ...state,
        tournamentType: action.payload.value,
      }
    case ACTION_TYPE.SET_STATE:
      return {
        ...state,
        tourType: action.payload.tourType,
        variantType: action.payload.variantType,
      }
    case ACTION_TYPE.UPDATE_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      }
    case ACTION_TYPE.GAME_TYPE:
      return {
        ...state,
        [action.payload.placeholder]: action.payload.value,
      }
    default:
      state
  }
}
