import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = () => {
    sessionStorage.removeItem('jwt')
    logout({ logoutParams: { returnTo: window.location.origin }})
  }

  return (
    <Button variant='contained' color="info" onClick={handleClick}>
      Cerrar sesion
    </Button>
  );
};

export default LogoutButton;