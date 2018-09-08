import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Modal,
    PermissionsAndroid
} from 'react-native';
import { Content, Card, Icon } from 'native-base';
import firebase from "react-native-firebase";
import { BarIndicator } from 'react-native-indicators';
import { connect } from "react-redux"
import { categoryID } from "../../../store/action/action"
import CameraRollPicker from 'react-native-camera-roll-picker';
import Icons from 'react-native-vector-icons/dist/FontAwesome';



const database = firebase.database().ref("/")
class AddProduct extends Component {
    constructor() {
        super()
        this.state = {
            // categoryVal: "",
            SelectedCategory: "Selecte Category",
            sellerNameVal: "",
            productNameVal: "",
            priceVal: "",
            discriptionVal: "",
            modalNumVal: "",
            isLoader: false,
            dialogVisible: false,
            modalVisible: false,
            coverImageUrl: "",
            currentUser: "",

        }
    }

    componentWillMount() {
        /*PermissionsAndroid***************************************************/
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Cool App ...',
                'message': 'App needs access to external storage'
            }
        ).then(() => this.setState({ permit: true }))
        /*PermissionsAndroid***************************************************/
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // database.child(`user${user.uid}`)
                this.setState({
                    currentUser: user.uid
                })
            }
        });

    }

    showCategory() {
        this.setState({
            dialogVisible: true,
        })
    }
    selecteCategory(value, index) {
        this.setState({
            SelectedCategory: value.newCategoryVal,
            dialogVisible: false,
        })
        this.props.categoryID(value.key)
    }



    ProductCancle() {
        this.setState({
            dialogVisible: false,
            SelectedCategory: "Selecte Category",
        })
    }
    getSelectedImages(images, current) {
        this.setState({
            coverImageUrl: current.uri,
            modalVisible: false
        })
    }
    uploadImage() {
        this.setState({
            modalVisible: true
        })
    }
    add_PRODUCT() {



        let productObj = {
            categoryVal: this.state.SelectedCategory,
            productNameVal: this.state.productNameVal,
            priceVal: this.state.priceVal,
            modalNumVal: this.state.modalNumVal,
            shopkeeperID: this.state.currentUser,
            categoryID: this.props.category_ID.categoryID
        }

        const categoryID = this.props.category_ID.categoryID

        if (productObj.categoryVal !== "Selecte Category" && productObj.productNameVal !== "" && productObj.priceVal !== "" && productObj.modalNumVal !== "" && this.state.coverImageUrl !== "") {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log(productObj, "=========")
                    const storageRef = firebase.storage().ref('/');
                    var file = this.state.coverImageUrl;
                    var metadata = {
                        contentType: 'image/jpeg' | 'image/png',
                    };

                    var uploadTask = storageRef.child('images/' + Date.now()).put(file, metadata);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        function (snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED:
                                    break;
                                case firebase.storage.TaskState.RUNNING:
                                    break;
                            }
                        }, function (error) {
                            switch (error.code) {
                                case 'storage/unauthorized':
                                    break;
                                case 'storage/canceled':
                                    break;
                                case 'storage/unknown':
                                    break;
                            }
                        }, (snapshot) => {
                            productObj.coverImageUrl = snapshot.downloadURL;
                            database.child(`Categorys/${categoryID}/Products/`).push(productObj)
                            this.setState({
                                categoryVal: "Selecte Category",
                                sellerNameVal: "",
                                productNameVal: "",
                                priceVal: "",
                                discriptionVal: "",
                                modalNumVal: "",
                            })
                        });

                }
                else {
                    alert("Please Login")
                    this.props.navigation.navigate("SignIp")
                }
            })
        }
        else {
            alert("Requierd all feilds")
        }
    }





    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImg}
                    source={{ uri: "https://webdesignledger.com/wp-content/uploads/2015/08/Web-Design-Ledger-200px-tall.png" }}
                    resizeMode="cover">
                    <Content>
                        <View style={styles.TextInputContainer} >
                            <View style={styles.categoryModal} >
                                <TouchableOpacity
                                    onPress={this.showCategory.bind(this)}
                                    activeOpacity={0.6}
                                    style={styles.SelectedCategoryBtn} >
                                    <Text style={styles.SelectedCategoryText} >
                                        {this.state.SelectedCategory}
                                    </Text>
                                    <Icon name="arrow-dropdown" style={{ color: "#00bcd4", fontSize: 30 }} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.TextInputView}>
                                <TextInput
                                    value={this.state.productNameVal}
                                    onChangeText={(productNameVal) => this.setState({ productNameVal })}
                                    style={styles.TextInput}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#00bcd4"
                                    placeholder="Product name" />
                            </View>
                            <View style={styles.TextInputView}>
                                <TextInput
                                    value={this.state.modalNumVal}
                                    onChangeText={(modalNumVal) => this.setState({ modalNumVal })}
                                    style={styles.TextInput}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#00bcd4"
                                    placeholder="Model" />
                            </View>
                            <View style={styles.TextInputView}>
                                <TextInput
                                    value={this.state.priceVal}
                                    onChangeText={(priceVal) => this.setState({ priceVal })}
                                    style={styles.TextInput}
                                    underlineColorAndroid="transparent"
                                    placeholderTextColor="#00bcd4"
                                    placeholder="Price" />
                            </View>

                            {(this.state.coverImageUrl == "") ?
                                <View style={styles.imagePickerCntainer} >
                                    <TouchableOpacity
                                        onPress={this.uploadImage.bind(this)}
                                        activeOpacity={0.6}
                                        style={styles.imagePickerButton}>
                                        <View>
                                            <Icons color="#00bcd4" size={130} name='upload' />
                                        </View>
                                        <View>
                                            <Text style={styles.imagePickerText} >Uploade Photo</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.demoCardContainer} >
                                    <Card style={styles.categoryCard} >
                                        <ImageBackground
                                            resizeMode="cover"
                                            source={{ uri: this.state.coverImageUrl }}
                                            style={styles.ImageBackground} >

                                            <TouchableOpacity
                                                activeOpacity={0.5}
                                                onPress={() => { this.setState({ coverImageUrl: "" }) }}
                                                style={styles.cancleCoverImage} >
                                                <Icon
                                                    style={{ color: "#00bcd4", fontSize: 70 }}
                                                    name='md-close' />
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </Card>
                                </View>
                            }


                            <View style={styles.RegisterBtnView}>
                                <TouchableOpacity onPress={this.add_PRODUCT.bind(this)}
                                    activeOpacity={0.8} style={styles.btnRegister} bordered success>
                                    <Text style={styles.btnRegisterText} >SUBMIT</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                        <View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={this.state.dialogVisible}
                                onTouchOutside={() => this.setState({ dialogVisible: false })} >
                                <View style={styles.DialogContainer} >
                                    <View style={styles.DialogContent} >
                                        < View style={styles.ProductCancleBtnView} >
                                            <TouchableOpacity
                                                onPress={this.ProductCancle.bind(this)}
                                                style={styles.ProductCancleBtn} >
                                                <Icon style={{ color: "#fff" }}
                                                    size={30} name='md-close' />
                                            </TouchableOpacity>
                                        </View >
                                        <ScrollView>
                                            {this.props.catogery_List.categoryList.map((value, index) => {
                                                return (
                                                    <TouchableOpacity
                                                        onPress={this.selecteCategory.bind(this, value, index)}
                                                        activeOpacity={0.6}
                                                        style={styles.categoryList}
                                                        key={index} >
                                                        <Text style={styles.categoryListText} >
                                                            {value.newCategoryVal}
                                                        </Text>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                        </ScrollView>
                                    </View>
                                </View>
                            </Modal>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    alert('Modal has been closed.');
                                }}>
                                <View style={styles.galleryContainer} >
                                    {this.state.permit &&
                                        <CameraRollPicker
                                            scrollRenderAheadDistance={500}
                                            initialListSize={1}
                                            pageSize={3}
                                            removeClippedSubviews={false}
                                            groupTypes='SavedPhotos'
                                            batchSize={5}
                                            maximum={3}
                                            selected={this.state.selected}
                                            assetType='Photos'
                                            imagesPerRow={3}
                                            imageMargin={5}
                                            callback={this.getSelectedImages.bind(this)} />
                                    }
                                </View>
                            </Modal>
                        </View>
                    </Content>
                </ImageBackground>
                {(this.state.isLoader) ?
                    <View style={styles.lodaerStyle} >
                        <BarIndicator color='#00bcd4' count={6} />
                    </View>
                    : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darazHeading: {
        fontSize: 50,
        textAlign: 'center',
        color: "#fff",
        fontWeight: "bold"
    },
    galleryContainer: {
        backgroundColor: "#fff",
        flex: 1
    },

    backgroundImg: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: "#00bcd4"
    },

    darazHeadingContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
    },
    TextInputContainer: {
        marginLeft: 12,
        marginRight: 12,
    },

    TextInputView: {
        marginTop: 15
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
        elevation: 5
    },
    RegisterBtnView: {
        margin: 12,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    btnRegister: {
        backgroundColor: "#00bcd4",
        width: Dimensions.get('window').width / 2.5,
        borderRadius: 4,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5
    },
    btnRegisterText: {
        color: "#fff",
        fontSize: 20
    },
    RadioContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    RadiobtnView: {
        width: Dimensions.get('window').width / 3,
        flexDirection: "row",
        justifyContent: "space-around"
    },

    RadiobtnText: {
        color: "#fff",
        fontSize: 20,
    },
    lodaerStyle: {
        position: "absolute",
        flex: 1,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    categoryModal: {
        height: 57,
        borderColor: "#00bcd4",
        borderWidth: 1,
        backgroundColor: "#fff",
        marginTop: 20,
        elevation: 5,
        borderRadius: 5,
        justifyContent: "center",
    },
    SelectedCategoryBtn: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "space-between",
        flexDirection:"row",
        alignItems:"center"
    },
    SelectedCategoryText: {
        fontSize: 19,
        color: "#00bcd4",
    },
    categoryList: {
        height: 65,
        borderColor: "#fff",
        borderBottomWidth: 1,
        justifyContent: "center",
        backgroundColor: "#00bcd4",
        paddingLeft: "3%"
    },
    categoryListText: {
        color: "#fff",
        fontSize: 20
    },
    ProductCancleBtn: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    DialogContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0 , 0.4)",
        justifyContent: "center",
        alignItems: "center"
    },
    DialogContent: {
        backgroundColor: "#00bcd4",
        width: "90%",
        height: "90%",
        elevation: 20
    },
    ProductCancleBtnView: {
        marginTop: 10,
        marginRight: 20,
        marginBottom: 10,
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
    imagePickerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#00bcd4"
    },
    imagePickerButton: {
        alignItems: "center",
        justifyContent: "center"
    },
    demoCardContainer: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginTop: 20,
        // elevation: 10,
        borderRadius: 5,
        paddingBottom: 15
    },
    categoryCard: {
        width: Dimensions.get("window").width / 2 - 10,
        height: Dimensions.get("window").height / 4.3,
        backgroundColor: "#fff",
        marginBottom: 0,
    },
    ImageBackground: {
        height: Dimensions.get("window").height / 4.3,
        width: Dimensions.get("window").width / 2 - 10,
        justifyContent: "flex-end",
    },
    CardItemView: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: 40,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    CardItemText: {
        color: "#fff",
        marginLeft: 4,
        marginRight: 4
    },
    cancleCoverImage: {
        justifyContent: "center",
        alignContent: "flex-start",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "rgba(250, 250, 250, .5)",
        padding: 10,
        width: "45%",
        height: "50%",
        marginBottom: 45,
        borderRadius: 100
    },
});


const mapStateToProp = (state) => {
    return ({
        catogery_List: state.root,
        category_ID: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        categoryID: (data) => {
            dispatch(categoryID(data))
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(AddProduct)





