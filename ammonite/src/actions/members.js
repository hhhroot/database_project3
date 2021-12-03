import {
  UPDATE_USER,
  DELETE_USER,
  AUTH_USER,
  CREATE_USER,
  LOGIN_USER,
  INFO_USER,
} from "./types";

import memberDateService from "../services/members.service";

export const createUser = (name, RRN1, RRN2, foreigner, Bdate, gender, phone1, phone2, phone3) => async (dispatch) => {
  try {
      const res = await memberDateService.create({ name, RRN1, RRN2, foreigner, Bdate, gender, phone1, phone2, phone3 });

      dispatch({
          type: CREATE_USER,
          payload: res.data,
      });

      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err);
  }
};

export const loginUser = (name, RRN1, RRN2) => async (dispatch) => {
  try {
      const res = await memberDateService.login({name, RRN1, RRN2});

      dispatch({
          type: LOGIN_USER,
          payload: res.data,
      });

      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err);
  }
};

export const infoUser = () => async (dispatch) => {
  try {
      const res = await memberDateService.get();

      dispatch({
          type: INFO_USER,
          payload: res.data,
      });
      
      return Promise.resolve(res.data);
  } catch (err) {
      return Promise.reject(err);
  }
}

export const updateUser = (name, phone1, phone2, phone3) => async (dispatch) => {
    try{
        const res = await memberDateService.update({name, phone1, phone2, phone3});

        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteUser = () => async (dispatch) => {
    try{
        const res = await memberDateService.delete();
        dispatch({
            type: DELETE_USER,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const authUser = (RRN1, RRN2, name) => async (dispatch) => {
    try{
        const res = await memberDateService.auth({RRN1, RRN2, name});

        dispatch({
            type: AUTH_USER,
            payload: res.data,
        })

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}