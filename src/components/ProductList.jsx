import React, { useEffect, useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Link } from "react-router-dom";
import { BsFillBasket2Fill } from "react-icons/bs";

const ProductList = () => {
  const {
    filters,
    setFilters,
    sortBy,
    doSortChange,
    filteredProducts,
    addToBasket,
    isInBasket,
    products,
    applyFilters,
    productCountInBasket,
    setProductCountInBasket,
    setBasket,
  } = useContext(ProductContext);

  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basketArray")) || [];
    setBasket(savedBasket);
    setProductCountInBasket(savedBasket.length);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);



  return (
    <>
      <div className="bg-orange-600 h-32">
        <h1 className="text-4xl font-bold mb-4 text-white ml-44">TrendYol</h1>
        <div className="flex mb-4 space-x-4 ml-28">
          <span>
            <Link to="/basket" className="text-white">
              <div className="flex justify-center items-center rounded-xl bg-gray-300 px-4 h-12">
                <span className="mr-2 text-3xl text-red-900">
                  {productCountInBasket}
                </span>
                <span className="text-3xl text-red-900">
                  <BsFillBasket2Fill />
                </span>
              </div>
            </Link>
          </span>

          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />

          <select
            className="p-2 border rounded"
            value={sortBy}
            onChange={doSortChange}
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border rounded"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border rounded"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Rating"
            className="p-2 border rounded"
            value={filters.rating}
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
          />
        </div>
      </div>

      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-4">
        {filteredProducts.map((product) => (
          <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">
              {product.title.slice(0, 37)}
            </h2>
            <img
              src={product.image}
              alt={product.title}
              className="mb-2 w-full h-80 object-cover object-top"
            />
            <p className="text-gray-600 mb-2">
              {product.description.slice(0, 75)}
            </p>
            <strong className="text-green-600">${product.price}</strong>
            <div className="mt-2">
              <strong className="text-red-600">
                Rating: {product.rating.rate}
              </strong>
              <button
                className="bg-green-500 text-white px-4 py-1 ml-2 rounded-full"
                onClick={() => addToBasket(product.id)}
              >
                {isInBasket(product.id) ? "In Basket" : "Add to Basket"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductList;
