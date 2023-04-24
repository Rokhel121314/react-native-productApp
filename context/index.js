// create the context
// provide the context
// consume that context

import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log("products", products);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get("https://dummyjson.com/products");
      setProducts(data.products);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Context.Provider value={{ products, isLoading }}>
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
