import { Outlet, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // O usuário não está logado, redirecione para a página de login
    return <Navigate to="/login" />;
  }

  // Decodifique o token JWT
  const decodedToken = jwtDecode(token);

  if (decodedToken.role === "admin") {
    // Se o usuário for um administrador, permita o acesso a todas as rotas
    return <Outlet />;
  }

  if (decodedToken.role === "client") {
    // Se o usuário for um cliente, não permita o acesso à rota /admin
    if (window.location.pathname === "/admin") {
      return <Navigate to="/unauthorized" />;
    }
    
    // Permita o acesso a todas as outras rotas
    return <Outlet />;
  }

  // Se o papel do usuário não for admin nem client, redirecione para uma página de erro ou logout
  return <Navigate to="/logout" />;
};

export default PrivateRoute;
