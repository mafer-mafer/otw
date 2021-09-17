import axios from "axios";
import { setGroupNames } from "./groupNames";

const SET_SINGLE_ORDER = "SET_SINGLE_ORDER";
const ADD_NEW_ORDER = "ADD_NEW_ORDER";
const EDIT_ORDER = "EDIT_ORDER";
// const REMOVE_FAVE_GROUP = "REMOVE_FAVE_GROUP";

export const _setSingleOrder = (order) => {
  return {
    type: SET_SINGLE_ORDER,
    order,
  };
};

export const _newOrder = (order) => {
  return {
    type: ADD_NEW_ORDER,
    order,
  };
};

export const _editOrder = (order) => {
  return {
    type: EDIT_ORDER,
    order,
  };
};

// export const _removeFaveGroup = (removedFave) => {
//   return {
//     type: REMOVE_FAVE_GROUP,
//     removedFave,
//   };
// };

export const setSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/single/${id}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_setSingleOrder(data));
      setGroupNames(data.items);
    } catch (error) {
      console.log("Error fetching single order via thunk");
    }
  };
};

export const addNewOrder = (order, user, history) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        `/api/orders/new/${user}`,
        order,
        {
          headers: {
            authorization: window.localStorage.getItem("token"),
          },
        }
      );
      dispatch(_newOrder(created));
      history.push(`/orders/${created.id}`);
    } catch (error) {
      console.log("Error creating new order via thunk");
    }
  };
};

export const editOrder = (orderId, order, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, order, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_editOrder(data));
      history.push(`/orders/${data.id}`);
    } catch (error) {
      console.log("Error editing order via thunk");
    }
  };
};

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

export default (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.order;
    case ADD_NEW_ORDER:
      return action.order;
    case EDIT_ORDER:
      return action.order;
    // case REMOVE_FAVE_GROUP:
    //   return state.filter((group) => group.id !== action.removedFave.id);
    default:
      return state;
  }
};
