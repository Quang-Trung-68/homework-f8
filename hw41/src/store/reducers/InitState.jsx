import { v7  } from "uuid";

// Demo initState of Products
export  const InitialState = {
  products: [
    {
      id: v7(),
      name: "iPhone 15",
      price: 999,
      category: "Phone",
      description: "Latest iPhone",
      stock: 50,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Samsung Galaxy S24",
      price: 899,
      category: "Phone",
      description: "Android flagship",
      stock: 30,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "MacBook Pro 14",
      price: 1999,
      category: "Laptop",
      description: "Powerful Apple laptop",
      stock: 20,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Dell XPS 13",
      price: 1299,
      category: "Laptop",
      description: "High-end Windows laptop",
      stock: 15,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Sony WH-1000XM5",
      price: 399,
      category: "Headphones",
      description: "Noise-canceling headphones",
      stock: 40,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "iPad Air",
      price: 599,
      category: "Tablet",
      description: "Lightweight Apple tablet",
      stock: 25,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Google Pixel 8",
      price: 799,
      category: "Phone",
      description: "Google's flagship phone",
      stock: 35,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Apple Watch Series 9",
      price: 499,
      category: "Wearable",
      description: "Smartwatch from Apple",
      stock: 45,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Lenovo ThinkPad X1",
      price: 1499,
      category: "Laptop",
      description: "Business-grade laptop",
      stock: 10,
      unit:"Piece"
    },
    {
      id: v7(),
      name: "Amazon Kindle Paperwhite",
      price: 149,
      category: "E-reader",
      description: "E-ink reading device",
      stock: 60,
      unit:"Piece"
    },
  ],
};
