import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthWrapper = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently, isLoading, user } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `http://spring-miksa`,
            },
          });
          sessionStorage.setItem('jwt', accessToken);
          console.log(accessToken);
        } catch (e) {
          console.log(e.message);
        }
      }
    };

    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    } else {
      getToken();
    }
  }, [isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthWrapper;