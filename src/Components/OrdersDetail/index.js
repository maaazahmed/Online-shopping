import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Thumbnail, Button, Body, Title } from 'native-base';
import { connect } from "react-redux"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';
import { Dialog } from 'react-native-simple-dialogs';




let database = firebase.database().ref("/")
class OrderDetails extends Component {
    constructor() {
        super()
        this.state = {
            isReplyLoar: false,
            dialogVisible: false,
            rejectDiscription:""
        }
    }
    accseOrder(orderDetails) {
        this.setState({
            isReplyLoar: true
        })
        setTimeout(() => {
            database.child("Reply_Orders").push(orderDetails).then(() => {
                database.child(`Categorys/${orderDetails.categoryID}/Products/${orderDetails.productID}/SoldProducts/${orderDetails.key}`).remove()
                this.setState({
                    isReplyLoar: false
                })
            }).catch(() => {
                this.setState({
                    isReplyLoar: false
                })
            })
        }, 100)
    }


    rejectorder() {
        alert("")
        this.setState({
            dialogVisible: true
        })
    }




    render() {
        let orderDetails = this.props.order_Detail.orderDetails
        return (
            <Container>
                <Header style={{ backgroundColor: '#00bcd4', justifyContent: "flex-start", alignItems: "center" }}>
                    <View accessible={true} style={styles.HeaderContainer} >
                        <TouchableOpacity style={styles.IconTouchableOpacity} activeOpacity={0.5}>
                            <Icon style={{ color: "#fff", fontSize: 23 }} name='arrow-back' />
                        </TouchableOpacity>
                        <View style={styles.productNameVal} >
                            <Title>{this.props.order_Detail.orderDetails.productNameVal}</Title>
                        </View>
                    </View>
                </Header>
                <View style={styles.ContentView} >
                    <View style={styles.imgeContainer} >
                        <View style={styles.ThumbnailView} >
                            <Thumbnail square large source={{ uri: this.props.order_Detail.orderDetails.currentByerData.profilePic }} />
                        </View>
                        <View>
                            <Text style={styles.headingUsernameText}>{orderDetails.currentByerData.Username}</Text>
                        </View>
                    </View>
                    <List>
                        <ListItem>
                            <Left>
                                <Text style={styles.ListItemtext}>{orderDetails.currentByerData.Email}</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.ListItemtext} >{orderDetails.currentByerData.moreDetails.contectNumber}</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.ListItemtext}>{orderDetails.currentByerData.moreDetails.addarsse}</Text>
                            </Left>
                        </ListItem>
                        <ListItem>
                            <Left>
                                <Text style={styles.ListItemtext}>{orderDetails.currentByerData.moreDetails.addarsse}</Text>
                            </Left>
                        </ListItem>
                    </List>
                </View>
                <View style={{ flex: 1 }} >
                    {(this.state.isReplyLoar) ?
                        <View style={styles.accseptAndRejectBtn}>
                            <BarIndicator color='#00bcd4' count={6} />
                        </View>
                        :
                        <View style={styles.accseptAndRejectBtn} >
                            <TouchableOpacity
                                onPress={this.accseOrder.bind(this, orderDetails)}
                                activeOpacity={0.5} style={styles.TouchableOpacityAcceptBtn}  >
                                <Text style={{ color: "#fff", fontSize: 20 }} >
                                    Accept
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.rejectorder.bind(this)} activeOpacity={0.5} style={styles.TouchableOpacityAcceptBtn}  >
                                <Text style={{ color: "#fff", fontSize: 20 }}>
                                    Reject
                                </Text>
                            </TouchableOpacity>
                        </View>}
                </View>
                <View>
                    <Dialog
                        animationType="fade"
                        visible={this.state.dialogVisible}
                        onTouchOutside={(dialogVisible) => this.setState({ dialogVisible: false })} >
                        <View>
                            <View style={styles.TextInputContainer}>
                                <TextInput
                                    value={this.state.rejectDiscription}
                                    style={styles.TextInput}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#00bcd4"
                                    onChangeText={(rejectDiscription) => { this.setState({ rejectDiscription }) }}
                                    placeholder="Add catogery" />
                            </View>
                        </View>
                    </Dialog>
                </View>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    imgeContainer: {
        padding: 10
    },
    ThumbnailView: {
        margin: 5
    },
    headingUsernameText: {
        color: "#00bcd4",
        fontSize: 25,
        margin: 2
    },
    HeaderContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    productNameVal: {
        marginLeft: "7%"
    },
    IconTouchableOpacity: {
        marginLeft: "2%"
    },
    ListItemtext: {
        color: "#00bcd4"
    },
    ContentView: {
        flex: 1
    },
    accseptAndRejectBtn: {
        justifyContent: "space-between",
        flexDirection: "row",
        padding: 30,

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
        elevation: 5,
    },
    TouchableOpacityAcceptBtn: {
        backgroundColor: "#00bcd4",
        width: "45%",
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
        borderRadius: 3,
    }
})



const mapStateToProp = (state) => {
    return ({
        order_Detail: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // selectedProducts: (data) => {
        //     dispatch(selectedProducts(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(OrderDetails)