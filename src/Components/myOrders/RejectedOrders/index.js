import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Modal,
    PermissionsAndroid,
    Image,
    FlatList
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";
import { Tab, Tabs, Content, Card, CardItem, Text, Icon, Header, Left, Body, Right, Button, Title, } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import { connect } from "react-redux"
// import { myOrdersData } from "../../../store/action/action"

// Card, , Text, Body


const database = firebase.database().ref("/")
class RejectedOrders extends Component {
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



    // componentWillMount() {
    //     let myOrdersArr = []
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.setState({
    //                 currentUser: user.uid
    //             })
    //             database.child(`My-orders/${user.uid}`).on("value", (snap) => {
    //                 let obj = snap.val()
    //                 for (let key in obj) {
    //                     myOrdersArr.push({ ...obj[key], key })
    //                 }
    //                 this.props.myOrdersData(myOrdersArr)
    //                 // console.log()
    //             })
    //         }
    //     });

    // }

    render() {
        let rejectedOrder_List = this.props.rejectedOrder_List.reJectedOrders;
        return (
            <View style={styles.container}  >
                <Content>
                    <View style={styles.categoryGridComponent} >
                        <FlatList
                            data={rejectedOrder_List}
                            renderItem={({ item, index }) =>
                                <View
                                    activeOpacity={0.8}>
                                    <Card>
                                        <CardItem header style={{ backgroundColor: "red" }} >
                                            <Text style={{ color: "#fff" }} >{item.categoryVal}</Text>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <Text style={{ color: "red" }} >
                                                    {item.rejectDiscription}
                                                </Text>
                                            </Body>
                                        </CardItem>
                                    </Card>
                                </View>}
                            keyExtractor={(item) => { return item.key }}
                        />
                    </View>
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#F5FCFF',
    },

    categoryGridComponent: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        // marginBottom: 5,
    },


    categoryCard: {
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height / 4,
        backgroundColor: "green",
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
    rejectedContainer: {
        // margin:10
        flex: 1
    }
});





const mapStateToProp = (state) => {
    return ({
        rejectedOrder_List: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // myOrdersData: (data) => {
        //     dispatch(myOrdersData(data))
        // },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(RejectedOrders)

