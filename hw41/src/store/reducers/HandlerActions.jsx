import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionTypes";

export const HandlerActions = {
  handlers: {
    [ADD_PRODUCT]: (state, action) => ({
      ...state,
      products: [...state.products, action.payload],
    }),

    [UPDATE_PRODUCT]: (state, action) => ({
      ...state,
      products: state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      ),
    }),

    [DELETE_PRODUCT]: (state, action) => ({
      ...state,
      products: state.products.filter(
        (product) => product.id !== action.payload.id
      ),
    }),
  },
};
