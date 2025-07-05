import { configureStore } from "@reduxjs/toolkit";
import contactsSlice from "./Contacts";

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
  },
});
