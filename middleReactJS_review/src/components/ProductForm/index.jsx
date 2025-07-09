import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import api from "../../plugins/api";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductForm({
  open,
  setOpen,
  handleClose,
  handleOpen,
  formData,
  setFormData,
  getDataProducts,
  isEdit,
  setIsEdit,
  onSaveEdit,
}) {
  const [categories, setCategories] = useState([]);
  const getData = async () => {
    const { data } = await api.get("categories");
    console.log(data);
    setCategories(data);
    return data;
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(categories);

  const onChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const selectedCategory =
    categories.find((cat) => cat.id === formData.categoryId) || null;

  const handleChange = (event, newValue) => {
    setFormData({ ...formData, categoryId: newValue.id });
  };

  const onSave = async () => {
    const { data } = await api.post("products", { ...formData });
    console.log(data);
    getDataProducts();
    handleClose();
    return data;
  };

  const onCancel = () => {
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ADD A PRODUCT
          </Typography>
          <TextField
            sx={{ m: 2 }}
            id="outlined-name"
            label="Ten san pham"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={(e) => onChange(e.target.value, e.target.name)}
          />
          <Autocomplete
            sx={{ m: 2, width: 300 }}
            disablePortal
            options={categories}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.id}
            name="categoryId"
            // onChange={(e) => {console.log(e.target); ; onChange(e.target.value, e.target.name)}}
            value={selectedCategory}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            // onChange={(e) => handleChange(e.target.value, e.target.name)}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
          <TextField
            sx={{ m: 2 }}
            name="orderNum"
            value={formData.orderNum}
            onChange={(e) => onChange(e.target.value, e.target.name)}
            id="outlined-number"
            label="So thu tu"
            variant="outlined"
          />
          <Box>
            <Button
              onClick={() => {
                !isEdit ? onSave() : onSaveEdit();
              }}
            >
              SAVE
            </Button>
            <Button onClick={onCancel} color="error">
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
