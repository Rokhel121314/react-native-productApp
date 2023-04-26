import { useNavigation, useRoute } from "@react-navigation/native";
import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, TextInput } from "react-native";
import { View, StyleSheet, Text, Modal } from "react-native";
import ProductDetailItem from "../../components/productDetailItem";
import { Context } from "../../context";

function ProductDetail() {
  const route = useRoute();
  const id = route.params.id;

  const [isLoading, setIsLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [productImage, setProductImage] = useState(
    "https://www.theseasonedhome.com/content/images/thumbs/default-image_450.png"
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [review, setReview] = useState("");
  const navigation = useNavigation();
  const { addToFavorites } = useContext(Context);

  // console.log("review", review);

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
        // return <Button title="FAVORITE" color={"pink"} />;
        return (
          <Pressable
            style={styles.addToFavoriteBtn}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.addToFavoriteText}>FAVORITE</Text>
          </Pressable>
        );
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

      {/* START OF MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ADD A REVIEW ON THIS PRODUCT</Text>
            <TextInput
              style={styles.addToFavoriteTextInput}
              placeholder="type here..."
              onChangeText={(review) => setReview(review)}
            />

            <View style={styles.modalBtnContainer}>
              <Pressable
                style={[styles.button, styles.buttonAdd]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  addToFavorites(productDetail, review);
                }}>
                <Text style={styles.textStyle}>ADD</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>CLOSE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {/* END OF MODAL */}
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
  addToFavoriteBtn: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "red",
    backgroundColor: "pink",
  },
  addToFavoriteText: {
    padding: 5,
    color: "black",
    fontWeight: 600,
  },
  addToFavoriteTextInput: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: 200,
    textAlign: "center",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBtnContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "red",
  },
  buttonAdd: {
    backgroundColor: "green",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProductDetail;
