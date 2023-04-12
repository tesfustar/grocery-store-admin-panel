import React, { Suspense } from "react";
import NoAuthRoute from "./routes/NoAuthRoute";
import AuthRoutes from "./routes/AuthRoutes";
import ReactLoading from "react-loading";
import { useAuth } from "./context/AuthContext";
import ToastContainer from "./containers/ToastContainer";
import { mainColor } from "./styles/Style";
const App = () => {
  const { user, role, token, checked } = useAuth();

  function DetermineRoute() {
    if (user && token && role) {
      return <AuthRoutes />;
    } else {
      return <NoAuthRoute />;
    }
  }
  return (
    <>
      {checked ? (
        <div className="h-full w-full bg-[#fbfcfd]">
          <ToastContainer />
          <DetermineRoute />
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <ReactLoading
            type={"spinningBubbles"}
            color={mainColor}
            height={"60px"}
            width={"60px"}
          />
        </div>
      )}
    </>
  );
};
export default App;
