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
import { categoryList, DashboardRout } from "../../store/action/action"
import { connect } from "react-redux"
import firebase from "react-native-firebase"
import { BarIndicator } from 'react-native-indicators';




const database = firebase.database().ref("/")
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserID: "",
            currentUser: {},
            isLoader: true
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
                this.props.DashboardRout("Dashboard")
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
            })
            setTimeout(()=>{
                this.setState({
                    isLoader: false
                })
            }, 2000)
        })
    }


    SignOut() {
        firebase.auth().signOut().then(() => {
            this.setState({
                isLoader: true
            })
            setTimeout(()=>{
                this.setState({
                    isLoader: false
                })
                // this.props.DashboardRout("SignIn")
                this.props.navigation.navigate("SignIn")
            }, 2000)
        }).catch(() => {
            console.log("Logged out Fail")
        })
        this.hideMenu()

    }

    render() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<CategoryListComponent navigation={this.props.navigation} />}
                openDrawerOffset={0.5}
                panCloseMask={0.5}
                onClose={() => this.closeDrawer()} >
                {(this.state.isLoader) ?
                    <View style={styles.lodaerStyle} >
                        <BarIndicator color='#00bcd4' count={6} />
                    </View>
                    :
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
                                    {(this.state.currentUser.userType !== "Bayer") ?
                                        <MenuItem
                                            onPress={() => {
                                                this.props.DashboardRout("SignIn")
                                                this.props.navigation.navigate("SignIn")
                                                this.hideMenu()
                                            }}>
                                            Sign in
                                </MenuItem>
                                        :
                                        <MenuItem
                                            onPress={this.SignOut.bind(this)}>
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
                    </Container>}
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
    },
    lodaerStyle: {
        flex: 1,
        alignItems: "center",
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
        DashboardRout: (data) => {
            dispatch(DashboardRout(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Dashboard)


