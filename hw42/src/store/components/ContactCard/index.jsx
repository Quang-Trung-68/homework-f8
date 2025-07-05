const ContactCard = ({ firstName, lastName, email, phone, image }) => {
  return (
    <>
      <button>Sua</button>
      <button>Xoa</button>
      <img src={image} />
      <p>
        {firstName} {lastName}
      </p>
      <p>Info</p>
      <p>Desc</p>
      <p>{phone}</p>
      <p> {email} </p>
      <p>Web</p>
    </>
  );
};

export default ContactCard;
