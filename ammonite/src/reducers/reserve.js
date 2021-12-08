import { RESERVE_USER, CHECK_RESERVE, GET_HOSPITAL, SET_DAY, SET_YEAR_MONTH,
         SET_LOCATION3, SELECT_HOSPITAL, GET_HOSPITAL_VACINE, SELECT_VACINE} from "../actions/types";

// 리덕스에서 관리 할 상태
const initialState = {
  year: 0,
  month: 0,
  day: 0,
  location3: "",
  hospitalList: [],
  selectedHospital: 0,
  vacineList: [],
  seletedVacine: -1,
};

function reserveReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day,
      }

    case SET_YEAR_MONTH:
      return {
        ...state,
        year: action.year,
        month: action.month,
      }

    case SET_LOCATION3:
      return {
        ...state,
        location3: action.location3,
      }

    case GET_HOSPITAL:
      return {
        ...state,
        hospitalList: action.payload.hospitalList,
      }

    case SELECT_HOSPITAL:
      return {
        ...state,
        selectedHospital: action.selectedHospital,
      }

    case GET_HOSPITAL_VACINE:
      return {
        ...state,
        vacineList: action.payload.vacineList,
      }

    case SELECT_VACINE:
      return {
        ...state,
        seletedVacine: action.seletedVacine,
      }

    default:
      return state;
  }
}

export default reserveReducer;