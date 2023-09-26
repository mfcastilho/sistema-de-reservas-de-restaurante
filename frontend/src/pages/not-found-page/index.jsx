import './style.css';
import { useAuth } from "../../components/auth-provider";
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

const NotFound = () => {

    const { login, logout } = useAuth(); 
    

    const verifyIfIsLogged = ()=>{
        const token = localStorage.getItem("token");
        
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
    <div className="not-found-container">
      <h1 className="not-found-heading">Página Não Encontrada</h1>
      <p className="not-found-message">
        Desculpe, a página que você está procurando não existe.
      </p>
    </div>
  );
};

export default NotFound;
