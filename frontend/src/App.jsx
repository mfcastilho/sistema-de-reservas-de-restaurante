import './App.css';
import RoutesApp from "../RoutesApp";
import Header from './components/header';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./components/auth-provider"

function App() {


    return (
        <AuthProvider>
            <BrowserRouter>
                <div className='app'>
                    <Header /> 
                    <RoutesApp />
                </div>
            </BrowserRouter>
        </AuthProvider>
        
    )
}

export default App
