import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Container, Header, Tab, Tabs, Body, Title } from 'native-base';
import ShoopKeeperList from "./Shoopkeepr/index"
import AddCategory from "./addCategorys"
import AddProduct from "./addProduct"
import { connect } from "react-redux"
import { categoryList, sellerList } from "../../store/action/action"
import firebase from "react-native-firebase";



const database = firebase.database().ref("/")
class AdminDashboard extends Component {
    componentDidMount() {
        database.child("Categorys").on("value", (snap) => {
            let obj = snap.val()
            let categoryArr = []
            for (let key in obj) {
                categoryArr.push({ ...obj[key], key })
            }
            this.props.categoryList(categoryArr)
            this.setState({
                categoryArrtListLength: categoryArr.length,
                isLoader: true
            })
        })

        database.child("user").on("value", (snap) => {
            let obj = snap.val()
            let sellerArr = []
            for (let key in obj) {
                if (obj[key].userType === "Seller") {
                    sellerArr.push({ ...obj[key], key })
                }
            }
            // console.log(sellerArr)
            this.props.sellerList(sellerArr)


            // this.setState({
            //     sellerArrtListLength: sellerArr.length,
            //     isLoader: true
            // })
        })
    }


    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#00bcd4" }} hasTabs >
                    <Body>
                        <Title>User name</Title>
                    </Body>
                </Header>
                <Tabs>
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="CATEGORYS">
                        <AddCategory />
                    </Tab>
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="ADD PRODUCT">
                        <AddProduct />
                    </Tab>
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="REQUESTS">
                        <ShoopKeeperList />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


const mapStateToProp = (state) => {
    return ({
        catogery_List: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryList: (data) => {
            dispatch(categoryList(data))
        },
        sellerList: (data) => {
            dispatch(sellerList(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(AdminDashboard)


