import React, { Component } from 'react';
import AcceptedOrders from "./AcceptedOrder/index";
import RejectedOrders from "./RejectedOrders/index"
import firebase from "react-native-firebase";
import {
    accetedOrder,
    rejectedOrdersData
} from "../../store/action/action"
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import {
    Tab,
    Tabs,
    Icon,
    Header,
    Left,
    Body,
    Button,
} from 'native-base';
import { connect } from "react-redux"



const database = firebase.database().ref("/")
class MyOrders extends Component {
    constructor() {
        super()
        this.state = {
            num: 0,
            selected: [],
            coverImageUrl: "",
            newCategoryVal: "",
            cancleCoverData: "",
            currentUser: ""
        }
    }


    ViewCategory() {
        alert("Laptop")
    }

    uploadImage() {
        this.setState({
            modalVisible: true
        })
    }

    componentWillMount() {
        let myOrdersArr = []
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentUser: user.uid
                })
                database.child(`accseptOrders/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val()
                    for (let key in obj) {
                        myOrdersArr.push({ ...obj[key], key })
                    }
                    this.props.accetedOrder(myOrdersArr)
                })
            }
        });

        let rejectedOrdersArr = []
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentUser: user.uid
                })
                database.child(`RejectedOrders/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val()
                    for (let key in obj) {
                        rejectedOrdersArr.push({ ...obj[key], key })
                    }
                    this.props.rejectedOrdersData(rejectedOrdersArr)
                })
            }
        });
    }





    render() {
        return (
            <View style={styles.container}  >
                <Header style={{ backgroundColor: "#00bcd4" }} >
                    <Left>
                        <Button
                            onPress={() => { this.props.navigation.navigate("Dashboard") }}
                            transparent>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                    </Body>
                </Header>
                <Tabs>
                    <Tab tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="Accepted orders ">
                        <AcceptedOrders />
                    </Tab>
                    <Tab tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="Accepted orders ">
                        <RejectedOrders />
                    </Tab>
                </Tabs>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
});





const mapStateToProp = (state) => {
    return ({
        myOrder_List: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        accetedOrder: (data) => {
            dispatch(accetedOrder(data))
        },
        rejectedOrdersData: (data) => {
            dispatch(rejectedOrdersData(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(MyOrders)

