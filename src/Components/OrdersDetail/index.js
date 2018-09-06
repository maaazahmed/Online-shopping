import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text, Left, Right, Icon, Thumbnail, Button, Body, Title } from 'native-base';
import { connect } from "react-redux"
import { View, StyleSheet, TouchableOpacity } from "react-native"



class OrderDetails extends Component {
    render() {
        let orderDetails = this.props.order_Detail.orderDetails
        console.log(this.props.order_Detail.orderDetails)
        return (
            <Container>
                <Header style={{ backgroundColor: '#00bcd4', justifyContent: "flex-start", alignItems: "center" }}>
                    <View style={styles.HeaderContainer} >
                        <TouchableOpacity style={styles.IconTouchableOpacity} activeOpacity={0.5}>
                            <Icon style={{ color: "#fff", fontSize: 23 }} name='arrow-back' />
                        </TouchableOpacity>
                        <View style={styles.productNameVal} >
                            <Title>{this.props.order_Detail.orderDetails.productNameVal}</Title>
                        </View>
                    </View>

                </Header>

                <Content>
                    <View style={styles.imgeContainer} >
                        <View style={styles.ThumbnailView} >
                            <Thumbnail square large source={{ uri: this.props.order_Detail.orderDetails.currentByerData.profilePic }} />
                        </View>
                        <View style={styles.headingUsernameView} >
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
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    imgeContainer: {
        // backgroundColor: '#00bcd4',
        padding: 10
    },
    ThumbnailView: {
        margin: 5
    },
    headingUsernameView: {
        // backgroundColor:"red",
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
    ListItemtext:{
        color:"#00bcd4"
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
        // orderDetailsAction: (data) => {
        //     dispatch(orderDetailsAction(data))
        // },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(OrderDetails)