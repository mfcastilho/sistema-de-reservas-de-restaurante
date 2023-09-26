import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../components/auth-provider";
import "./style.css";
import jwtDecode from "jwt-decode";

const baseURL = "http://localhost:3000/api/v1";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const { login } = useAuth(); 


  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(`${baseURL}/login`, data);
      const { token } = response.data;
      localStorage.setItem("token", token);
      login();
      const tokenDecoded = jwtDecode(token);

      if(tokenDecoded.role === "client") navigate("/reservation");
      if(tokenDecoded.role === "admin") navigate("/admin");   

      
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

 
  return (
    <div className="login">
      <ToastContainer />
      <div className="login-container">
        <div className="title-box">
          <h1>Login</h1>
        </div>
        <input
          className="form-control"
          type="text"
          placeholder="Insira seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form-control"
          type="password"
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="btn-box">
          <button
            onClick={handleLogin}
            type="button"
            className="btn send-btn btn-primary"
          >
            Logar
          </button>
        </div>
        <div className="link-to-registration--box">
            <span>Não tem uma conta? <Link href="">Cadastre-se</Link> </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
