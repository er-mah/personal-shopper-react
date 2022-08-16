import { Routes, Route } from "react-router-dom";

import { Header } from "./header";
import { NewSaleForm } from "./newSaleForm";
import { MAIN_URLS } from "../utils/constants";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path={MAIN_URLS.NEW_SALE_FORM + "/*"}
          element={<NewSaleForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
