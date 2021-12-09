import { RESERVE_USER, CHECK_RESERVE, GET_HOSPITAL, SET_DAY, SET_YEAR_MONTH,
         SET_LOCATION3, SELECT_HOSPITAL, GET_HOSPITAL_VACINE, SELECT_VACINE,
         RESERVE_UPDATE, CANCLE_RESERVE } from './types'

import reserveDataService from "../services/reserve.service"

export const getHospitalList = (location3, date) => async (dispatch) => {
  try {
    const res = await reserveDataService.getHospital({location3, date});

    dispatch ({
      type: GET_HOSPITAL,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getHospitalVacine = (h_id, date) => async (dispatch) => {
  try {
    const res = await reserveDataService.getHospitalVacine(h_id, date);

    dispatch ({
      type: GET_HOSPITAL_VACINE,
      payload: res.data,
    })

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const reserve = (h_id, v_name, time, date, number) => async (dispatch) => {
  try {
    const res = await reserveDataService.reserve({h_id, v_name, time, date, number});

    dispatch ({
      type: RESERVE_USER,
      payload: res.data,
    })

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const reserveUpdate = (reserve_num, h_id, v_name, time, date, number) => async (dispatch) => {
  try {
    const res = await reserveDataService.reserveUpdate(reserve_num, {h_id, v_name, time, date, number});

    dispatch ({
      type: RESERVE_UPDATE,
      payload: res.data,
    })

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getReserve = (first, second) => async (dispatch) => {
  try {
    const res = await reserveDataService.getReserve(first, second);

    dispatch({
      type: CHECK_RESERVE,
      payload: res.data,
    })

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const cancleReserve = (reserve_id) => async (dispatch) => {
  try {
    const res = await reserveDataService.cancleReserve(reserve_id);

    dispatch({
      type: CANCLE_RESERVE,
      payload: res.data,
    })

    return Promise.resolve(res.data);
  } catch(err) {
    return Promise.reject(err);
  }
}

export const setDay = (day) => {
  return {
    type: SET_DAY,
    day: day,
  }
}

export const setYearMonth = (year, month) => {
  return {
    type: SET_YEAR_MONTH,
    year: year,
    month: month,
  }
}

export const setLocation3 = (name) => {
  return {
    type: SET_LOCATION3,
    location3: name,
  }
}

export const selectHospital = (index) => {
  return {
    type: SELECT_HOSPITAL,
    selectedHospital: index,
  }
}

export const selectVacine = (index) => {
  return {
    type: SELECT_VACINE,
    seletedVacine: index,
  }
}