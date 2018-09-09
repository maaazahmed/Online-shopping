import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    TextInput,
    TouchableOpacity,
    Dimensions,
    AsyncStorage
} from 'react-native';
import { Radio } from 'native-base';
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';




const database = firebase.database().ref("/")
export default class Signup extends Component {
    constructor() {
        super()
        this.state = {
            Username: "",
            Email: "",
            Password: "",
            Serller: false,
            Bayer: true,
            userType: "Bayer",
            isLoader: false
        }
    }

    registeration() {
        let user = {
            Username: this.state.Username,
            Email: this.state.Email,
            Password: this.state.Password,
            userType: this.state.userType,
            profilePic: "https://tse3.mm.bing.net/th?id=OIP.wbLH6MmOdiPwIi4fWjYmrAAAAA&pid=15.1&P=0&w=300&h=300"
        }
        this.setState({
            isLoader: true
        })

        if (user.Username !== "" && user.Email !== "" && user.Password !== "") {
            setTimeout(() => {
                if (user.userType === "Seller") {
                    database.child("Shoopkeeper-Reques").push(user)
                    this.setState({
                        isLoader: false
                    })
                }
                else {
                    firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password)
                        .then((res) => {
                            database.child(`user/${res._user.uid}`).set(user)
                                .then(() => {
                                    alert("Success")
                                    this.setState({
                                        isLoader: false
                                    })
                                })
                        }).catch((error) => {
                            alert(error)
                            this.setState({
                                isLoader: false
                            })
                        });
                }

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
                    <View style={styles.darazHeadingContainer} >
                        <Text style={styles.darazHeading} >
                            SHOPPER
                       </Text>
                    </View>
                    <View style={{ elevation: 10, backgroundColor: "#fff", height: 230, width: 240, borderRadius: 1000, justifyContent: "center", alignSelf: "center" }} >
                        <Image
                            resizeMode="stretch"
                            style={{ height: 150, width: 150, alignSelf: "center", }}
                            source={require("./images/shopping-basket-icon.png")} />
                    </View>

                    <View style={styles.TextInputContainer} >
                        <View style={styles.TextInputView}  >
                            <TextInput
                                style={styles.TextInput}
                                underlineColorAndroid="transparent"
                                value={this.state.Username}
                                placeholderTextColor="#00bcd4"
                                onChangeText={(Username) => this.setState({ Username })}
                                placeholder="Username" />
                        </View>
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
                        <View style={styles.RadioContainer} >
                            <View style={styles.RadiobtnView} >
                                <Text style={styles.RadiobtnText} >Seller</Text>
                                <Radio
                                    color={"#fff"}
                                    selectedColor={"#fff"}
                                    onPress={() => { this.setState({ Serller: true, Bayer: false, userType: "Seller" }) }}
                                    selected={this.state.Serller} />
                            </View>
                            <View style={styles.RadiobtnView}>
                                <Text style={styles.RadiobtnText}>Bayer</Text>
                                <Radio
                                    color={"#fff"}
                                    selectedColor={"#fff"}
                                    onPress={() => { this.setState({ Serller: false, Bayer: true, userType: "Bayer" }) }}
                                    selected={this.state.Bayer}/>
                            </View>
                        </View>
                        <View style={styles.RegisterBtnView}>
                            <TouchableOpacity onPress={this.registeration.bind(this)}
                                activeOpacity={0.8} style={styles.btnRegister} bordered success>
                                <Text style={styles.btnRegisterText} >Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate("SignIn") }}
                                activeOpacity={0.8} style={styles.btnRegister} bordered success>
                                <Text style={styles.btnRegisterText} >Sign in</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
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
        backgroundColor: "#00bcd4"

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
        marginTop: 15,
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