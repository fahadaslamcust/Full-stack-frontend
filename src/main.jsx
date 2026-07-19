import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./i18n";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1012605359212-usli2ji3ldvomlh333d63ccedf1hud8k.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SocketProvider>
            <ToastContainer />
            <App />
          </SocketProvider>
        </BrowserRouter>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left" // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
          position="bottom" // Controls where the drawer panel opens ('top', 'bottom', 'left', 'right')
        />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

