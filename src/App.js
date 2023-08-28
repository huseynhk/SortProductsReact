import React from "react";
import ProductList from "./components/ProductList";
import Basket from "./components/Basket";
import { ProductProvider } from "./components/ProductContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <Routes>
          <Route path="/"  element={<ProductList/>} />
          <Route path="/basket" element={<Basket/>} />
        </Routes>
      </ProductProvider>
    </div>
  );
}

export default App;
