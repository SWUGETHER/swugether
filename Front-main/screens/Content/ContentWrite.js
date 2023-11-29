import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import ContentHeader from "./ContentHeader";
import ContentEditor from "./ContentEditor";
import addPost from "../../API/post/addPost";
import { useSelector, useDispatch } from "react-redux";

function ContentWrite() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const onSave = async () => {
    await addPost(state, dispatch, title, body, images);

    navigation.pop();
  };

  return (
    <KeyboardAvoidingView
      style={styles.avoidingView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ContentHeader onSave={onSave} />
      <ContentEditor
        title={title}
        body={body}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onChangeImage={setImages}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#D9D9D9",
  },
  avoidingView: {
    flex: 1,
  },
});
export default ContentWrite;
