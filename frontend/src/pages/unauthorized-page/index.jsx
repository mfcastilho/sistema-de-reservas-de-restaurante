import './style.css';
import { useAuth } from "../../components/auth-provider";
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

const Unauthorized = () => {

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
    <div className="unauthorized-container">
      <h1 className="unauthorized-heading">Não autorizado</h1>
      <p className="unauthorized-message">
        Você não tem permissão para acessar esta página.
      </p>
    </div>
  );
};

export default Unauthorized;
