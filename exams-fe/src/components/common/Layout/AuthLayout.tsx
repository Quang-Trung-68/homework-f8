import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <Grid container sx={{minHeight:"100vh" ,alignItems:"center", justifyContent:"center",minWidth:"100vw"}}>
      <Outlet />
    </Grid>
  );
};

export default AuthLayout;
