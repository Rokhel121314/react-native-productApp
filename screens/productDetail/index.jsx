import { useRoute } from "@react-navigation/native";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import ProductDetailItem from "../../components/productDetailItem";

function ProductDetail() {
  const route = useRoute();
  const id = route.params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});

  // console.log("productDetail", productDetail);

  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetail(data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loader} color={"black"} size={"large"} />
    );
  }

  return (
    <View>
      <ProductDetailItem productDetail={productDetail} />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductDetail;
