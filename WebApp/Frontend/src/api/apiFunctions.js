import axios from "axios";
import { baseURL } from "./index";

const token = localStorage.getItem("token");
const headerToken = {
  headers: {
    "x-access-token": token,
  },
};

console.log(headerToken);
export const loginAdmin = (data) => baseURL.post("/auth/login", data);

export const myProfile = () => axios.get("/api/auth/my-profile", headerToken);

export const usersList = () => baseURL.get("/admin/all-users", headerToken);

export const dashboardCounts = () => baseURL.get("/admin/count", headerToken);

export const signUp = (data) => baseURL.post("/auth/signup", data);

export const patientsList = (query) =>
  axios.post(
    "/api/patient/all-patients",
    {
      query,
    },
    headerToken
  );
export const appointmentList = (query) =>
  axios.get("/api/appointments/list", headerToken);

export const getPatientId = () =>
  axios.post("/api/patient/pid", {}, headerToken);

export const getAllAttornies = (endPoint) =>
  axios.get(`/api/utilities/${endPoint}`, headerToken);

export const addPatient = (data) =>
  axios.post("/api/patient/new-patient", data, headerToken);

export const updatePatient = (data, id) =>
  axios.patch(`/api/patient/update-patient/${id}`, data, headerToken);

export const addAttorney = (data, endPoint) =>
  axios.post(`/api/utilities/${endPoint}`, data, headerToken);

export const getAllSpecialities = () =>
  axios.get("/api/utilities/specialities", headerToken);

export const getAllSpecialist = () =>
  axios.get("/api/utilities/specialists", headerToken);

export const createAppointment = (data) =>
  axios.post(
    `/api/appointments/create-appointment/${data.type}`,
    data,
    headerToken
  );

export const createSpecialist = (data) =>
  axios.post("/api/utilities/create-specialist", data, headerToken);

export const createSpeciality = (data) =>
  axios.post("/api/utilities/create-speciality", data, headerToken);

export const exportPatientData = (data) =>
  axios.post("/api/utilities/csv", data, headerToken);

export const deleteSpecialist = (id) =>
  axios.delete(`/api/utilities/delete-specialist/${id}`, headerToken);

export const deleteSpeciality = (id) =>
  axios.delete(`/api/utilities/delete-speciality/${id}`, headerToken);

export const updateUtil = (id, name, spt) =>
  axios.patch(
    `/api/utilities/update-util`,
    { _id: id, name, speciality: spt },
    headerToken
  );
