import { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./style.css";

const baseURL = "http://localhost:3000/api/v1";

const LoginPage = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        
        try {
            const data = {
                email,
                password
            }
            
            const response = await axios.post(`${baseURL}/login`, data);

            const { token } = response.data;
            console.log(response.data);
            localStorage.setItem("token", token);

            navigate("/reservation");

        } catch (error) {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
        }
    }


    return (
        <div className="login">
             <ToastContainer />
            <div className="login-container">
                <div className="title-box">
                    <h1>Login</h1>
                </div>
                <input className="form-control" type="text" placeholder="Insira seu email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className="form-control" type="password" placeholder="Insira sua senha" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <div className="btn-box">
                    <button onClick={handleLogin} type="button" className="btn send-btn btn-primary">Logar</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;