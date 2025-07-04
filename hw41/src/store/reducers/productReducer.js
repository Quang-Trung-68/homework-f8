import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
} from "../actions/actionTypes.js";
import { v7  } from "uuid";

const initialState = {
  products: [
    {
      id: v7(),
      name: "iPhone 15",
      price: 999,
      category: "Phone",
      description: "Latest iPhone",
      stock: 50,
    },
    {
      id: v7(),
      name: "Samsung Galaxy S24",
      price: 899,
      category: "Phone",
      description: "Android flagship",
      stock: 30,
    },
    {
      id: v7(),
      name: "MacBook Pro 14",
      price: 1999,
      category: "Laptop",
      description: "Powerful Apple laptop",
      stock: 20,
    },
    {
      id: v7(),
      name: "Dell XPS 13",
      price: 1299,
      category: "Laptop",
      description: "High-end Windows laptop",
      stock: 15,
    },
    {
      id: v7(),
      name: "Sony WH-1000XM5",
      price: 399,
      category: "Headphones",
      description: "Noise-canceling headphones",
      stock: 40,
    },
    {
      id: v7(),
      name: "iPad Air",
      price: 599,
      category: "Tablet",
      description: "Lightweight Apple tablet",
      stock: 25,
    },
    {
      id: v7(),
      name: "Google Pixel 8",
      price: 799,
      category: "Phone",
      description: "Google's flagship phone",
      stock: 35,
    },
    {
      id: v7(),
      name: "Apple Watch Series 9",
      price: 499,
      category: "Wearable",
      description: "Smartwatch from Apple",
      stock: 45,
    },
    {
      id: v7(),
      name: "Lenovo ThinkPad X1",
      price: 1499,
      category: "Laptop",
      description: "Business-grade laptop",
      stock: 10,
    },
    {
      id: v7(),
      name: "Amazon Kindle Paperwhite",
      price: 149,
      category: "E-reader",
      description: "E-ink reading device",
      stock: 60,
    },
  ],
};


const productReducer = (state = initialState, action) => {
  console.log(state);
  switch (action.type) {
    // ADD_PRODUCT case
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    // UPDATE_PRODUCT case
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    // DELETE_PRODUCT case
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
