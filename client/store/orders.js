import axios from "axios";

const SET_ORDERS = "SET_ORDERS";
// const ADD_FAVE_GROUP = "ADD_FAVE_GROUP";
// const REMOVE_FAVE_GROUP = "REMOVE_FAVE_GROUP";

export const _setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

// export const _addFaveGroup = (addedFave) => {
//   return {
//     type: ADD_FAVE_GROUP,
//     addedFave,
//   };
// };

// export const _removeFaveGroup = (removedFave) => {
//   return {
//     type: REMOVE_FAVE_GROUP,
//     removedFave,
//   };
// };

export const setOrders = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_setOrders(data));
    } catch (error) {
      console.log("Error fetching orders via thunk");
    }
  };
};

// export const addFaveGroup = (group, user) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.put(`/api/groups/${group}/${user}`, {
//         headers: {
//           authorization: window.localStorage.getItem("token"),
//         },
//       });
//       dispatch(_addFaveGroup(data));
//     } catch (error) {
//       console.log("Error adding favorite groups via thunk");
//     }
//   };
// };

// export const removeFaveGroup = (group, user) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await axios.put(`/api/groups/rmv/${group}/${user}`, {
//         headers: {
//           authorization: window.localStorage.getItem("token"),
//         },
//       });
//       dispatch(_removeFaveGroup(data));
//     } catch (error) {
//       console.log("Error adding favorite groups via thunk");
//     }
//   };
// };

export default (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    // case ADD_FAVE_GROUP:
    //   return [...state, action.addedFave];
    // case REMOVE_FAVE_GROUP:
    //   return state.filter((group) => group.id !== action.removedFave.id);
    default:
      return state;
  }
};
