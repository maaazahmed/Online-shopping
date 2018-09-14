import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';
import { connect } from "react-redux"
import { DashboardRout, devicesToken } from "../../store/action/action"



const database = firebase.database().ref("/")
class SignIn extends Component {
    constructor() {
        super()
        this.state = {
            Email: "",
            Password: "",
            isLoader: false
        }
    }


    login() {
        console.log(this.props.SignInRout.signInRout, "==============")
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
                        let currentUser = firebase.auth().currentUser.uid
                        database.child(`user/${currentUser}`).on("value", (snapshoot) => {
                            let obj = snapshoot.val()
                            obj.id = snapshoot.key
                            if (obj.userType === "admin") {
                                this.setState({
                                    isLoader: false
                                })
                                firebase.messaging().getToken()
                                    .then(fcmToken => {
                                        if (fcmToken) {
                                            console.log(fcmToken, "=============")
                                            database.child(`token`).push({ fcmToken })
                                            database.child(`adminToken`).set({ fcmToken })
                                            this.props.devicesToken(fcmToken)
                                        } else {
                                        }
                                    });
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
                                if (obj.moreDetails === undefined) {
                                    this.props.navigation.navigate("ExtraDetails")
                                }
                                else {
                                    this.props.navigation.navigate(this.props.SignInRout.signInRout)
                                }
                                firebase.messaging().getToken()
                                    .then(fcmToken => {
                                        if (fcmToken) {
                                            console.log(fcmToken, "=============")
                                            database.child(`token`).push({ fcmToken })
                                            this.props.devicesToken(fcmToken)
                                        } else {
                                        }
                                    });
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
            (!this.state.isLoader) ?
                <View style={styles.container}>
                    <View style={styles.darazHeadingContainer} >
                        <Text style={styles.darazHeading} >
                            SIGN IN
                     </Text>
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
                </View>
                :
                <View style={styles.lodaerStyle} >
                    <BarIndicator color='#00bcd4' count={6} />
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
        fontSize: 40,
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
        height: "30%",
        // backgroundColor: "red",
        
    },
    TextInputContainer: {
        flex:1,
        margin: 12,
        // marginTop: 30,
        // backgroundColor: "green",
        height: "70%",

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
        elevation: 2
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
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
});






const mapStateToProp = (state) => {
    return ({
        SignInRout: state.root,
        selectProductList: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {

        DashboardRout: (data) => {
            dispatch(DashboardRout(data))
        },
        devicesToken: (data) => {
            dispatch(devicesToken(data))
        },
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(SignIn)

