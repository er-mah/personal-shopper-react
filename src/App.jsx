import {NewSaleForm} from "./components/SaleForm";

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


function App() {
  return (
    <div className="App">
        {/* Body

        <Header />
        */}
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
                <h3 className="text-xl font-bold text-gray-600">Vendé tu auto</h3>
            </div>
        </header>
        <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Replace with your content */}
                <NewSaleForm />
                <div className="px-4 py-4 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"/>
                </div>
            </div>
        </main>
    </div>
  );
}
export default App;