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
    render() {
        let rejectedOrder_List = this.props.rejectedOrder_List.reJectedOrders;
        return (
            <View style={styles.container}  >
                {(rejectedOrder_List.length) ?
                    <View style={{ flex: 1 }} >
                        <FlatList
                            style={{}}
                            data={rejectedOrder_List}
                            renderItem={({ item, index }) =>
                                <View style={{ height: "100%", flex: 1 }} >
                                    <Card style={{ flex: 1 }} >
                                        <View style={{ backgroundColor: "#00bcd4", padding: 10, fontSize: "25", fontWeight: "bold" }} >
                                            <Text style={{ color: "#fff" }} >{item.categoryVal}</Text>
                                        </View>
                                        <View style={{ minHeight: 100 }} >
                                            <Text style={{ color: "#00bcd4", margin: 10 }} >
                                                {item.rejectDiscription}
                                            </Text>
                                            <View style={{ margin: 10, justifyContent: "flex-end", alignItems: "flex-end" }} >
                                                <Image source={require("./images/error-512.png")} style={{ height: 25, width: 25 }} />
                                            </View>
                                        </View>
                                    </Card>
                                </View>}
                            keyExtractor={(item) => { return item.key }}
                        />
                    </View>
                    :
                    <View style={{
                        flex: 1,
                        backgroundColor: "#f2f2f2",
                        justifyContent: "center",
                        alignItems: "center"}}>
                        <Text style={{
                            fontSize: 25,
                            fontWeight: "bold",
                            color: "gray"}} >
                            No Rejected orders
                          </Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    categoryGridComponent: {
        flex: 1,
        height: "100%"

    },


    categoryCard: {
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

