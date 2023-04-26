import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "../../context";
import FavoriteProductItem from "../../components/favoriteProductItem";

function FavoriteProduct() {
  const { favoriteList } = useContext(Context);
  // console.log("favoriteListPage", favoriteList);
  return (
    <View style={styles.favoritePageContainer}>
      <FavoriteProductItem favoriteList={favoriteList} />
    </View>
  );
}

const styles = StyleSheet.create({
  favoritePageContainer: {
    flex: 1,
    // backgroundColor: "gray",
    padding: 24,
  },
});

export default FavoriteProduct;
