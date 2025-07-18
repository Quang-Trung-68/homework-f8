import api from "../plugins/api";

const getTodos = async (endpoint) => {
  try {
    const { data } = await api.get(endpoint);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There are a error when get all todos");
  }
};

const postTodos = async (endpoint, body) => {
  try {
    const { data } = await api.post(endpoint, body);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There are a error when post a todo");
  }
};

const putTodos = async (endpoint, body) => {
  try {
    const { data } = await api.put(`/${endpoint}`, body);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There are a error when update a todo");
  }
};

const deleteTodos = async (endpoint, body) => {
  try {
    const { data } = await api.delete(`/${endpoint}`, body);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("There are a error when delete a todo");
  }
};

export { getTodos, postTodos, putTodos, deleteTodos };
