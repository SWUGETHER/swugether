import React, { useEffect, useState } from "react";
import { StyleSheet, Pressable, View, Text, Image } from "react-native";
import * as Font from "expo-font";
import * as Google from "expo-auth-session/providers/google";
import { useDispatch } from "react-redux";
import {
  GOOGLE_OAUTH_CLIENT_ID_EXPO,
  GOOGLE_OAUTH_CLIENT_ID_ANDROID,
} from "react-native-dotenv";
import googleNormal from "../assets/google_oauth_normal.png";
import userLogin from "../API/user/userLogin";
import { signIn } from "../redux/actions/user";
import { setVersion } from "../redux/actions/version";

const Login = ({ setIsSigned }) => {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_OAUTH_CLIENT_ID_EXPO,
    androidClientId: GOOGLE_OAUTH_CLIENT_ID_ANDROID,
    responseType: "id_token",
  });
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setUserData = async (id_token) => {
      try {
        // server 필요 -> 나중에 server 완성되면 주석 해제하기
        const {
          userId,
          email,
          accessToken,
          refreshToken,
          accessToken_expiration,
          refreshToken_expiration,
          isAdmin,
        } = await userLogin(id_token);

        dispatch(
          signIn(
            userId,
            email,
            accessToken,
            refreshToken,
            accessToken_expiration,
            refreshToken_expiration,
            isAdmin
          )
        );

        // for test (임시 데이터) -> server 완성되면 아래 *로 감싸진 부분 지우기
        //*
        // console.log(id_token);
        // dispatch(
        //   signIn(
        //     1,
        //     "swu@swu.ac.kr",
        //     "token_sample1234@",
        //     "refresh_sample1234@",
        //     false
        //   )
        // );
        //*

        dispatch(setVersion("23.14.0"));
        setIsSigned(true);
      } catch (error) {
        console.error(error);
      }
    };

    if (response?.type === "success") {
      const id_token = response["params"]["id_token"];
      setUserData(id_token);
    }
  }, [response]);

  useEffect(() => {
    const getFont = async () => {
      await Font.loadAsync({
        Roboto: require("../assets/fonts/Roboto-Medium.ttf"),
      });
    };

    getFont();
    setIsReady(true);
  }, []);

  return (
    <View style={styles.container}>
      {isReady && (
        <View style={styles.loginBtnWrapper}>
          <Pressable
            style={styles.button}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Image source={googleNormal} style={styles.google_logo} />
            <Text style={styles.loginTitle}>Sign in with Google</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  loginBtnWrapper: {
    flex: 1,
  },
  button: {
    backgroundColor: "#4285F4",
    height: 36,
    margin: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  google_logo: {
    height: 36,
    width: 36,
    marginRight: 24,
  },
  loginTitle: {
    color: "white",
    fontFamily: "Roboto",
    fontSize: 14,
  },
});

export default Login;
