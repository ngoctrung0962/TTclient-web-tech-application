
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";
import Storagekey from "../constants/storagekey";
import { loginFailure, loginStart, loginSuccess, RegisterStart } from "./userRedux";



export const register = async (dispatch, data) => {
  dispatch(RegisterStart());
  try {
    const res = await userApi.register(data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
