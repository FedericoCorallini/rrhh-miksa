import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleClick = () => {
    sessionStorage.removeItem('jwt')
    logout({ logoutParams: { returnTo: window.location.origin }})
  }

  return (
    <button onClick={handleClick}>
      Log Out
    </button>
  );
};

export default LogoutButton;