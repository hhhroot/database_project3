import {
  UPDATE_USER,
  DELETE_USER,
  GET_USER,
  GET_ALL_USER,
  CREATE_USER,
} from "../actions/types";

// 리덕스에서 관리 할 상태
const initialState = [];

function memberReducer(members = initialState, action) {
  const { type, payload } = action;

  switch (type) {
      case CREATE_USER:
          return [...members, payload];

      case UPDATE_USER:
          return members.map((member) => {
              if (member.username === payload.username) {
                  return {
                      ...member,
                      ...payload,
                  };
              } else {
                  return member;
              }
          });

      case DELETE_USER:
          return members.filter(({ username }) => username !== payload.username);

      default:
          return members;
  }
}

export default memberReducer;