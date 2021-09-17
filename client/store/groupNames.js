import axios from "axios";

const SET_GROUP_NAMES = "SET_GROUP_NAMES";

export const _setGroupNames = (groupNames) => {
  console.log("in dispatch");
  return {
    type: SET_GROUP_NAMES,
    groupNames,
  };
};

export const setGroupNames = (items) => {
  let groupNamesCache = {};
  console.log(items);
  return async (dispatch) => {
    try {
      for (let i = 0; i < items.length; i++) {
        console.log("here");

        let { data } = await axios.get(`/api/groups/name/${items[i].groupId}`, {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        });
        groupNamesCache[item.groupId] = data.name;
      }
      dispatch(_setGroupNames(groupNamesCache));
    } catch (error) {
      console.log("Error fetching item group names via thunk");
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_GROUP_NAMES:
      return action.groupNames;
    default:
      return state;
  }
};
