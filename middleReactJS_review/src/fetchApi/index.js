import api from "../plugins/api.js";

const getProduct = async () => {
  const data = await api.get("products");
  return data;
};

const postProduct = async () => {
  const data = await api.post("products");
  return data;
};

const putProduct = async (id, value) => {
  const data = await api.put(`products/${id}`, value);
  return data;
};

const deleteProduct = async (id) => {
  const data = await api.delete(`products/${id}`);
  return data;
};

export { getProduct, postProduct, putProduct, deleteProduct };
