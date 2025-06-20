import api from "../plugins/api.js";

const get = async (endpoint, headers) => {
  try {
    const { data } = await api.get(endpoint, headers);
    return data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.detail);
  }

  return null;
};

const post = async (endpoint, body, headers) => {
  try {
    const { data } = await api.post(endpoint, body, headers);
    return data;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.detail);
  }

  return null;
};

export { get, post };
