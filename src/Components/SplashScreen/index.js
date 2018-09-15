import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    AsyncStorage
} from 'react-native';
import firebase from "react-native-firebase"
import { connect } from "react-redux"
import { } from "../../store/action/action"






let database = firebase.database().ref("/")
class SplashScreen extends Component {
    componentWillMount() {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    database.child(`user/${user.uid}`).on("value", (snap) => {
                        let obj = snap.val()
                        obj.id = snap.key;
                        if (obj.userType === "Bayer") {
                            this.props.navigation.navigate("Dashboard");
                        }
                        else if (obj.userType === "Seller") {
                            this.props.navigation.navigate("ShopkeeperDashboard");
                        }
                        else if (obj.userType === "admin") {
                            this.props.navigation.navigate("AdminDashboard")
                        }
                    })
                }
                else {
                    this.props.navigation.navigate(this.props.Dashboard_Rout.DashboardRout)
                }
            })
        }, 4000)
    }




    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: "https://www.wiscomsolutions.com/wp-content/uploads/2016/05/wicom-web-ecommerce.png" }}
                    resizeMode="contain">
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000"
    },
    darazHeading: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: "bold",
        color: "#000",
    },

    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "#fff"
    },

    darazHeadingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        // borderWidth:1,
        // borderColor:"#000",
        alignItems: "center",
        marginTop: 50,



    },
    darazHeadingView: {
        flex: 2,
        //    borderWidth:1,
        //    borderColor:"#000",

    },

    headingImgView: {
        flex: 1
    },
    headingImg: {
        height: 80,
        width: 80,
        // marginTop:55,


    }

});




const mapStateToProp = (state) => {
    return ({
        Dashboard_Rout: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // DashboardRout: (data) => {
        //     dispatch(DashboardRout(data))
        // },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(SplashScreen)


