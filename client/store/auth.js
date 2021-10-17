import axios from "axios";
import history from "../history";
import { welcomeEmail } from "../emails/welcome";
import { userChange } from "../emails/userOrPwChange";

const TOKEN = "token";
const SET_AUTH = "SET_AUTH";

const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (userData, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, userData);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    if (method === "signup") {
      welcomeEmail(userData.username, userData.email);
    }
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const editProfile = (edited, func) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.put(`/auth/editme`, {
      content: {
        edited,
        token,
      },
    });
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    userChange(edited.username, edited.email);
  } catch (error) {
    if (
      error.response.data ===
      "Validation error: Validation isEmail on email failed"
    ) {
      func("Invalid Email");
    } else {
      func(error.response.data);
    }
  }
};

export const editPassword = (currentData, newPW, func) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem(TOKEN);
    const res = await axios.put(`/auth/editpw`, {
      content: {
        currentData,
        newPW,
        token,
      },
    });
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (error) {
    func(error.response.data);
  }
};

export const resetPassword = (email, func) => async (dispatch) => {
  try {
    window.localStorage.removeItem(TOKEN);
    const { data } = await axios.get(`/api/users/${email}`);

    //let link
    //resetPasswordEmail(data.username, email, link);
  } catch (error) {
    func(error.response.data);
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
