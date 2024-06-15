import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `http://spring-miksa`,
              // scope: "read:current_user",
            },
          });
          sessionStorage.setItem('jwt', accessToken);
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return <button onClick={() => {loginWithRedirect()}}>Log In</button>;
};

export default LoginButton;