import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getContacts } from "./store/Contacts/index.js";
import { useEffect, useState } from "react";
import ContactCard from "./components/ContactCard/index.jsx";
import ContactModal from "./components/ContactCard/ContactModal.jsx";
import LoadingOverlay from "./components/LoadingOverlay.jsx";

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
  const [isLoading, setIsLoading] = useState(false);
  const state = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  // console.log(state);

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
    padding: "40px",
  };

  return (
    <>
      <LoadingOverlay isLoading={isLoading} />
      <ContactModal
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setIsLoading={setIsLoading}
      />
      <div style={containerStyle}>
        {state.contacts.map((contact) => {
          return (
            <ContactCard
              key={contact.id}
              setFormData={setFormData}
              setOpen={setOpen}
              userData={contact}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              setIsLoading={setIsLoading}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
