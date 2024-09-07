import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const getToken = async () => {
      console.log(isAuthenticated)
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `http://spring-miksa`,
              // scope: "read:current_user",
            },
          });
          sessionStorage.setItem('jwt', accessToken);
          console.log(accessToken)
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return !isAuthenticated && (
    <Button variant='contained' color="info" onClick={() => loginWithRedirect()}>
      Iniciar sesion
    </Button>
  );
};

export default LoginButton;