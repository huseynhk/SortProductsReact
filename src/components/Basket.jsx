import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";

const Basket = () => {
    
  const { basket, removeFromBasket } = useContext(ProductContext);
  console.log(basket);


  return (
    <div className="bg-orange-600 text-white p-5">
      <h2 className="text-lg font-semibold mb-1">Basket</h2>
        <ul className="space-y-1">
          {/* {basket.map((product) => (
            <li key={product.id} className="flex justify-between">
              <span>{product.title}</span>
              <button
                onClick={() => removeFromBasket(product.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))} */}
        </ul>
    </div>
  );
  
};

export default Basket;
