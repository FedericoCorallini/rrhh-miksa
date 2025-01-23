import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { red } from "@mui/material/colors";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = () => {
    sessionStorage.removeItem('jwt')
    logout({ logoutParams: { returnTo: window.location.origin }})
  }

  return (
    <Button variant='outlined' color="error" sx={{ borderWidth: 2, borderColor: '#D52F2F', maxHeight:'70%', textTransform: "none"}} startIcon={<LogoutIcon />} onClick={handleClick}>
      Cerrar sesion
    </Button>
  );
};

export default LogoutButton;