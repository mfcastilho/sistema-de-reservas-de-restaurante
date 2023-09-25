import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./src/pages/login-page/index";
import ReservationPage from "./src/pages/reservation-page/index";

import PrivateRoute from "./PrivateRoute";

function RoutesApp() {
    
  // eslint-disable-next-line no-unused-vars
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setAuthenticated={setAuthenticated} setUser={setUser} />}
        />
        <Route element={<PrivateRoute/>}>
            <Route path="/reservation" element={<ReservationPage user={user}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
