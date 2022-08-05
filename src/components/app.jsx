import {Routes, Route} from "react-router-dom";

import {AuthProvider} from "../contexts/authentication.context";
import {Header} from "./header";
import {NewSaleForm} from "./newSaleForm";
import {MAIN_URLS} from "../utils/constants";


function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route path={MAIN_URLS.NEW_SALE_FORM + "/*"} element={<NewSaleForm/>}/>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;