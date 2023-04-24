import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context } from "../../context";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import ProductListItem from "../../components/productListItem";
import { useNavigation } from "@react-navigation/native";

function colorRandomizer() {
  let letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function ProductList() {
  const { products, isLoading } = useContext(Context);
  const navigation = useNavigation();
  // console.log("products", products);
  // console.log("isLoading", isLoading);

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loader} color={"black"} size={"large"} />
    );
  }

  const handleOnPress = (id) => {
    navigation.navigate("productDetail", { id: id });
  };
  return (
    <View>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductListItem
            title={itemData.item.title}
            bgColor={colorRandomizer()}
            onPress={() => handleOnPress(itemData.item.id)}
          />
        )}
        keyExtractor={(itemData) => itemData.id}
        numColumns={1}
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
});

export default ProductList;
