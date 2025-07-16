import axios from "axios";
const baseURL = "https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com";

export const api = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "application/json",
  },
  withCredentials: true,
});


// export const api = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Accept: "application/json",
//   },
//   withCredentials: true,
// });
