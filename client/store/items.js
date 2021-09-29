import axios from "axios";
const SET_ITEMS = "SET_ITEMS";
const ADD_ITEM = "ADD_ITEM";
const EDIT_ITEM = "EDIT_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";

export const _setItems = (items) => {
  return {
    type: SET_ITEMS,
    items,
  };
};

export const _addItem = (item) => {
  return {
    type: ADD_ITEM,
    item,
  };
};

export const _editItem = (editedItem) => {
  return {
    type: EDIT_ITEM,
    editedItem,
  };
};

export const _removeItem = (deletedItem) => {
  return {
    type: REMOVE_ITEM,
    deletedItem,
  };
};

export const addItem = (item, orderId) => {
  return async (dispatch) => {
    try {
      const { data: created } = await axios.post(
        `/api/items/new/${orderId}`,
        item
      );
      dispatch(_addItem(created));
    } catch (error) {
      console.log("Error adding new item via thunk");
    }
  };
};

export const editItem = (itemId, item) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/items/${itemId}`, item);
      console.log(data);
      dispatch(_editItem(data));
    } catch (error) {
      console.log("Error editing item via thunk");
    }
  };
};

export const removeItem = (itemId) => {
  return async (dispatch) => {
    try {
      const { data: item } = await axios.delete(`/api/items/${itemId}`);
      dispatch(_removeItem(item));
    } catch (error) {
      console.log("Error deleting Item via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.items;
    case ADD_ITEM:
      return [...state, action.item];
    case EDIT_ITEM: {
      let newState = state.map((item) => {
        if (item.id === action.editedItem.id) {
          return action.editedItem;
        } else {
          return item;
        }
      });
      return [newState];
    }
    case REMOVE_ITEM:
      return state.filter((item) => item.id !== action.deletedItem.id);
    default:
      return state;
  }
};
