import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import WriteCircleButton from "../../UI/WriteCircleButton";
import { useNavigation } from "@react-navigation/native";

function ContentHeader({}) {
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isCheckModalVisible, setCheckModalVisible] = useState(false);
  const [isReviewModalVisible, setReviewModalVisible] = useState(false);

  const handleDeletePress = () => {
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteModalVisible(false);
    navigation.goBack();
  };
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleCheckPress = () => {
    setCheckModalVisible(true);
  };

  const handleCheckConfirm = () => {
    setCheckModalVisible(false);
    setReviewModalVisible(true);
  };

  const handleCheckCancel = () => {
    setCheckModalVisible(false);
  };

  const handleReviewConfirm = () => {
    setReviewModalVisible(false);
     navigation.popToTop();
  };

  const handleReviewCancel = () => {
    setReviewModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <View style={styles.iconBtnWrap}></View>
        <View style={styles.btns}>
          <WriteCircleButton
            name="delete-forever"
            color="#000000"
            onPress={handleDeletePress}
          />
          <WriteCircleButton name="check" color="#000000" onPress={handleCheckPress} />
        </View>

        {/* 삭제 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>작성 중인 내용을 삭제하시겠습니까?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleDeleteConfirm}>
                  <Text style={styles.modalButton}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteCancel}>
                  <Text style={styles.modalButton}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* 등록 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isCheckModalVisible}
          onRequestClose={() => {
            setCheckModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>글을 등록하시겠습니까?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleCheckConfirm}>
                  <Text style={styles.modalButton}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCheckCancel}>
                  <Text style={styles.modalButton}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* 검토 모달 */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isReviewModalVisible}
          onRequestClose={() => {
            setReviewModalVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text>검토 후 게시 될 예정입니다.</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleReviewConfirm}>
                  <Text style={styles.modalButton}>확인</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleReviewCancel}>
                  <Text style={styles.modalButton}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  modalButton: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default ContentHeader;
