import React, { Component } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Card, Icon } from 'native-base';
import { connect } from "react-redux"
import { selectedProducts } from "../../../store/action/action"
import firebase from "react-native-firebase"




const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
let selectProductArr = []
const database = firebase.database().ref("/")
class Vieworders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            currentUser: ""
        };
    }


    selectProduct(value, index) {
        selectProductArr.push(value)
        this.props.selectedProducts(selectProductArr)
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`user/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val();
                    obj.id = snap.key;
                    this.setState({
                        currentUser: obj
                    })

                    database.child("Categorys").on("value", (snap) => {
                        let obj = snap.val()
                        let productArr = []
                        for (let key in obj) {
                            productArr.push({ ...obj[key], key })
                        }

                        let SoldProductsArr = []
                        for (var i = 0; i < productArr.length; i++) {
                            for (let key2 in productArr[i].Products) {
                                // console.log(productArr[i].Products[key2].SoldProducts,"=====")
                                SoldProductsArr.push({ ...productArr[i].Products[key2], key2 })
                            }
                            let SoldProductsListArry = []
                            for (var j = 0; j < SoldProductsArr.length; j++) {
                                // console.log(SoldProductsArr[j].SoldProducts,"===========")
                                for (let key3 in SoldProductsArr[j].SoldProducts) {
                                    SoldProductsListArry.push({ ...SoldProductsArr[j].SoldProducts[key3], key3 })
                                }
                            }
                            console.log(SoldProductsListArry)
                        }
                    })
                })
            }
        })
    }

    completeProductSelection() {
        //     let currentUser = this.state.currentUser
        //     if (this.state.currentUser === "") {
        //         this.props.navigation.navigate("SignIn")
        //     }
        //     else {
        //         let selectProductList = this.props.selectProductList.selectedProduct
        //         let categoryID = this.props.categoryID.categoryID;
        //         for (var i = 0; i < selectProductList.length; i++) {
        //             selectProductList[i].currentByerData = currentUser;
        //             database.child(`Categorys/${categoryID}/Products/${selectProductList[i].key}/SoldProducts`).push(selectProductList[i]).then((suc) => {
        //                 console.log(suc)
        //             }).catch((err) => {
        //                 console.log(err)
        //             })
        //         }
        //     }
    }




    render() {
        let categoryData = this.props.catogeryData.categoryData
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });
        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });
        return (
            <View style={styles.fill}>
                <ScrollView
                    style={styles.fill}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])}>
                    <View style={styles.categoryGridComponent} >
                        {categoryData.map((value, index) => {
                            return (
                                <View key={index}>

                                </View>
                            )
                        })}

                    </View>
                </ScrollView>


                {/* <TouchableOpacity onPress={this.completeProductSelection.bind(this)} activeOpacity={0.5} style={styles.nextButton} >
                    <View style={styles.nextButtonTouchableOpacity} >
                        <Text style={styles.nextText} >Next</Text>
                        <Icon name='arrow-forward' style={{ color: "#fff" }} />
                    </View>
                </TouchableOpacity> */}



                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
                        source={{ uri: this.props.categoryCoverImageUrl.coverImage }} />
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("ShopkeeperDashboard") }}
                        activeOpacity={0.6}  >
                        <View style={{ backgroundColor: "trancparant", padding: 17, }} >
                            <Icon name='arrow-back' style={{ color: "#fff" }} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({

    fill: {
        flex: 1,
    },
    categoryGridComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 0,
        marginTop: HEADER_MAX_HEIGHT
    },
    categoryCard: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
        backgroundColor: "#fff",
        marginBottom: 0,
        elevation: 0,
        marginTop: 1,
    },
    CardViewImage: {
        flex: 2
    },
    ImageBackground: {
        height: "90%",
        height: "90%",
        justifyContent: "flex-start",
        margin: "3%",
    },

    producDetailView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2.5%",
        alignContent: "center",
        flex: 1,
    },
    producDetaContain: {
        justifyContent: "center"
    },
    nameText: {
        color: "gray",
        fontSize: 15,

    },
    priceText: {
        color: "#00b91f",
        fontSize: 18,
        fontStyle: "italic"
    },
    modleText: {
        color: "#000",
        fontSize: 20,
    },
    bayBtnView: {
        justifyContent: "center",
        width: "8%",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        padding: 4,
        borderWidth: .5,
        borderColor: "#00bcd4",
        borderRadius: 4
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00bcd4',
        overflow: 'hidden',
        elevation: 0.5,
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    nextButton: {
        elevation: 5,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: 25,
        bottom: 30,
        width: '25%'

    },
    nextButtonTouchableOpacity: {
        flex: 1,
        backgroundColor: "#00bcd4",
        padding: 10,
        borderRadius: 30,
        flexDirection: "row",
        justifyContent: "space-around",
        width: '100%'
    },
    nextText: {
        fontSize: 20,
        color: "#fff"
    }
});





const mapStateToProp = (state) => {
    return ({
        catogeryData: state.root,
        categoryCoverImageUrl: state.root,
        selectProductList: state.root,
        categoryID: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        selectedProducts: (data) => {
            dispatch(selectedProducts(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Vieworders)
