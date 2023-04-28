// create the context
// provide the context
// consume that context

import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  // console.log("favoriteList", favoriteList);

  // getting product from api
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

  // adding favorites and review
  const addToFavorites = (productDetail, review) => {
    if (favoriteList.find((favorite) => favorite.id === productDetail.id)) {
      alert("product already exist");
    } else {
      setFavoriteList([...favoriteList, { ...productDetail, review }]);
    }
  };
  return (
    <Context.Provider
      value={{ products, isLoading, addToFavorites, favoriteList }}>
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
