import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function CameraText({ route }) {
    const { data } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ data }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#D9D9D9',
    },
    text: {
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 20,
        fontSize: 18, 
    },
});