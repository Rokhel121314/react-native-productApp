import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

const FavoriteItem = ({ productImage, review, id, productName }) => {
  const navigation = useNavigation();
  const navigateToProductDetail = () => {
    navigation.navigate("productDetail", { id: id });
  };

  return (
    <Pressable onPress={navigateToProductDetail}>
      <View style={styles.favoriteItemContainer}>
        <Image
          source={{ uri: productImage }}
          style={styles.favoriteItemImage}
        />
        <Text style={styles.favoriteItemReview}>{productName}</Text>
        {/* <Text style={styles.favoriteItemReview}>{review}</Text> */}
      </View>
    </Pressable>
  );
};

function FavoriteProductItem({ favoriteList }) {
  console.log("favoriteList", favoriteList);
  return (
    <View style={styles.favoriteListContainer}>
      <FlatList
        data={favoriteList}
        keyExtractor={(itemData) => itemData.id}
        renderItem={(itemData) => (
          <FavoriteItem
            productImage={itemData.item.images[0]}
            review={itemData.item.review}
            id={itemData.item.id}
            productName={itemData.item.title}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  favoriteListContainer: {
    flex: 1,
  },

  favoriteItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    // wid
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
    columnGap: 15,
  },
  favoriteItemImage: {
    // flex: 1,
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  favoriteItemReview: {
    // flex: 2,
    fontSize: 20,
    fontWeight: 600,
  },
});

export default FavoriteProductItem;
