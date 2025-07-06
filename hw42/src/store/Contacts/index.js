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
    isLoading: false,
    isLoadingError: false,
  },
  extraReducers: (builder) => {
    // get
    builder.addCase(getContacts.pending, (state, action) => {
      state.isLoading = true;
      console.log("pending get ok");
    });
    builder.addCase(getContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("get ok");
      state.contacts = action.payload;
    });
    builder.addCase(getContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingError = true;
      console.log("reject get");
      state.contacts = action.payload;
    });
    // post
    builder.addCase(postContacts.pending, (state, action) => {
      state.isLoading = true;
      console.log("pending post ok");
    });

    builder.addCase(postContacts.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("post ok");
    });

    builder.addCase(postContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingError = true;
      console.log("reject post");
    });
    // delete
    builder.addCase(deleteContact.pending, (state, action) => {
      state.isLoading = true;
      console.log("pending delete ok");
    });

    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("delete ok");
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingError = true;
      console.log("reject delete");
    });
    // put
    builder.addCase(putContact.pending, (state, action) => {
      state.isLoading = true;
      console.log("pending put ok");
    });
    builder.addCase(putContact.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log("put ok");
    });
    builder.addCase(putContact.rejected, (state, action) => {
      state.isLoading = false;
      state.isLoadingError = true;
      console.log("reject put");
    });
  },
});

export { getContacts, postContacts, deleteContact, putContact };
export default contactsSlice.reducer;
