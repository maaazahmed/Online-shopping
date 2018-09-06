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
    FlatList
} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';

import { connect } from "react-redux"
import { selectedProducts, orderDetailsAction } from "../../../store/action/action"
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

    orderDetails(orderVal, index) {
        this.props.orderDetailsAction(orderVal) 
        this.props.navigation.navigate("OrderDetails")

    }






    render() {
        let orderList = this.props.orderList.orderList
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
                        <FlatList
                            data={orderList}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={this.orderDetails.bind(this, item, index)}
                                        activeOpacity={0.5}>
                                        <Card style={styles.orderCardContainer} key={item.key} >
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail source={{ uri: item.currentByerData.profilePic }} />
                                                    <Body>
                                                        <Text>NativeBase</Text>
                                                        <Text note>GeekyAnts</Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    <Icon name="arrow-forward" style={{ color: "#00bcd4", fontSize: 25 }} />
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>

                                )
                            }}
                            keyExtractor={(item, index) => {
                                return item.key
                            }}
                        />
                    </View>
                </ScrollView>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
                        source={{ uri: this.props.coverImageUrl.coverImageUrl }} />
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
        marginTop: HEADER_MAX_HEIGHT
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

    orderCardContainer: {
        marginTop: 0,
        marginBottom: 0,
        elevation: 0
    }

});





const mapStateToProp = (state) => {
    return ({
        catogeryData: state.root,
        categoryCoverImageUrl: state.root,
        selectProductList: state.root,
        categoryID: state.root,
        orderList: state.root,
        coverImageUrl: state.root
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        selectedProducts: (data) => {
            dispatch(selectedProducts(data))
        },
        orderDetailsAction: (data) => {
            dispatch(orderDetailsAction(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Vieworders)
