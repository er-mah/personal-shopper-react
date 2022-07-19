import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import "primeflex/primeflex.css";                                  //primeflex css

import {NewSaleForm} from "./components/sale-form";
import {Header} from "./components/header";

function App() {
    return (
        <div className="App">
            <Header/>
            {/* TODO: CONFIG ROUTING Replace with your content */}
            <NewSaleForm/>
        </div>
    );
}

export default App;