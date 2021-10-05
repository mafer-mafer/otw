import axios from "axios";
import history from "../history";

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
      signUpEmail();
    }
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

const signUpEmail = async () => {
  try {
    let data = await axios.post(`/api/mail/send`, {
      subject: "Welcome to K-On The Way!",
      message: "hello mafer",
      email: "",
    });
    console.log(data);
  } catch (error) {
    console.log(error);
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
