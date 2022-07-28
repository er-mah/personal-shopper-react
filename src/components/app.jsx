import {Routes, Route} from "react-router-dom";

import {AuthProvider} from "../contexts/authentication.context";
import {Header} from "./header";
import SignUp from "./signUp";
import {Home} from "./home";
import SignIn from "./signIn";
import {NewSaleForm} from "./newSaleForm";
import {MAIN_URLS} from "../utils/constants";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path={MAIN_URLS.HOME} element={<Home/>}/>
                    <Route path={MAIN_URLS.SIGN_UP} element={<SignUp/>}/>
                    <Route path={MAIN_URLS.SIGN_IN} element={<SignIn/>}/>
                    <Route path={MAIN_URLS.NEW_SALE_FORM + "/*"} element={<NewSaleForm/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;