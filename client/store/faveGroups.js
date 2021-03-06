import axios from "axios";

const SET_FAVE_GROUPS = "SET_FAVE_GROUPS";
const ADD_FAVE_GROUP = "ADD_FAVE_GROUP";
const REMOVE_FAVE_GROUP = "REMOVE_FAVE_GROUP";

export const _setFaveGroups = (faveGroups) => {
  return {
    type: SET_FAVE_GROUPS,
    faveGroups,
  };
};

export const _addFaveGroup = (addedFave) => {
  return {
    type: ADD_FAVE_GROUP,
    addedFave,
  };
};

export const _removeFaveGroup = (removedFave) => {
  return {
    type: REMOVE_FAVE_GROUP,
    removedFave,
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

export const addFaveGroup = (groupId, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/groups/${groupId}/${user}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_addFaveGroup(data));
    } catch (error) {
      console.log("Error adding favorite groups via thunk");
    }
  };
};

export const removeFaveGroup = (group, user) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/groups/rmv/${group}/${user}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_removeFaveGroup(data));
    } catch (error) {
      console.log("Error adding favorite groups via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_FAVE_GROUPS:
      return action.faveGroups;
    case ADD_FAVE_GROUP:
      return [...state, action.addedFave];
    case REMOVE_FAVE_GROUP:
      return state.filter((group) => group.id !== action.removedFave.id);
    default:
      return state;
  }
};
