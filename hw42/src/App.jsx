import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getContacts } from "./store/Contacts/index.js";
import { useEffect, useState, useMemo, useCallback } from "react";
import ContactCard from "./components/ContactCard/index.jsx";
import ContactModal from "./components/ContactCard/ContactModal.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";
import { TextField } from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState();
  const [searchValue, setSearchValue] = useState("");

  const { contacts, isLoading, isLoadingError } = useSelector(
    (state) => state.contacts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const contactsRender = useMemo(() => {
    if (!searchValue) return contacts;

    return contacts.filter((contact) =>
      (contact.firstName + " " + contact.lastName + " " + contact.email)
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  }, [contacts, searchValue]);

  const onSearchContact = useCallback((value) => {
    setSearchValue(value);
  }, []);

  console.log("App render");

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  };

  if (isLoadingError)
    return (
      <LoadingOverlay isLoading={isLoading} isLoadingError={isLoadingError} />
    );

  return (
    <>
      <LoadingOverlay isLoading={isLoading} isLoadingError={isLoadingError} />

      <TextField
        variant="outlined"
        name="searchContact"
        label={"Search by Name, Email..."}
        onChange={(e) => onSearchContact(e.target.value)}
      />
      <ContactModal
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {contactsRender.length === 0 && (
        <div style={{ fontSize: "20px" }}>Can not find any contact...</div>
      )}
      {!isLoadingError && (
        <div style={containerStyle}>
          {contactsRender.map((contact) => {
            return (
              <ContactCard
                key={contact.id}
                setFormData={setFormData}
                setOpen={setOpen}
                userData={contact}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
