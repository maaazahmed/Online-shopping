import React, { Component } from 'react';
import Router from "./src/index"
import {View} from 'react-native'
import {Provider} from "react-redux"
import store from "./src/store/index"



export default class Main extends Component {
    render() {
        return (
                <Provider store={store} >
                <Router/>
                </Provider>
        );
    }
}
