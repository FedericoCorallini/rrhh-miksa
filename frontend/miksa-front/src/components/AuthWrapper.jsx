import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@mui/material/CircularProgress';

const AuthWrapper = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading, error, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `http://spring-miksa`,
              scope: "openid profile email" // Solicitar scopes adicionales
            },
          });
          sessionStorage.setItem('jwt', accessToken);
          // console.log(accessToken); 
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    if (!isAuthenticated && !isLoading && !error) {
      loginWithRedirect();
    } else if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading, error]);

  useEffect(() => {
    if (user) {
      // console.log("User attributes:", user); // Imprimir los atributos del usuario
    }
  }, [user]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress color="success" size="3rem" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return children;
};

export default AuthWrapper;