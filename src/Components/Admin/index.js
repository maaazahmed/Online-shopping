import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { Container, Header, Tab, Tabs, Body, Title, Right, Button } from 'native-base';
import ShoopKeeperList from "./Shoopkeepr/index"
import AddCategory from "./addCategorys"
import AddProduct from "./addProduct"
import { connect } from "react-redux"
import { categoryList, sellerList } from "../../store/action/action"
import firebase from "react-native-firebase";
import Menu, { MenuItem } from 'react-native-material-menu';
import Icons from 'react-native-vector-icons/dist/FontAwesome';







const database = firebase.database().ref("/")
class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoader: true
        }
    }
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


    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    hideMenu = () => {
        this._menu.hide();
    };
    showMenu = () => {
        this._menu.show();
    };
    SignOut() {
        firebase.auth().signOut().then(() => {
            this.setState({
                isLoader: true
            })
            setTimeout(() => {
                this.setState({
                    isLoader: false
                })
                this.props.navigation.navigate("SignIn")
            }, 2000)
        }).catch(() => {
            console.log("Logged out Fail")
        })
        this.hideMenu()

    }


    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#00bcd4" }} hasTabs >
                    <Right>
                        <Button onPress={this.showMenu} transparent >
                            <Icons color="#fff" size={20} name='ellipsis-v' />
                        </Button>
                        <Menu ref={this.setMenuRef}>
                            <MenuItem
                                onPress={this.SignOut.bind(this)}>
                                Sign out
                               </MenuItem>
                            <MenuItem
                                onPress={() => {
                                    this.hideMenu()
                                }}>Profile</MenuItem>
                        </Menu>
                    </Right>
                </Header>
                <Tabs>
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="CATEGORYS">
                        <AddCategory navigation={this.props.navigation} />
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


