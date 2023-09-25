import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const baseURL = "http://localhost:3000/api/v1";

const AdminRegistrationPage = ()=>{

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
            const response = await axios.post(`${baseURL}/register/admin`, data);
            if(response) toast.success("Administrador cadastrado com sucesso.");

            setTimeout(()=>{
                navigate("/");
            }, 6000)
            
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }


    return(
        <div className="admin-registration">
            <ToastContainer/>
            <div className="admin-registration__container">

                <div className="title-box">
                    <h1>Cadastrar Admin</h1>
                </div>

                <input className="form-control" type="text" placeholder="Insira seu nome" value={name} onChange={(e)=>setName(e.target.value)} />

                <input className="form-control" type="text" placeholder="Insira seu email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input className="form-control" type="password" placeholder="Insira sua senha" value={password} onChange={(e)=> setPassword(e.target.value)} />

                <div className="btn-box">
                    <button onClick={handleSubmit} type="button" className="btn send-btn btn-primary">cadastrar</button>
                </div>

            </div>

        </div>
    );
}

export default AdminRegistrationPage;