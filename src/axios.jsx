import axios from "axios";

const API = axios.create({
  baseURL: "https://ff-update-backend-6.onrender.com",
});
delete API.defaults.headers.common["Authorization"];
export default API;
