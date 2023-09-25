import { Route, Routes } from "react-router-dom";

import LoginPage from "./src/pages/login-page/index";
import ReservationPage from "./src/pages/reservation-page/index";
import ClienteRegistrationPage from "./src/pages/cliente-registration";
import AdminRegistrationPage from "./src/pages/admin-registration";
import HomePage from "./src/pages/home-page";
import Unauthorized from "./src/pages/unauthorized-page";
import Error500 from "./src/pages/generic-error-page";
import AdminPanelPage from "./src/pages/admin-panel-page";
import NotFound from "./src/pages/not-found-page";


import PrivateRoute from "./PrivateRoute";

function RoutesApp() {
    
 
  return (

        <Routes>
            
            <Route path="/" element={<HomePage/>} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="register/client" element={<ClienteRegistrationPage/>} />

            <Route path="register/admin" element={<AdminRegistrationPage/>} />

            <Route path="/error" element={<Error500/>} />
            
            <Route path="/unauthorized" element={<Unauthorized/>} />

            <Route path="*" element={<NotFound/>} />

            <Route element={<PrivateRoute/>}>
                <Route path="/admin" element={<AdminPanelPage/>} />
                <Route path="/reservation" element={<ReservationPage/>} />
            </Route>
        </Routes>

  );
}

export default RoutesApp;
