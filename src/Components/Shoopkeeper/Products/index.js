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
    Image
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";
import { Container, Content, Card, Text, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import { connect } from "react-redux"
import { myProducts } from "../../../store/action/action"




const database = firebase.database().ref("/")
class Products extends Component {
    constructor() {
        super()
        this.state = {
            num: 0,
            selected: [],
            coverImageUrl: "",
            newCategoryVal: "",
            cancleCoverData: "",
            currentUser: ""
        }
    }


    ViewCategory() {
        alert("Laptop")
    }

    uploadImage() {
        this.setState({
            modalVisible: true
        })
    }



    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    currentUser: user.uid
                })
            }
        });
        database.child("Categorys").on("value", (snap) => {
            let obj = snap.val()
            let categoryArr = []
            for (let key in obj) {
                categoryArr.push({ ...obj[key], key })
            }
            let myProduct = []
            categoryArr.map((val) => {
                for (let key in val.Products) {
                    // console.log(val.Products[key].shopkeeperID ,"===", this.state.currentUser)
                    if (val.Products[key].shopkeeperID === this.state.currentUser) {
                        myProduct.push({ ...val.Products[key], key })
                    }
                }
            })
            this.props.myProducts(myProduct)
        })

    }

    viewOrders(value) {
        for(let key in value.SoldProducts){
            console.log(value.SoldProducts[key],"////////////////////")
        }
        // this.props.navigation.navigate("Vieworders")
    }




    render() {
        let myProducts_List = this.props.myProducts_List.myProducts
        return (
            <Container>
                <Content>
                    <View style={styles.categoryGridComponent} >
                        {myProducts_List.map((value, index) => {
                            return (
                                <View key={index}
                                    activeOpacity={0.8}>
                                    <Card style={styles.categoryCard} >
                                        <View style={styles.CardViewImage} >
                                            <Image
                                                resizeMode="contain"
                                                source={{ uri: value.coverImageUrl }}
                                                style={styles.ImageBackground} />
                                        </View>
                                        <View style={styles.producDetailView} >
                                            <View style={styles.producDetaContain} >
                                                <Text style={styles.nameText} >{value.productNameVal}</Text>
                                                <Text style={styles.modleText} >{value.modalNumVal}</Text>
                                                <Text style={styles.priceText} >{value.priceVal}</Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={this.viewOrders.bind(this, value)}
                                                activeOpacity={0.5} style={styles.bayBtnView}   >
                                                <Icon name='clipboard' style={{ color: "#00bcd4", fontSize: 35 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                </View>
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

    categoryGridComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 5,
    },


    categoryCard: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
        backgroundColor: "#fff",
        marginBottom: 0,
        elevation: 0,
        marginTop: 1,
    },

    CardViewImage: {
        flex: 2
    },
    ImageBackground: {
        height: "90%",
        height: "90%",
        justifyContent: "flex-start",
        margin: "3%",
    },
    producDetailView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2.5%",
        alignContent: "center",
        flex: 1,
    },
    producDetaContain: {
        justifyContent: "center"
    },
    nameText: {
        color: "gray",
        fontSize: 15,
    },
    priceText: {
        color: "#00b91f",
        fontSize: 18,
        fontStyle: "italic"
    },
    modleText: {
        color: "#000",
        fontSize: 20,
    },
    bayBtnView: {
        justifyContent: "center",
        width: "8%",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        // padding: 4,
        // borderWidth: .5,
        // borderColor: "#00bcd4",
        // borderRadius: 4
    },
});





const mapStateToProp = (state) => {
    return ({
        myProducts_List: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        myProducts: (data) => {
            dispatch(myProducts(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Products)

