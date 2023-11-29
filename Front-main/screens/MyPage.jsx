import * as React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
} from "react-native";
import * as Font from "expo-font";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/actions/user";
import userLogout from "../API/user/userLogout";
import userRemove from "../API/user/userRemove";
import { ADMIN_MAIL_ADDRESS } from "react-native-dotenv";

export default function MyPage({ setIsSigned }) {
  const [isFontReady, setIsFontReady] = React.useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const currentVersion = state["settingReducer"]["version"]; // 현재 버전
  const currentVersionNum =
    currentVersion && currentVersion.replace(/\./g, "").padEnd(6, "0"); // 현재 버전 괄호 안
  const isAdmin = state["userReducer"]["isAdmin"]; // 관리자 여부

  // 로그아웃 alert 창
  const setLogoutAlert = () => {
    Alert.alert(
      null,
      "로그아웃 하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "로그아웃",
          onPress: onPressLogout,
        },
      ],
      { cancelable: true }
    );
  };

  // 로그아웃 alert 창
  const setLeaveAlert = () => {
    Alert.alert(
      null,
      "회원탈퇴를 진행하시겠습니까?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "회원탈퇴",
          onPress: onPressLeave,
        },
      ],
      { cancelable: true }
    );
  };

  const onPressLogout = async () => {
    const isSuccess = await userLogout(state, dispatch);
    if (isSuccess) {
      dispatch(signOut());
      setIsSigned(false);
    } else {
      Alert.alert(
        null,
        "로그아웃 과정에서 오류가 발생하였습니다. 다시 시도하여 주세요.",
        [{ text: "확인", onPress: () => {} }],
        { cancelable: true }
      );
    }
  };

  const onPressLeave = async () => {
    const isSuccess = await userRemove(state, dispatch);
    if (isSuccess) {
      dispatch(signOut());
      setIsSigned(false);
    } else {
      Alert.alert(
        null,
        "회원탈퇴 과정에서 오류가 발생하였습니다. 다시 시도하여 주세요.",
        [{ text: "확인", onPress: () => {} }],
        { cancelable: true }
      );
    }
  };

  React.useEffect(() => {
    // font
    const getFont = async () => {
      await Font.loadAsync({
        Inter: require("../assets/fonts/Inter-Regular.ttf"),
      }).then(() => {
        setIsFontReady(true);
      });
    };

    getFont();
  }, []);

  return (
    <View style={styles.container}>
      {isFontReady && (
        <View>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>기타</Text>
          </View>
          <View>
            <View style={styles.listWrapper}>
              <TouchableOpacity
                onPress={() => {
                  // 메일 어플 연결
                  Linking.openURL(`mailto: ${ADMIN_MAIL_ADDRESS}`);
                }}
              >
                <Text>1:1 문의하기 {">"}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>공지사항 {">"}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.versionContainer}>
                <View style={styles.updateWrapper}>
                  <Text>최신버전 업데이트 {">"}</Text>
                  <Text style={styles.newVersion}>최신버전: {`23.15.0`}</Text>
                </View>
                <Text
                  style={styles.version}
                >{`${currentVersion}(${currentVersionNum})`}</Text>
              </TouchableOpacity>
            </View>
            {isAdmin ? (
              <View style={styles.adminMenuWrapper}>
                <TouchableOpacity style={styles.titleWrapper}>
                  <Text style={styles.title}>내가 쓴 글</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listWrapper}>
                  <Text>내가 쓴 글 {">"}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.space}></View>
            )}
            <View style={styles.logoutContainer}>
              <TouchableOpacity
                style={styles.logoutWrapper}
                onPress={setLogoutAlert}
              >
                <Text style={styles.logout}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.leaveWrapper}>
              <TouchableOpacity onPress={setLeaveAlert}>
                <Text style={styles.leave}>회원탈퇴</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 31,
    marginLeft: 17,
    marginRight: 17,
  },
  titleWrapper: {
    paddingBottom: 11,
    borderBottomColor: "#979797",
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  title: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: 20,
    lineHeight: 24,
    color: "black",
  },
  listWrapper: {
    flexDirection: "column",
    gap: 26,
    marginTop: 32,
  },
  versionContainer: {
    flexDirection: "row",
  },
  updateWrapper: {},
  newVersion: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 10,
    lineHeight: 12,
    color: "#979797",
  },
  version: {
    fontFamily: "Inter",
    marginLeft: "auto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
    color: "black",
  },
  adminMenuWrapper: {
    marginTop: 40,
    marginBottom: 30,
  },
  space: {
    height: 160,
  },
  logoutContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoutWrapper: {
    width: 328,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "black",
    marginBottom: 16,
  },
  logout: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "800",
    fontSize: 20,
    lineHeight: 24,
    color: "black",
  },
  leaveWrapper: {
    paddingTop: 9,
    borderTopColor: "#979797",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  leave: {
    fontFamily: "Inter",
    textDecorationLine: "underline",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: 500,
  },
});
