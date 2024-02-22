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
  const [quantity, setQuantity] = useState(0);

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

 

  const addToBasket = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    const exist = basket.find((product) => product.id === productId);
    if (productToAdd) {
      if (exist) {
        alert("This product is already in your basket!");
        // const updatedBasket = basket.map((item) =>
        //   item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        // );
        // setBasket(updatedBasket);
        // setQuantity((prevCount) => prevCount + 1);
        // localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
      } else {
        const updatedBasket = [...basket, { ...productToAdd, quantity: 1 }];
        setBasket(updatedBasket);
        setQuantity((prevCount) => prevCount + 1);
        localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
      }
    } else {
      alert("Product not found!");
    }
  };

  const removeFromBasket = (productId) => {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    console.log(updatedBasket.length);
    setBasket(updatedBasket);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
    setQuantity((prevCount) => prevCount - 1);
    updateProductCountInBasket();
  };

  const isInBasket = (productId) => {
    const isProduct = basket.find((product) => product.id === productId); //some
    // console.log(isProduct);
    return isProduct;
  };

  const incrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    setBasket(updatedBasket);
    setQuantity((prevCount) => prevCount + 1);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
    updateProductCountInBasket();
  };

  const decrementQuantity = (productId) => {
    const updatedBasket = basket.map((product) =>
      product.id === productId
        ? { ...product, quantity: Math.max(1, product.quantity - 1) }
        : product
    );
    setBasket(updatedBasket);

    // if (quantity > updatedBasket.length) {
    //   setQuantity((prevCount) => prevCount - 1);
    // }
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
    updateProductCountInBasket();
  };

  const calculateProductTotal = (product) => {
    return (product.price * product.quantity).toFixed(2);
  };

  const calculateTotalPrice = () => {
    const total = basket.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const roundTotal = Math.round(total);
    return roundTotal;
  };

  const updateProductCountInBasket = () => {
    const count = basket.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setQuantity(count);
  };

  useEffect(() => {
    updateProductCountInBasket();
  }, [basket]);

  const deleteAll = () => {
    setBasket([]);
    localStorage.setItem("basketArray", JSON.stringify([]));
  };

  const value = {
    filters,
    setFilters,
    sortBy,
    setSortBy,
    filteredProducts,
    addToBasket,
    removeFromBasket,
    isInBasket,
    products,
    setProducts,
    applyFilters,
    basket,
    setBasket,
    quantity,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice,
    calculateProductTotal,
    deleteAll,
    setFilteredProducts,
    sortProducts,
    
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
