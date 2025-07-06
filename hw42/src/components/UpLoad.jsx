import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

export default function UpLoad({ formData, setFormData }) {
  const [base64, setBase64] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result); // Đây là chuỗi base64
      setFormData({ ...formData, image: `${reader.result}` });
      console.log(formData);
    };
    reader.readAsDataURL(file); // Chuyển sang base64
  };

  return (
    <div style={{ margin: "20px 20px 0px" }}>
      <input
        accept="image/*"
        type="file"
        id="upload-file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <label htmlFor="upload-file">
        <Button variant="contained" component="span">
          {base64 || formData.image ? "Change " : "Upload "}
          Image
        </Button>
      </label>

      {(base64 || formData.image) && (
        <>
          <img
            src={base64 || formData.image}
            style={{
              display: "block",
              objectFit: "cover",
              width: "100px",
              height: "100px",
              marginTop: 10,
              borderRadius: "50%",
            }}
          />
        </>
      )}
    </div>
  );
}
