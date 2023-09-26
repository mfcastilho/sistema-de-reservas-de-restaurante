import "./style.css";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth-provider/index"; 

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  useEffect(() => {

  }, [isLoggedIn]);


  return (
    <div className="header">
      <div className="header__container">
        <Link className="logo--link" to={"/"}><img src="../../../public/Digiliza-trasparent.png" alt="" className="header--logo" /></Link>
        <div className="header--btns--box">
        {!isLoggedIn ? (
            
            <Link to="/register/client" className="register--btn">
              Cadastrar
            </Link>
          ) : ""}
          {!isLoggedIn ? (
            
            <Link to="/login" className="login--btn">
              Login
            </Link>
          ) : (
            <Link to="/"
              className="logout--btn"
              onClick={() => {
                localStorage.removeItem("token");
                logout(); 
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
