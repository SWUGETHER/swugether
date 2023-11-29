import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ContentList from './ContentList';
import { Dimensions } from 'react-native';
import ContentButton from '../../UI/ContentButton';

//import FeedButton from '../../UI/FeedButton';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

function Contents() {
    return (
        <View style={styles.container}>
            <View style={styles.tag_wrap}>
                <TouchableOpacity style={styles.tag} onPress={() => console.log('최신순 press')}> 
                    <Text style={styles.tag_text}>최신순</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag} onPress={() => console.log('오래된순 press')}> 
                    <Text style={styles.tag_text}>오래된순</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.tag} onPress={() => console.log('하트순 press')}> 
                    <Text style={styles.tag_text}>하트순</Text> 
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 60 }}>
                <ContentList />
            </View>
            <View >
                <ContentButton style={{}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    tag_wrap: {
        position: 'absolute',
        width: 330,
        height: 30,
        top: 30,
        left: 30,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    tag: {
        height: 30,
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 4},
        shadowRadius: 4,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        margin: 14,
    },
    tag_text: {
        fontSize: 16, 
        fontWeight:'bold', 
        textAlign: 'center'
    },
})

export default Contents;