import { Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./header";
import { NewSaleForm } from "./newSaleForm";
import { MAIN_URLS, NEW_SALE_FORM_URLS } from "../utils/constants";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path={""}
          element={
            <Navigate
              to={MAIN_URLS.NEW_SALE_FORM + NEW_SALE_FORM_URLS.START}
              replace
            />
          }
        />
        <Route
          path={MAIN_URLS.NEW_SALE_FORM + "/*"}
          element={<NewSaleForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
