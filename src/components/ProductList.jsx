import React, { useState, useEffect } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    brand: "",
    search: "", 
  });
  const [sortBy, setSortBy] = useState("title");
  

  useEffect(() => {
    fetch("https://fakestoreapi.com/products") //'https://dummyjson.com/products'
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.minPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price >= parseFloat(filters.minPrice)
      );
    }

    if (filters.maxPrice !== "") {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.maxPrice)
      );
    }

    if (filters.rating !== "") {
      filtered = filtered.filter(
        (product) => product.rating.rate >= parseFloat(filters.rating)
      );
    }

    // if (filters.brand !== '') {
    //   filtered = filtered.filter((product) => product.category.toLowerCase() === filters.brand.toLowerCase());
    // }

    if (filters.search !== "") { 
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

    setFilteredProducts(filtered);
    sortProducts(filtered, sortBy);
  };

  const sortProducts = (productsToSort, sortBy) => {
    let sortedProducts = [...productsToSort];

    sortedProducts.sort((a, b) => {
      if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "rating") {
        return b.rating.rate - a.rating.rate;
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(sortedProducts);
  };

  const doSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    sortProducts(filteredProducts, newSortBy);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="flex mb-4 space-x-4">
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
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="p-2 border rounded"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating"
          className="p-2 border rounded"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
        {/* <input
          type="text"
          placeholder="Brand"
          className="p-2 border rounded"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        /> */}
      </div>
      <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-blue-600 mb-3">
              {product.title.slice(0, 30)}
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
              <span className="text-red-600">
                Rating: {product.rating.rate}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
