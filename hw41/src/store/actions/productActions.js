// Action Types
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

// ✅ VÍ DỤ MẪU - Action Creator cho ADD
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    ...product,
    id: Date.now(), // Tự động tạo ID
    createdAt: new Date().toISOString(),
  },
});

// 🔥 BẠN LÀM: Tạo action creators tương tự cho:
export const updateProduct = (product) => ({
  // TODO: Return object với type UPDATE_PRODUCT và payload là product
  type: UPDATE_PRODUCT,
  payload: product,
});

export const deleteProduct = (id) => ({
  // TODO: Return object với type DELETE_PRODUCT và payload là id
  type: DELETE_PRODUCT,
  payload: {
    id,
  },
});

export const getProducts = () => ({
  // TODO: Return object với type GET_PRODUCTS (không cần payload)
  type: GET_PRODUCTS,
});
