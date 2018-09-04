import React, { Component } from 'react';
import {
    StyleSheet,
    View
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
    constructor(props){
        super(props);
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
                content={<CategoryListComponent navigator={this.navigator} />}
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
                            <Title>User name</Title>
                        </Body>
                        <Right>
                            <Button onPress={this.showMenu} transparent >
                                <Icons color="#fff" size={20} name='ellipsis-v' />
                            </Button>
                            <Menu ref={this.setMenuRef}>
                                <MenuItem
                                    onPress={this.hideMenu}
                                >Sign in</MenuItem>
                                <MenuItem onPress={() => {
                                    this.props.navigation.navigate("Signup")
                                    this.hideMenu()
                                }}>Sign up</MenuItem>
                            </Menu>
                        </Right>
                    </Header>
                    <CategoryComponent navigation={this.props.navigation}/>
                </Container>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({});



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


