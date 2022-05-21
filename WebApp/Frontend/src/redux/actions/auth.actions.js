import Swal from "sweetalert2";
import { setAuthToken } from "../../api";
import { loginAdmin, myProfile } from "../../api/apiFunctions";
import history from "../../config/history";
import {
  CLEAR_ERRORS,
  LOAD_PROFILE_FAIL,
  LOAD_PROFILE_REQUEST,
  LOAD_PROFILE_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../constants";

export const loginAction = (data) => async (dispatch) => {
  try {
    // dispatch({ type: LOGIN_REQUEST });
    const response = await loginAdmin(data);
    const { token } = response.data;
    dispatch({ type: LOGIN_SUCCESS });
    localStorage.setItem("token", token);
    setAuthToken(token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data,
    });
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Authentication Failed !",
      titleText: error?.response?.data?.message,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

export const loadProfile = () => async (dispatch) => {
  try {
    // dispatch({ type: LOAD_PROFILE_REQUEST });
    const { data } = await myProfile();
    dispatch({ type: LOAD_PROFILE_SUCCESS, payload: data.user });
    localStorage.setItem("isAuthenticated", true);
  } catch (error) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
      payload: error?.response?.data.message,
    });
  }
};

export const logoutAdmin = () => (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    localStorage.getItem("token") && localStorage.removeItem("token");

    localStorage.removeItem("_expiredTime");
    localStorage.removeItem("isAuthenticated");
    dispatch({ type: LOGOUT_SUCCESS });
    setTimeout(() => {
      history.push("/");
    }, 3000);
  } catch (err) {
    dispatch({ type: LOGOUT_FAIL, payload: err.response.data.message });
    Swal.fire({
      position: "center",
      titleText: "Logout Failed",
      icon: "error",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

// export const updateProfile = (formData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PROFILE_REQUEST });
//     const { data } = await updateAdminProfile(formData);
//     dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data?.user });
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Profile Updated",
//       showConfirmButton: false,
//       timer: 1500,
//       width: "300px",
//     });
//     history.push("/admin/profile");
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: UPDATE_PROFILE_FAIL,
//       payload: error.response.data.message,
//     });
//     Swal.fire({
//       position: "center",
//       titleText: "Update Profile Failed",
//       icon: "error",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//     history.push("/admin/profile");
//   }
// };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
