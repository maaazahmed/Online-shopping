import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Drawer, Content } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import CategoryComponent from "./Categories/index"
import CategoryListComponent from "./DrawerCategories/index"
import { categoryList } from "../../store/action/action"
import { connect } from "react-redux"
import firebase from "react-native-firebase"


const database = firebase.database().ref("/")
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserID: "",
            currentUser: {}
        }
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
    closeDrawer = () => {
        this.drawer._root.close()
    };
    openDrawer = () => {
        this.drawer._root.open()
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                database.child(`user/${user.uid}`).on("value", (snap) => {
                    let obj = snap.val()
                    obj.id = snap.key;
                    this.setState({
                        currentUserID: user.uid,
                        currentUser: obj,
                    })
                })
            }
            else {

            }
        })
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
    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<CategoryListComponent navigation={this.props.navigation} />}
                openDrawerOffset={0.5}
                panCloseMask={0.5}
                onClose={() => this.closeDrawer()} >
                <Container>
                    <Header style={{ backgroundColor: "#00bcd4" }} >
                        <Left>
                            <Button onPress={() => this.openDrawer()} transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                           
                        </Body>
                        <Right>
                            <Button onPress={this.showMenu} transparent >
                                <Icons color="#fff" size={20} name='ellipsis-v' />
                            </Button>
                            <Menu ref={this.setMenuRef}>
                               {(this.state.currentUser.userType !== "Bayer")?
                                <MenuItem
                                    onPress={() => {
                                        this.props.navigation.navigate("SignIn")
                                        this.hideMenu()}}>
                                    Sign in
                                </MenuItem>
                                :
                                <MenuItem
                                onPress={() => {
                                    this.hideMenu()}}>
                                Sign out
                               </MenuItem>}

                                <MenuItem
                                    onPress={() => {
                                        this.hideMenu()
                                    }}>Profile</MenuItem>
                            </Menu>
                        </Right>
                    </Header>
                    {(this.state.currentUserID !== "") ?
                        <View style={styles.morOrdersContainre}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate("MyOrders") }}
                                activeOpacity={0.5} style={styles.morOrdersTouchableOpacity} >
                                <Icon name="cart" style={{ color: "#00bcd4", fontSize: 35 }} />
                            </TouchableOpacity>
                        </View>
                        : null}
                    <CategoryComponent navigation={this.props.navigation} />
                </Container>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({
    morOrdersContainre: {
        backgroundColor: "#fff",
        height: "5%",
        elevation: 3,
        alignItems: "flex-end",
    },

    morOrdersTouchableOpacity: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        justifyContent: "center"
    }
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
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)


