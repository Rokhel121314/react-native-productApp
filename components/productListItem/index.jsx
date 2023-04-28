import React from "react";
import { Pressable } from "react-native";
import { View, Text, StyleSheet } from "react-native";

function ProductListItem({ title, onPress, bgColor }) {
  return (
    <View style={styles.productItemOuterContainer}>
      <Pressable
        style={{ ...styles.pressableView, backgroundColor: bgColor }}
        android_ripple={{ color: "ce3667" }}
        onPress={onPress}>
        <View style={styles.productItemInnerContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  productItemOuterContainer: {
    flex: 1,
    margin: 16,
    height: 160,
    borderRadius: 8,
  },

  pressableView: {
    flex: 1,
    borderRadius: 8,
  },
  productItemInnerContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
});

export default ProductListItem;
