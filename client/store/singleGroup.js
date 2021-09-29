import axios from "axios";

const SET_SINGLE_GROUP = "SET_SINGLE_GROUP";

export const _setSingleGroup = (singleGroupItems) => {
  return {
    type: SET_SINGLE_GROUP,
    singleGroupItems,
  };
};

export const setSingleGroupItems = (groupId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/items/${userId}/${groupId}`);
      console.log("data is", data);
      dispatch(_setSingleGroup(data));
    } catch (error) {
      console.log("Error fetching groups items via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_GROUP:
      return action.singleGroupItems;
    default:
      return state;
  }
};
