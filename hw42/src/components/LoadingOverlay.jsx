// components/LoadingOverlay.jsx
import { CircularProgress } from "@mui/material";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const LoadingOverlay = ({ isLoading, isLoadingError }) => {
  if (isLoadingError)
    return (
      <div style={overlayStyle}>
        <div style={{ fontSize: "30px", color:"red" }}>Error to fetch api...</div>
      </div>
    );
  if (!isLoading) return null;

  return (
    <div style={overlayStyle}>
      <div style={{ fontSize: "30px" }}>Loading...</div>
      <CircularProgress size={60} />
    </div>
  );
};

export default LoadingOverlay;
