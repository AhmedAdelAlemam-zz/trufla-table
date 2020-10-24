import React from "react";
import "./App.css";
import ProductsTable from "./components/normal-react-with-state/ProductsTable";
import ProductsTableWithHooks from "./components/with-hooks/ProductsTableWithHooks";

function App() {
  return (
    <div className="App mt-5">
      {/* uncomment next line if you want default react without hooks */}
      {/* <ProductsTable /> */}
      <ProductsTableWithHooks />
    </div>
  );
}

export default App;
