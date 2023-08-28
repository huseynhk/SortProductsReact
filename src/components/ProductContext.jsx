import React, { useEffect, createContext, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    rating: "",
    search: "",
  });
  const [basket, setBasket] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();

      setProducts(json);
      setFilteredProducts(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const addToBasket = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    console.log(productToAdd);
    if (productToAdd) {
      setBasket([...basket, productToAdd]);
    }
  };

  console.log(basket);

  const removeFromBasket = (productId) => {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    setBasket(updatedBasket);
  };

  const isInBasket = (productId) => {
    const isProduct = basket.some((product) => product.id === productId);
    // console.log(isProduct);
    return isProduct;
  };

  const value = {
    filters,
    setFilters,
    sortBy,
    doSortChange,
    filteredProducts,
    fetchData,
    addToBasket,
    removeFromBasket,
    isInBasket,
    products,
    applyFilters,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
