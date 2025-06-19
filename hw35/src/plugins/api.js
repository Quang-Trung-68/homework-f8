import axios from "axios";

const api = axios.create({
  baseURL: "https://8fty49z8qb.execute-api.ap-southeast-1.amazonaws.com/",
});

export default api;
