import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { } from 'native-base';
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';


const database = firebase.database().ref("/")
export default class ExtraDetails extends Component {
    constructor() {
        super()
        this.state = {
            // Email: "",
            // isLoader: false
            contectNumber: "",
            addarsse: ""
        }
    }

    submitDetailes() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`user/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val();
                    obj.id = snap.key;
                    let moreDetails = {
                        contectNumber: this.state.contectNumber,
                        addarsse: this.state.addarsse,
                        Email:obj.Email,
                    }
                    database.child(`user/moreDetails`).set(moreDetails).then(()=>{
                        console.log(moreDetails,"--------")
                        
                    }).catch(()=>{
                        console.log("Error")
                    })
                })
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: "https://webdesignledger.com/wp-content/uploads/2015/08/Web-Design-Ledger-200px-tall.png" }}
                    resizeMode="cover">
                    <View style={styles.TextInputContainer} >
                        <View style={styles.TextInputView}>
                            <TextInput
                                value={this.state.contectNumber}
                                onChangeText={(contectNumber) => this.setState({ contectNumber })}
                                style={styles.TextInput}
                                textContentType="telephoneNumber"
                                keyboardType="numeric"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#00bcd4"
                                placeholder="Contect Number" />
                        </View>
                        <View style={styles.TextInputView}>
                            <TextInput
                                value={this.state.addarsse}
                                onChangeText={(addarsse) => this.setState({ addarsse })}
                                style={styles.TextInput}
                                underlineColorAndroid="transparent"
                                textContentType="streetAddressLine2"
                                placeholderTextColor="#00bcd4"
                                multiline={true}
                                placeholder="Addarsse" />
                        </View>

                        <View style={styles.RegisterBtnView}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnRegister}
                                onPress={this.submitDetailes.bind(this)} bordered success>
                                <Text style={styles.btnRegisterText} >Sign in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ImageBackground>
                {(this.state.isLoader) ?
                    <View style={styles.lodaerStyle} >

                        <BarIndicator color='#00bcd4' count={6} />

                    </View>
                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darazHeading: {
        fontSize: 50,
        textAlign: 'center',
        color: "#fff",
        fontWeight: "bold"
    },

    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "#00bcd4"
    },

    darazHeadingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    TextInputContainer: {
        margin: 12,
        // marginTop: 30,
        // backgroundColor:"green",
        flex: 1,
        justifyContent: "center"
    },

    TextInputView: {
        marginTop: 15
    },

    TextInput: {
        borderColor: "#00bcd4",
        borderWidth: 1,
        height: 57,
        borderRadius: 5,
        color: "#00bcd4",
        backgroundColor: "#fff",
        fontSize: 19,
        paddingLeft: 10,
        elevation: 5
    },
    RegisterBtnView: {
        margin: 12,
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    btnRegister: {
        backgroundColor: "#00bcd4",
        width: Dimensions.get('window').width / 2.5,
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    },
    btnRegisterText: {
        color: "#fff",
        fontSize: 20
    },
    RadioContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    RadiobtnView: {
        width: Dimensions.get('window').width / 3,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    RadiobtnText: {
        color: "#fff",
        fontSize: 20,
        //    fontWeight:"bold"
    },
    lodaerStyle: {
        position: "absolute",
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
});
