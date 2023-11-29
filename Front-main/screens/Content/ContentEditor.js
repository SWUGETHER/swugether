import React, { useRef } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Pressable,
  FlatList,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import SelectedImage from "../../UI/SelectedImage";

function ContentEditor({
  title,
  body,
  onChangeTitle,
  onChangeBody,
  onChangeImage,
}) {
  const writeRef = useRef();
  const [selectedImages, setSelectedImages] = React.useState([]);

  const _mediaLibraryAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaType: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
      });

      if (!result.canceled) {
        const images = result.assets.map((item) => ({
          uri: item.uri,
          type: "image/jpeg",
          name: item.fileName,
        }));

        if (images.length > 10) {
          Alert.alert("이미지 첨부는 10장 이하만 가능합니다.");
        } else {
          setSelectedImages(images);
        }
      }
    } else {
      console.log("Permission denied");
    }
  };

  // 이미지 삭제
  const onRemovePressed = (index) => {
    const temp = [...selectedImages];
    const filteredImages = temp.filter((_, i) => i !== index);

    setSelectedImages(filteredImages);
  };

  React.useEffect(() => {
    onChangeImage(selectedImages);
  }, [selectedImages]);

  return (
    <View style={styles.contain}>
      <TextInput
        placeholder="글의 주제를 입력해주세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        //enter로 내용 조정
        onSubmitEditing={() => {
          writeRef.current.focus();
        }}
      />
      <TextInput
        placeholder="새로운 정보를 입력해주세요"
        style={styles.bodyInput}
        multiline
        textAlignVertical="top"
        onChangeText={onChangeBody}
        value={body}
        ref={writeRef}
      />
      <View style={styles.selectedImages}>
        <FlatList
          horizontal={true}
          data={selectedImages}
          renderItem={(itemData) => {
            return (
              <SelectedImage
                imagePath={itemData.item.uri}
                index={itemData.index}
                onRemovePressed={onRemovePressed}
              />
            );
          }}
        />
      </View>
      <View>
        <Pressable style={styles.imagesInfo} onPress={_mediaLibraryAsync}>
          <Icon name="file-image-plus-outline" size={30} />
          <Text
            style={styles.imageCount}
          >{`사진(${selectedImages.length}/10)`}</Text>
        </Pressable>
      </View>
    </View>
  );
}
export default ContentEditor;

const styles = StyleSheet.create({
  contain: { flex: 1, padding: 16 },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    marginTop: 8,
    paddingVertical: 0,
    color: "#000000",
  },
  selectedImages: {
    flexDirection: "row",
  },
  imagesInfo: {
    marginTop: 21,
    flexDirection: "row",
  },
  imageCount: {
    marginLeft: 7,
    marginTop: 4,
    fontSize: 13,
  },
});
