import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
} from 'react-native';
import { Container, Header, Content, Tab, Tabs, Left, Body, Button, Icon, Title } from 'native-base';
import ShoopKeeperList from "./Shoopkeepr/index"
import AddCategory from "./addCategorys"




export default class AdminDashboard extends Component {
    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: "#00bcd4" }} hasTabs >
                    <Body>
                        <Title>User name</Title>
                    </Body>
                </Header>
                <Tabs >
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="REQUESTS">
                        <ShoopKeeperList />
                    </Tab>
                    <Tab
                        tabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTabStyle={{ backgroundColor: '#00bcd4' }}
                        activeTextStyle={{ color: "#fff" }}
                        textStyle={{ color: '#f2f2f2' }}
                        heading="ADD CATEGORYS">
                        <AddCategory />
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
