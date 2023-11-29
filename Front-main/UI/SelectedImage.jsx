import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SelectedImage = ({ imagePath, index, onRemovePressed }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: imagePath }} style={styles.image} />
        <TouchableOpacity
          onPress={() => {
            onRemovePressed(index);
          }}
        >
          <Icon name="close-circle" size={19.5} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginRight: 20,
  },
  wrapper: {
    width: 90,
    height: 90,
  },
  image: {
    width: 70,
    height: 70,
  },
  icon: {
    position: "absolute",
    top: -80,
    right: -10,
  },
});

export default SelectedImage;
