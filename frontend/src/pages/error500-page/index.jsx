import './style.css';
import { useAuth } from "../../components/auth-provider";
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

const Error500 = () => {
    
    const { login, logout } = useAuth(); 
    const token = localStorage.getItem("token");
    

    const verifyIfIsLogged = ()=>{
        if(token){
            const decodedToken = jwtDecode(token);
            if(decodedToken.exp * 1000 > Date.now()){
                login();
            }
        }else{
            logout();
        }   
    } 

    useEffect(()=>{
        verifyIfIsLogged();
    },[]);

    return (
        <div className="error500-container">
        <h1 className="error500-heading">Erro 500</h1>
        <p className="error500-message">
            Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde.
        </p>
        </div>
    );
};

export default Error500;
