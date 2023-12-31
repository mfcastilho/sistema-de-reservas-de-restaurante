import "./style.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


const baseURL = "http://localhost:3000/api/v1";

const ClienteRegistrationPage = ()=>{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        const data = {
            name,
            email,
            password
        }
        try {
            const response = await axios.post(`${baseURL}/register/client`, data);
            if(response) toast.success("Cliente cadastrado com sucesso.");

            setTimeout(()=>{
                navigate("/");
            }, 6000)
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }
    }


    return(
        <div className="client-registration">
            <ToastContainer/>
            <div className="client-registration__container">

                <div className="title-box">
                    <h1>Cadastrar</h1>
                </div>

                <input className="form-control" type="text" placeholder="Insira seu nome" value={name} onChange={(e)=>setName(e.target.value)} />

                <input className="form-control" type="email" placeholder="Insira seu email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className="form-control" type="password" placeholder="Insira sua senha" value={password} onChange={(e)=> setPassword(e.target.value)} />

                <div className="btn-box">
                    <button onClick={handleSubmit} type="button" className="btn send-btn btn-primary">cadastrar</button>
                </div>
                <div className="link-to-login--box">
                    <span>Já tem uma conta? <Link to={"/login"}>Faça Login</Link> </span>
                 </div>
            </div>

        </div>
    );
}

export default ClienteRegistrationPage;