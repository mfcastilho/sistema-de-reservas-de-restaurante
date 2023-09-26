import SideBar from "../../components/user-side-bar";
import "./style.css";


const UserPanelPage = ()=>{
    return(
        <div className="userpanel">
            <div className="userpanel__container">
            
                <SideBar/>
                <h1>OLá</h1>
                
            </div>
        </div>
    );
}

export default UserPanelPage;