import api from "../plugins/api.js";

const postFormRegister = async (value) => {
  try {
    const { data } = await api.post("master/user/", value);
    return data;
  } catch (error) {
    console.log(error);
    console.log("Error to fetch post");
  }
};


export { postFormRegister}
