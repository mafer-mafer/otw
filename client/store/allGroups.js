import axios from "axios";

const SET_GROUPS = "SET_GROUPS";

export const _setGroups = (allGroups) => {
  return {
    type: SET_GROUPS,
    allGroups,
  };
};

export const setGroups = (type) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/groups/${type}`);
      dispatch(_setGroups(data));
    } catch (err) {
      console.log("Error fetching all groups via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_GROUPS:
      return action.allGroups;
    // case DELETE_PRODUCT:
    //   return state.filter((product) => product.id !== action.product.id);
    // case CREATE_PRODUCT:
    //   return [...state, action.product];
    default:
      return state;
  }
};
