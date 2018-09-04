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
import { Container, Header, Content, Button, Radio } from 'native-base';
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';


const database = firebase.database().ref("/")
export default class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            Email: "",
            Password: "",
            isLoader: false
        }
    }

    login() {
        let user = {
            Email: this.state.Email,
            Password: this.state.Password,
        }
        this.setState({
            isLoader: true
        })
        if (user.Email !== "" && user.password !== "") {
            setTimeout(() => {
                firebase.auth().signInWithEmailAndPassword(user.Email, user.Password)
                    .then((success) => {
                        alert("Success")
                        let currentUser = firebase.auth().currentUser.uid
                        database.child(`user/${currentUser}`).on("value", (snapshoot) => {
                            let obj = snapshoot.val()
                            obj.id = snapshoot.key
                            if (obj.userType === "admin") {
                                this.setState({
                                    isLoader: false
                                })
                                this.props.navigation.navigate("AdminDashboard")
                            }
                            else if (obj.userType === "Seller") {
                                this.setState({
                                    isLoader: false
                                })
                                this.props.navigation.navigate("ShopkeeperDashboard")
                            }
                            else if (obj.userType === "Bayer") {
                                this.setState({
                                    isLoader: false
                                })
                                this.props.navigation.navigate("Dashboard")
                            }
                        })

                    })
                    .catch((error) => {
                        var errorMessage = error.message;
                        alert(errorMessage)
                        this.setState({
                            isLoader: false
                        })
                    });

            }, 2000)
        }
        else {
            alert("All Feilds is requierd")
            this.setState({
                isLoader: false
            })
        }
    }


    render() {
        return (

            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: "https://webdesignledger.com/wp-content/uploads/2015/08/Web-Design-Ledger-200px-tall.png" }}
                    resizeMode="cover"
                >
                    <View style={styles.darazHeadingContainer} >
                        <Text style={styles.darazHeading} >
                            SHOPPER
                       </Text>
                    </View>
                    <View style={{ elevation: 10, backgroundColor: "#fff", height: 230, width: 240, borderRadius: 1000, justifyContent: "center", alignSelf: "center" }} >
                        <Image
                            resizeMode="stretch"
                            style={{ height: 150, width: 150, alignSelf: "center", }}
                            source={{ uri: "https://img.clipartxtras.com/6098bd25b34a0ba05b12f59dfdddaa38_grocery-cart-clipart-png-clipartxtras-shopping-cart-clipart-transparent-background_1000-860.png" }} />
                    </View>

                    <View style={styles.TextInputContainer} >
                        <View style={styles.TextInputView}>
                            <TextInput
                                style={styles.TextInput}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#00bcd4"
                                value={this.state.Email}
                                onChangeText={(Email) => this.setState({ Email })}
                                placeholder="Email" />
                        </View>
                        <View style={styles.TextInputView}>
                            <TextInput
                                value={this.state.Password}
                                onChangeText={(Password) => this.setState({ Password })}
                                style={styles.TextInput}
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#00bcd4"
                                placeholder="Password" />
                        </View>

                        <View style={styles.RegisterBtnView}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btnRegister}
                                onPress={this.login.bind(this)} bordered success>
                                <Text style={styles.btnRegisterText} >Sign in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("Signup") }}
                                activeOpacity={0.8} style={styles.btnRegister} bordered success>
                                <Text style={styles.btnRegisterText} >Register</Text>
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
        marginTop: 30
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

// https://cdn2.iconfinder.com/data/icons/color-svg-cloud-icons/512/cloud_shopping-512.png