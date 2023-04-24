import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductList from "./screens/productListing";
import FavoriteProduct from "./screens/favoriteProducts";
import ProductDetail from "./screens/productDetail";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductContext from "./context";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{ title: "PRODUCT LIST" }}
        name="productList"
        component={ProductList}
      />
      <Tab.Screen
        options={{ title: "FAVORITES" }}
        name="favorites"
        component={FavoriteProduct}
      />
      {/* <Tab.Screen name="Product Detail" component={ProductDetail} /> */}
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ProductContext>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="bottomTabs"
              component={BottomTabs}
            />

            <Stack.Screen
              options={{ title: "PRODUCT DETAIL" }}
              name="productDetail"
              component={ProductDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </ProductContext>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
