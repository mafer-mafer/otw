import axios from "axios";

const SET_GROUP_NAME = "SET_GROUP_NAME";

export const _setGroupName = (groupName) => {
  return {
    type: SET_GROUP_NAME,
    groupName,
  };
};

export const findGroupName = (groupId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/groups/name/${groupId}`);
      console.log("data is", data);
      dispatch(_setGroupName([data]));
    } catch (error) {
      console.log("Error fetching groups items via thunk");
    }
  };
};

export const findAllGroupNames = (items) => {
  return async (dispatch) => {
    try {
      let allNames = [];
      for (let i = 0; i < items.length; i++) {
        const { data } = await axios.get(
          `/api/groups/name/${items[i].groupId}`
        );
        allNames.push(data);
      }
      dispatch(_setGroupName(allNames));
    } catch (error) {
      console.log("Error fetching groups items via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_GROUP_NAME:
      return action.groupName;
    default:
      return state;
  }
};
