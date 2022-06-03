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

export const loadProfile = () =>
  baseURL.get("/auth/my-profile", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const usersList = () =>
  baseURL.get("/admin/all-users", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const dashboardCounts = () =>
  baseURL.get("/admin/count", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const signUp = (data) => baseURL.post("/auth/signup", data);

export const addMacAddress = (macAddress) =>
  baseURL.post(
    "/macAddress/add",
    { macAddress },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const getAllMacAdresses = () =>
  baseURL.get("/macAddress/getAll", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getDataByMacAddress = (macAddress) =>
  baseURL.post(
    "/mqtt/getData",
    { macAddress },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const removeMacaddress = (macAddress) =>
  baseURL.patch(
    "/macAddress/remove",
    { macAddress },
    {
      headers: {
        "x-access-token": getToken(),
      },
    }
  );

export const getAllUsersMacaddress = () =>
  baseURL.get("/admin/all-macAddress", {
    headers: {
      "x-access-token": getToken(),
    },
  });

export const getAllUsersMqttData = () =>
  baseURL.get("/admin/all-mqttData", {
    headers: {
      "x-access-token": getToken(),
    },
  });
