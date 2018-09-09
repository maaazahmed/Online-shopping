import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image
} from 'react-native';



export default class SplashScreen extends Component {
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`user/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val()
                    obj.id = snap.key;
                    console.log(obj.userType !== "Bayer")
                })
                // userType !== "Bayer"
            }
            else {

            }
        })
    }




    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: "https://www.wiscomsolutions.com/wp-content/uploads/2016/05/wicom-web-ecommerce.png" }}
                    resizeMode="contain">
                    {/* <View style={styles.darazHeadingContainer}>
                        <View style={styles.darazHeadingView} >
                            <Text style={styles.darazHeading}>
                                DARAZ
                            </Text>
                        </View>

                        <View style={styles.headingImgView}>  
                            <Image style={styles.headingImg} source={{uri:"https://www.j2store.org/images/themeparrot/home_page/shopping-cart.png"}} />
                        </View>
                    </View> */}
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
