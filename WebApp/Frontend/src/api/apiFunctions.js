import axios from "axios";
import { baseURL } from "./index";
import { getToken } from "../redux/localstorage/index";

const token = getToken();
const headerToken = {
  headers: {
    "x-access-token": token,
  },
};

export const loginAdmin = (data) => baseURL.post("/auth/login", data);

export const loadProfile = () => baseURL.get("/auth/my-profile", headerToken);

export const usersList = () => baseURL.get("/admin/all-users", headerToken);

export const dashboardCounts = () => baseURL.get("/admin/count", headerToken);

export const signUp = (data) => baseURL.post("/auth/signup", data);
