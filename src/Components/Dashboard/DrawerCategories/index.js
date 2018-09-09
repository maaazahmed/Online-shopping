import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Modal,
    PermissionsAndroid,
    FlatList
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";
import { Container, Content, Card, Text, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import { connect } from "react-redux"
import { categoryData, coverImageUrl, categoryID } from "../../../store/action/action"




const database = firebase.database().ref("/")
class CategoryListComponent extends Component {
    constructor() {
        super()
        this.state = {
            dialogVisible: false,
            modalVisible: false,
            num: 0,
            selected: [],
            coverImageUrl: "",
            newCategoryVal: "",
            cancleCoverData: ""
        }
    }

    ViewCategory(value, index) {
        let productsArr = []
        let valueProducts = value.Products
        for (let key in value.Products) {
            productsArr.push({ ...valueProducts[key], key })
        }
        this.props.categoryData(productsArr)
        this.props.coverImageUrl(value.coverImageUrl)
        this.props.categoryID(value.key)
        this.props.navigation.navigate("ProductComponent")
    }

    render() {
        return (
            <Container>
                <Content style={{ backgroundColor: "#f2f2f2" }} >
                    <View style={styles.categoryGridComponent} >
                        {this.props.catogery_List.categoryList.map((value, index) => {
                            return (
                                <TouchableOpacity style={styles.categoryList} key={index}
                                    onPress={this.ViewCategory.bind(this, value)}
                                    activeOpacity={0.5}>
                                    <Text style={styles.categoryListLText} >
                                        {value.newCategoryVal}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    categoryGridComponent: {
        justifyContent: 'center',
        backgroundColor: "#f2f2f2",
        flex: 1,
    },
    categoryList: {
        height: 50,
        justifyContent: "center",
        paddingLeft: "5%",
        borderBottomWidth: .5,
        borderBottomColor: "#7d7d7d",
        backgroundColor: "#f2f2f2",
    },
    categoryListLText: {
        color: "#7d7d7d",
        fontSize: 20,
    }
});





const mapStateToProp = (state) => {
    return ({
        catogery_List: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryData: (data) => {
            dispatch(categoryData(data))
        },
        coverImageUrl: (data) => {
            dispatch(coverImageUrl(data))
        },
        categoryID: (data) => {
            dispatch(categoryID(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(CategoryListComponent)

