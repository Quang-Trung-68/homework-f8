import React from "react";
import { Box, TextField } from "@mui/material";

interface CreateClassFormProps {
  formData: {
    name: string;
    code: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    code: string;
  }>>;
}

const CreateClassForm: React.FC<CreateClassFormProps> = ({ formData, setFormData }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box>
      <TextField
        InputProps={{
          sx: {
            fontSize: '1.5rem',
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.5rem',
          },
        }}
        name="name"
        label="Nhập tên lớp học"
        value={formData.name}
        onChange={onChange}
        required
        fullWidth
        sx={{ mb: "20px" }}
      />
      <TextField
        InputProps={{
          sx: {
            fontSize: '1.5rem',
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '1.5rem',
          },
        }}
        name="code"
        label="Nhập mã lớp"
        value={formData.code}
        onChange={onChange}
        required
        fullWidth
      />
    </Box>
  );
};

export default CreateClassForm;
