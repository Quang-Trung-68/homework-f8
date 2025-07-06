import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { putContact, postContacts, getContacts } from "../../store/Contacts";
import UpLoad from "../UpLoad";

import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().nonempty("Vui lòng nhập tên"),
  lastName: z.string().nonempty("Vui lòng nhập họ"),
  phone: z
    .string()
    .nonempty("Vui lòng nhập số điện thoại")
    .regex(/^\d+$/, "Chỉ được chứa số")
    .min(9, "Số quá ngắn")
    .max(11, "Số quá dài"),
  email: z.string().nonempty("Vui lòng nhập email").email("Email không hợp lệ"),
  image: z
    .string()
    .nonempty("Vui lòng nhập URL ảnh")
    .url("URL ảnh không hợp lệ"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

export default function ContactModal({
  open,
  setOpen,
  formData,
  setFormData,
  isEditing,
  setIsEditing,
}) {
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      image: "",
    });
    setErrors({});
    setOpen(false);
    setIsEditing(false);
  };

  const [errors, setErrors] = useState({});

  const onChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  React.useEffect(() => {
    setErrors({});
  }, [formData]);

  const onSave = async () => {
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      console.log(fieldErrors);
      setErrors(fieldErrors);
      return;
    }
    handleClose();
    await dispatch(postContacts(formData));
    await dispatch(getContacts());
  };

  const onSaveEdit = async () => {
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    handleClose();
    await dispatch(putContact(formData));
    await dispatch(getContacts());
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" onClick={handleOpen}>
          ADD CONTACT
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, mb: 3, fontSize: "24px", fontWeight: "bold" }}
          >
            {!isEditing ? "Add " : "Edit "}
            Contact
          </Typography>
          <TextField
            id="outlined-firstName"
            label="First Name"
            variant="outlined"
            name="firstName"
            sx={{ m: 1 }}
            value={formData.firstName}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            error={errors.firstName}
            helperText={errors.firstName?.join(", ")}
          />
          <TextField
            name="lastName"
            id="outlined-lastName"
            label="Last Name"
            variant="outlined"
            sx={{ m: 1 }}
            value={formData.lastName}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            error={errors.lastName}
            helperText={errors.lastName?.join(", ")}
          />
          <TextField
            name="email"
            id="outlined-email"
            label="Email"
            variant="outlined"
            sx={{ m: 1 }}
            value={formData.email}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            error={errors.email}
            helperText={errors.email?.join(", ")}
          />
          <TextField
            name="phone"
            id="outlined-phone"
            label="Phone"
            variant="outlined"
            sx={{ m: 1 }}
            value={formData.phone}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            error={errors.phone}
            helperText={errors.phone?.join(", ")}
          />

          {/* test upload */}
          <UpLoad formData={formData} setFormData={setFormData} />
          <TextField
            name="image"
            id="outlined-image"
            label="Image"
            variant="outlined"
            sx={{ m: 1 }}
            disabled
            value={formData.image}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            error={errors.image}
            helperText={errors.image?.join(", ")}
          />

          <Box>
            <Button
              variant="contained"
              sx={{ float: "left" }}
              onClick={!isEditing ? onSave : onSaveEdit}
            >
              SAVE
            </Button>
            <Button
              variant="outlined"
              sx={{ float: "right" }}
              onClick={onCancel}
              color="error"
            >
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
