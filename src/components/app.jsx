import {Routes, Route} from "react-router-dom";

import {AuthProvider} from "../contexts/authentication.context";
import {Header} from "./header";
import SignUp from "./signUp";
import Home from "./home";
import SignIn from "./signIn";
import {NewSaleForm} from "./newSaleForm";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Header/>
                <Routes>
                    {/* TODO: CONFIG ROUTING Replace with your content */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/registrarme" element={<SignUp/>}/>
                    <Route path="/iniciar-sesion" element={<SignIn/>}/>
                    <Route path="/vende-tu-auto" element={<NewSaleForm/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;