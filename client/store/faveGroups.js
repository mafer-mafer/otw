import axios from "axios";

const SET_FAVE_GROUPS = "SET_FAVE_GROUPS";

export const _setFaveGroups = (faveGroups) => {
  return {
    type: SET_FAVE_GROUPS,
    faveGroups,
  };
};

export const setFaveGroups = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/groups`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      const groups = data.groups;
      dispatch(_setFaveGroups(groups));
    } catch (error) {
      console.log("Error fetching favorite groups via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_FAVE_GROUPS:
      return action.faveGroups;
    // case DELETE_PRODUCT:
    //   return state.filter((product) => product.id !== action.product.id);
    // case CREATE_PRODUCT:
    //   return [...state, action.product];
    default:
      return state;
  }
};
