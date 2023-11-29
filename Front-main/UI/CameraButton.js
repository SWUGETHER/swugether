import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function CameraButton() {
    return (
    <View style={styles.wrapper}>
        <Pressable
        style={({pressed}) => [
        styles.button,
        Platform.OS === 'ios' && {
            opacity: pressed ? 0.6 : 1,
        },
        ]}
        android_ripple={{color: 'black'}}
        >
            <Icon name="camera" size={24} style={styles.icon} />
        </Pressable>
    </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
      position: "absolute",
    },
    button: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: "#979797",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 28,
      shadowColor: "#4d4d4d",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    icon: {
      color: "black",
    },
  });
export default CameraButton;