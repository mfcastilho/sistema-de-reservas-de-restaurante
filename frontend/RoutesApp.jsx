import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./src/pages/login-page/index";
import ReservationPage from "./src/pages/reservation-page/index";
import ClienteRegistrationPage from "./src/pages/cliente-registration";
import AdminRegistrationPage from "./src/pages/admin-registration";
import HomePage from "./src/pages/home-page";

import PrivateRoute from "./PrivateRoute";

function RoutesApp() {
    
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage/>} />

        <Route
          path="/login"
          element={<LoginPage setAuthenticated={setAuthenticated} setUser={setUser} />}
        />
        <Route path="register/client" element={<ClienteRegistrationPage/>} />

        <Route path="register/admin" element={<AdminRegistrationPage/>} />

        <Route element={<PrivateRoute/>}>
            <Route path="/reservation" element={<ReservationPage user={user}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
