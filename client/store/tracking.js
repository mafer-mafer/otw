import axios from "axios";
// // const xml2json = require("xml2json");

const GET_TRACKING = "GET_TRACKING";

export const _setTracking = (tracking) => {
  return {
    type: GET_TRACKING,
    tracking,
  };
};

export const setTracking = (trackingNumber) => {
  return async (dispatch) => {
    try {
      // const trackingData = await axios.get(
      //   `http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=<TrackRequest USERID="498PERSO8085"><TrackID ID="${trackingNumber}""></TrackID></TrackRequest>`
      // );
      //return data
      //console.log(trackingData);
      //   dispatch(_setTracking(data));
    } catch (error) {
      console.log("Error getting tracking via thunk");
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_TRACKING:
      return action.trackings;
    default:
      return state;
  }
};
