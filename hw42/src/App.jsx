import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { getContacts, postContacts } from "./store/Contacts/index.js";
import { store } from "./store/index.js";
import { useEffect } from "react";
import ContactCard from "./store/components/ContactCard/index.jsx";
function App() {
  const state = useSelector((state) => state.contacts);
  const dispatch = useDispatch();

  // const getData = async () => {
  //   const { payload } = await dispatch(getContacts());
  //   return payload;
  // };

  // console.log(contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);
  console.log(state);
  // getData();

  return (
    <>
      {state.contacts.map((contact) => {
        return (
          <>
            <ContactCard key={contact.id} firstName={contact.firstName} />
          </>
        );
      })}
    </>
  );
}

export default App;
