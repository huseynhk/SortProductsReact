import React, { useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";

const Basket = () => {
  const {
    basket,
    setBasket,
    removeFromBasket,
    quantity,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice,
    calculateProductTotal,
    deleteAll,
  } = useContext(ProductContext);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basketArray")) || [];
    setBasket(savedBasket);
    setQuantity(savedBasket.length);
  }, []);




  return (
    <>
      <div className="mainBasket">
        <div className="flex justify-center items-center mb-4  bg-orange-600 px-4 py-2">
          <span className="text-gray-300 text-4xl">
            Total Price :${calculateTotalPrice()}
          </span>
          <button
            onClick={() => deleteAll()}
            className="text-white  bg-red-700 py-2 px-6 rounded-md ml-12 text-2xl"
          >
            Remove All
          </button>
          <div className="flex justify-center items-center rounded-xl bg-gray-300 px-4 h-12 mx-4">
            <span className="text-3xl text-red-900">
              Product Count : {quantity}
            </span>
          </div>
          <Link to="/" className="text-white">
            <div className="flex justify-center items-center rounded-xl bg-gray-300 px-4 h-12 ">
              <span className="text-3xl text-red-900">
                <AiTwotoneHome />
              </span>
            </div>
          </Link>
        </div>

        {basket.length > 0 ? (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4">
            {basket.map((product) => (
              <li
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <h2 className="text-lg font-semibold text-blue-600 mb-3">
                  {product.title.slice(0, 37)}
                </h2>
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-2 w-full h-80 object-cover object-top"
                />
                <p className="text-gray-600 mb-2">
                  {product.description.slice(0, 250)}
                </p>
                <strong className="text-green-600">${product.price}</strong>
                <div className="mt-2">
                  <strong className="text-yellow-600">
                    Rating: {product.rating.rate}
                  </strong>

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => removeFromBasket(product.id)}
                      className="text-white  bg-red-600 p-2 rounded-md "
                    >
                      Remove
                    </button>
                    <button
                      className="text-white bg-red-600 py-2 px-4 rounded-md mx-2"
                      onClick={() => decrementQuantity(product.id)}
                    >
                      -
                    </button>
                    <strong className="text-blue-600 mr-2 text-lg">
                      {product.quantity}
                    </strong>
                    <button
                      className="text-white bg-green-500 py-2 px-3 rounded-md "
                      onClick={() => incrementQuantity(product.id)}
                    >
                      +
                    </button>

                    <div className="text-center mt-1 ml-6">
                      <strong className="text-blue-600">
                        Total:
                        <span className="text-green-600 ml-2">
                          ${calculateProductTotal(product)}
                        </span>
                      </strong>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
        <p className="ml-24 mt-24 text-9xl">Empty! ...</p>
        )}
      </div>
    </>
  );
};

export default Basket;
