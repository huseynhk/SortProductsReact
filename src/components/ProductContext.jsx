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
  const [productCountInBasket, setProductCountInBasket] = useState(0);

  useEffect(() => {
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
    fetchData();
  }, []);

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

  // const addToBasket = (productId) => {
  //   const productToAdd = products.find((product) => product.id === productId);
  //   console.log(productToAdd);
  //   if (productToAdd) {
  //     setBasket([...basket, productToAdd]);
  //     setProductCountInBasket((prevCount) => prevCount + 1);
  //     localStorage.setItem(
  //       "basketArray",
  //       JSON.stringify([...basket, productToAdd])
  //     );

  //   }
  // };

  const addToBasket = (productId) => {
    const productToAdd = products.find((product) => product.id === productId);
    if (productToAdd) {
      const updatedBasket = [...basket, { ...productToAdd, quantity: 1 }];
      setBasket(updatedBasket);
      setProductCountInBasket((prevCount) => prevCount + 1);
      localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
    }
  };
  console.log(basket);

  const removeFromBasket = (productId) => {
    const updatedBasket = basket.filter((product) => product.id !== productId);
    console.log(updatedBasket.length);
    setBasket(updatedBasket);
    localStorage.setItem("basketArray", JSON.stringify(updatedBasket));
    setProductCountInBasket((prevCount) => prevCount - 1);
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
    setProductCountInBasket((prevCount) => prevCount + 1);
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

    if (productCountInBasket > updatedBasket.length) {
      setProductCountInBasket((prevCount) => prevCount - 1);
    }
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
    setProductCountInBasket(count);
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
    doSortChange,
    filteredProducts,
    addToBasket,
    removeFromBasket,
    isInBasket,
    products,
    applyFilters,
    basket,
    setBasket,
    productCountInBasket,
    setProductCountInBasket,
    incrementQuantity,
    decrementQuantity,
    calculateTotalPrice,
    calculateProductTotal,
    deleteAll,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
