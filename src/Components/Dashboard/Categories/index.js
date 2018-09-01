import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Root
    // Image
} from 'react-native';



export default class SideBar extends Component {
    render() {
        return (
            <View style={styles.container}></View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
});
