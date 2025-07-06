import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../plugins/api";

const getContacts = createAsyncThunk(
  "contacts/get",
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.get("/");
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to get list contacts");
    }
  }
);

const postContacts = createAsyncThunk(
  "contacts/post",
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.post("/", userData);
      return data;
    } catch (error) {
      console.log(error);
      console.log(userData);
      throw new Error("Failed to get post a contact");
    }
  }
);

const putContact = createAsyncThunk(
  "contacts/put",
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.put(`/${userData.id}`, userData);
      return data;
    } catch (error) {
      console.log(error);
      console.log(userData);
      throw new Error("Failed to get put a contact");
    }
  }
);

const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.delete(`/${userData}`);
      return data;
    } catch (error) {
      console.log(error);
      console.log(userData);
      throw new Error("Failed to get delete a contact");
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      console.log("get ok");
      console.log(action.payload);
      state.contacts = action.payload;
      console.log(action);
    });

    builder.addCase(postContacts.fulfilled, (state, action) => {
      console.log("post ok");
      console.log(state);
      console.log(action);
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      console.log("delete ok");
      console.log(state);
      console.log(action);
    });

    builder.addCase(putContact.fulfilled, (state, action) => {
      console.log("put ok");
      console.log(state);
      console.log(action);
    });
  },
});

export { getContacts, postContacts, deleteContact, putContact };
export default contactsSlice.reducer;
