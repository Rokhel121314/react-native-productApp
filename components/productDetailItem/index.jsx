import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function ProductDetailItem({ productDetail, productImage }) {
  // console.log("productDetail", productDetail);

  return (
    <View style={styles.productDetailContainer}>
      <Image
        source={{ uri: productImage }}
        style={{ width: 300, height: 300, resizeMode: "contain" }}
      />
      <Text style={styles.productDetailText}>{productDetail.title}</Text>
      <Text style={styles.productDetailText}>{productDetail.brand}</Text>
      <Text
        style={
          styles.productDetailText
        }>{`RATING: ${productDetail.rating}`}</Text>
      <Text>DESCRIPTION:</Text>
      <Text style={styles.productDetailText}>{productDetail.description}</Text>
      <Text
        style={
          styles.productDetailText
        }>{`PRICE: $ ${productDetail.price?.toFixed(2)}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  productDetailContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 20,
    padding: 20,
  },
  productDetailText: {
    fontSize: 20,
    fontWeight: 600,
  },
});

export default ProductDetailItem;
