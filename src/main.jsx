import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
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
  </React.StrictMode>,
);
