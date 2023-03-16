import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./context/AuthContext";
import HomeProvider from "./context/HomeContext";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HomeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HomeProvider>
    </AuthProvider>
  </QueryClientProvider>
);
