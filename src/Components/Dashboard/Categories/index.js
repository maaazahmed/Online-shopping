import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Modal,
    PermissionsAndroid
} from 'react-native';
// import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";
import { Container, Content, Card, Text, Icon } from 'native-base';
// import Icons from 'react-native-vector-icons/dist/FontAwesome';
// import { Dialog } from 'react-native-simple-dialogs';
import { connect } from "react-redux"
import { categoryData, coverImageUrl, categoryID } from "../../../store/action/action"




const database = firebase.database().ref("/")
class CategoryCardComponent extends Component {
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
                <Content>
                    <View style={styles.categoryGridComponent} >
                        {this.props.catogery_List.categoryList.map((value, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    onPress={this.ViewCategory.bind(this, value, index)}
                                    activeOpacity={0.8}>
                                    <Card style={styles.categoryCard} >
                                        <ImageBackground
                                            resizeMode="cover"
                                            source={{ uri: value.coverImageUrl }}
                                            style={styles.ImageBackground} >
                                            <TouchableOpacity
                                                onPress={this.ViewCategory.bind(this, value, index)}
                                                activeOpacity={0.7} style={styles.CardItemView} >
                                                <Text style={styles.CardItemText} >
                                                    {value.newCategoryVal}
                                                </Text>
                                                <Text style={styles.CardItemText} >
                                                    Products :{index}
                                                </Text>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </Card>
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
    categoryGridComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 5,

    },
    ImageBackground: {
        height: Dimensions.get("window").height / 4.3,
        width: Dimensions.get("window").width / 2 - 10,
        justifyContent: "flex-end",
    },
    categoryCard: {
        width: Dimensions.get("window").width / 2 - 10,
        height: Dimensions.get("window").height / 4.3,
        backgroundColor: "#fff",
        marginBottom: 0,
        elevation: 20,

    },
    demoCardContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        elevation: 10,
        borderRadius: 5,
        paddingBottom: 15
    },
    CardItemView: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",

    },

    CardItemText: {
        color: "#fff",
        marginLeft: 4,
        marginRight: 4
    },
    addButtonConstainer: {
        height: 65,
        width: 65,
        backgroundColor: "#f2f2f2",
        borderRadius: 100,
        position: "absolute",
        bottom: 35,
        right: 35,
        elevation: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    addButtonText: {
        color: "#00bcd4",
        fontSize: 40
    },
    DialogContent: {
        borderColor: "#00bcd4",
    },
    TextInput: {
        borderColor: "#00bcd4",
        borderWidth: 1,
        height: 57,
        borderRadius: 5,
        color: "#00bcd4",
        backgroundColor: "#fff",
        fontSize: 19,
        paddingLeft: 10,
        elevation: 5,
    },
    imagePickerCntainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        elevation: 5
    },
    imagePickerButton: {
        alignItems: "center",
        justifyContent: "center"
    },
    imagePickerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00bcd4"
    },
    btnView: {
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
        marginTop: 20
    },
    addBtn: {
        backgroundColor: "#fff",
        width: "40%",
        padding: 12,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        borderRadius: 5
    },
    addBtnText: {
        color: "#00bcd4",
        fontSize: 20
    },
    cancleView: {
        alignItems: "flex-end",
    },
    galleryContainer: {
        backgroundColor: "#fff",
        flex: 1
    },
    cancleCoverImage: {
        justifyContent: "center",
        alignContent: "flex-start",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "rgba(250, 250, 250, .5)",
        padding: 10,
        width: "50%",
        height: "55%",
        marginBottom: 20,
        borderRadius: 100
    },

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
export default connect(mapStateToProp, mapDispatchToProp)(CategoryCardComponent)

