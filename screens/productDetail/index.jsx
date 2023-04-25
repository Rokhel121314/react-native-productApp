import { useNavigation, useRoute } from "@react-navigation/native";
import Axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { View, Button, StyleSheet } from "react-native";
import ProductDetailItem from "../../components/productDetailItem";

function ProductDetail() {
  const route = useRoute();
  const id = route.params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [productImage, setProductImage] = useState(
    "https://www.theseasonedhome.com/content/images/thumbs/default-image_450.png"
  );

  const navigation = useNavigation();

  const getProductDetail = async () => {
    try {
      setIsLoading(true);
      const { data } = await Axios.get(`https://dummyjson.com/products/${id}`);
      setProductDetail(data);
      setProductImage(data.images[0]);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="FAVORITE" />;
      },
    });
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loader} color={"black"} size={"large"} />
    );
  }

  return (
    <View style={styles.productDetailMainContainer}>
      <ProductDetailItem
        productDetail={productDetail}
        productImage={productImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailMainContainer: {
    flex: 1,
    // backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default ProductDetail;
