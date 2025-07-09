import api from "../plugins/api.js";

const postFormRegister = async (value) => {
  try {
    const { data } = await api.post("master/user/", value);
    return data;
  } catch (error) {
    console.log(error);
    console.log("Error to fetch post register api");
  }
};

const postFormLogin = async (value) => {
  try {
    const { data } = await api.post("login/", value);
    return data;
  } catch (error) {
    console.log(error);
    console.log("Error to fetch post login api");
  }
};

const getClass = async (accessToken) => {
  try {
    const { data } = await api.get("master/class/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    console.log("Error to fetch get classes api");
  }
};

export { postFormRegister, postFormLogin, getClass };
