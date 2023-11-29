import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ImageBackground, ScrollView } from "react-native";

function Content({ route }) {
    const [count, setCount] = useState(0);
    const { item } = route.params;
    
    return (
        <ScrollView>
            <View style={styles.contentItemContainer}>
                <ImageBackground
                        source={item.image}
                        style={styles.image}
                    >
                    </ImageBackground>
                    <View style={styles.contentTextContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <View style={styles.controlTextWrapper}>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.controlText}>{"|"}</Text>
                            <TouchableOpacity onPress={() => console.log("수정 press")}>
                                <Text style={styles.controlText}>수정</Text>
                            </TouchableOpacity>
                            <Text style={styles.controlText}>{"|"}</Text>
                            <TouchableOpacity onPress={() => console.log("삭제 press")}>
                                <Text style={styles.controlText}>삭제</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.line} />
                        <Text style={styles.text}>{item.text}</Text>
                    </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    flatlistContentContainer: {
        paddingBottom: 40,
    },
    contentItemContainer: {
        marginBottom: 24,
    },
    image: {
        width: '100%',
        height: 300,
    },
    
    contentTextContainer: {
        paddingHorizontal: 16,
        marginTop: 16,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    controlTextWrapper: {
        flexDirection: 'row',
        marginTop: 8,
        fontSize: 12,
    },
    date: {
        fontSize: 12,
    },
    controlText: {
        marginLeft: 8,
        fontSize: 12,
    },
    line: {
        marginTop: 8,
        borderTopColor: "#979797",
        borderTopWidth: 2,
        borderStyle: "solid",
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
});

export default Content;