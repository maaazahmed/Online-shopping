import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    // Image
} from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Drawer, Content } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import SideBar from "./Categories/index"








export default class Dashboard extends Component {
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
        // alert("openDrawer")
    };




    render() {
        return (
            <Drawer

                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} />}
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
                    <Content >

                    </Content>
                </Container>
            </Drawer>
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

});
