import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getContacts } from "./store/Contacts/index.js";
import { useEffect, useState } from "react";
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
  const { contacts, isLoading } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    setContactRender(contacts);
  }, [contacts]);

  const [contactsRender, setContactRender] = useState(contacts);
  const onSearchContact = (value) => {
    setContactRender(
      contacts.filter((contact) =>
        (contact.firstName + " " + contact.lastName + " " + contact.email)
          .toLowerCase()
          .includes(value)
      )
    );
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />

      <TextField
        variant="outlined"
        name="searchContact"
        label={"Search by Name, Email..."}
        onChange={(e) => onSearchContact(e.target.value.toLowerCase())}
      />
      <ContactModal
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      {contactsRender.length === 0 && <div>Can not find data...</div>}

      {contactsRender.length !== 0 && (
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
