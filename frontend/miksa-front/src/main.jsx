import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Auth0Provider } from '@auth0/auth0-react';


const domain = import.meta.env.VITE_AUTH0_DOMAIN
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://spring-miksa",
        scope: "read:current_user update:current_user_metadata"
      }}
    >
      <App />
    </Auth0Provider>
  </StrictMode>
)
