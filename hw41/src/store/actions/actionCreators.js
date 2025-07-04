import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCTS,
} from "./actionTypes.js";
import { v7 } from "uuid";

//  Action Creator ADD
export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: {
    ...product,
    id: v7(),
  },
});

// action creators update
export const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  payload: product,
});
// delete
export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: {
    id,
  },
});
// get all
export const getProducts = () => ({
  type: GET_PRODUCTS,
});
