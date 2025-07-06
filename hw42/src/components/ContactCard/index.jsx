import React, { use } from "react";
import { useDispatch } from "react-redux";
import { deleteContact, getContacts } from "../../store/Contacts";

const ContactCard = ({
  userData,
  isEditing,
  setIsEditing,
  setFormData,
  setOpen,
  setIsLoading,
}) => {
  const cardStyle = {
    width: "320px",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    fontFamily: "sans-serif",
    margin: "0 auto",
  };

  const headerStyle = {
    backgroundColor: "#36c3b7",
    height: "80px",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
    position: "relative",
  };

  const avatarStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid white",
    objectFit: "cover",
    position: "absolute",
    top: "30px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  const buttonContainerStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    display: "flex",
    gap: "8px",
  };

  const buttonStyle = {
    padding: "4px 10px",
    fontSize: "14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  };

  const editButton = {
    ...buttonStyle,
    backgroundColor: "#ffe4b5",
    color: "#d35400",
  };

  const deleteButton = {
    ...buttonStyle,
    backgroundColor: "#fbdcdc",
    color: "#c0392b",
  };

  const contentStyle = {
    marginTop: "70px",
    padding: "0 20px 20px",
    textAlign: "center",
  };

  const nameStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0 2px",
  };

  const titleStyle = {
    fontSize: "14px",
    color: "#36c3b7",
    marginBottom: "12px",
  };

  const descStyle = {
    fontSize: "13px",
    color: "#555",
    marginBottom: "16px",
  };

  const infoStyle = {
    fontSize: "14px",
    color: "#333",
    textAlign: "left",
    margin: "6px 0",
  };

  const iconStyle = {
    marginRight: "8px",
  };

  const iconRowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "16px",
    fontSize: "20px",
  };

  const footerStyle = {
    backgroundColor: "#36c3b7",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    cursor: "pointer",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    fontWeight: "bold",
  };

  const dispatch = useDispatch();

  const onDelete = async () => {
    const confirmDelete = window.confirm(
      `Bạn có chắc chắn muốn xoá liên hệ "${userData.firstName} ${userData.lastName} - ${userData.phone}" này không?`
    );
    if (!confirmDelete) return;
    setIsLoading(true);
    await dispatch(deleteContact(userData.id));
    await dispatch(getContacts());
    setIsLoading(false);
  };

  const onEdit = () => {
    setIsEditing(true);
    setOpen(true);
    setFormData(userData);
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <div style={buttonContainerStyle}>
          <button style={editButton} onClick={() => onEdit()}>
            ✏️ Sửa
          </button>
          <button onClick={() => onDelete()} style={deleteButton}>
            🗑️ Xoá
          </button>
        </div>
        <img style={avatarStyle} src={userData.image} alt="Sophie Mitchell" />
      </div>

      <div style={contentStyle}>
        <div style={nameStyle}>
          {userData.firstName} {userData.lastName}
        </div>
        <div style={titleStyle}>Chief Marketing Officer</div>
        <div style={descStyle}>
          I oversee the planning, development and execution of the company's
          marketing and advertising initiatives.
        </div>

        <div style={infoStyle}>
          📞 <span style={iconStyle}></span> {userData.phone}
        </div>
        <div style={infoStyle}>
          📧 <span style={iconStyle}></span> {userData.email}
        </div>
        <div style={infoStyle}>
          🌐 <span style={iconStyle}></span> www.cloudtech.com
        </div>

        <div style={iconRowStyle}>
          📷 <span>👠</span> <span>💼</span>
        </div>
      </div>

      <div style={footerStyle}>➕ Add to Contacts</div>
    </div>
  );
};

export default ContactCard;
