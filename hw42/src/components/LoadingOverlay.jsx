// components/LoadingOverlay.jsx
import React from "react";
import { CircularProgress } from "@mui/material";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const LoadingOverlay = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div style={overlayStyle}>
      <CircularProgress size={60} />
    </div>
  );
};

export default LoadingOverlay;
