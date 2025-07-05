import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";

import { getContacts, postContacts } from "./store/Contacts/index.js";

const { dispatch } = store;

// dispatch(
//   postContacts({
//     id: 120,
//     firstName: "Trung",
//     lastName: "Medhurst",
//     email: "terry@example.com",
//     phone: "+63 791 675 8924",
//     image: "https://robohash.org/1.png",
//   })
// );

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
