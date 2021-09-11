const SET_GROUPS;

export const _setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups,
  };
};

export const setGroups = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/groups", {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_setGroups(data));
    } catch (err) {
      console.log("Error fetching all grous via thunk");
    }
  };
};
