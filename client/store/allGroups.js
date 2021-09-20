import axios from "axios";

const SET_GROUPS = "SET_GROUPS";

export const _setGroups = (allGroups) => {
  return {
    type: SET_GROUPS,
    allGroups,
  };
};

export const setGroups = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/groups/`);
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
    default:
      return state;
  }
};
