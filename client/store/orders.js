import axios from "axios";

const SET_ORDERS = "SET_ORDERS";
const REMOVE_ORDER = "REMOVE_ORDER";

export const _setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

export const _removeOrder = (deletedOrder) => {
  return {
    type: REMOVE_ORDER,
    deletedOrder,
  };
};

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

export const removeOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.delete(`/api/orders/${orderId}`, {
        headers: {
          authorization: window.localStorage.getItem("token"),
        },
      });
      dispatch(_removeOrder(order));
    } catch (error) {
      console.log("Error deleting order via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case REMOVE_ORDER:
      return state.filter((order) => order.id !== action.deletedOrder.id);
    default:
      return state;
  }
};
