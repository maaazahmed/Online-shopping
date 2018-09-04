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
import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";
import { Container, Content, Card, Text, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';
import { connect } from "react-redux"
// import { categoryList } from "../../../store/action/action"




const database = firebase.database().ref("/")
class Products extends Component {
    constructor() {
        super()
        this.state = {
            // dialogVisible: false,
            // modalVisible: false,
            num: 0,
            selected: [],
            coverImageUrl: "",
            newCategoryVal: "",
            cancleCoverData: ""
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
        // PermissionsAndroid.request(
        //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //     {
        //         'title': 'Cool App ...',
        //         'message': 'App needs access to external storage'
        //     }
        // ).then(() => this.setState({ permit: true }))


        database.child("Categorys").on("value", (snap) => {
            let obj = snap.val()
            let categoryArr = []
            for (let key in obj) {
                categoryArr.push({ ...obj[key], key })
            }

            let myProduct = []
            categoryArr.map((val)=>{
                for (let key in val.Products) {
                    myProduct.push({ ...val.Products[key], key })
                }
                console.log(myProduct,"=========")
            })
            // this.props.categoryList(categoryArr)
            // this.setState({
            //     categoryArrtListLength: categoryArr.length,
            //     isLoader: true
            // })
        })

    }



    // submitCategory() {
    //     let categotyObj = {
    //         newCategoryVal: this.state.newCategoryVal,
    //         Products: {}
    //     }
    //     if (categotyObj.newCategoryVal !== "" && this.state.coverImageUrl !== "") {


    //         firebase.auth().onAuthStateChanged((user) => {
    //             if (user) {
    //                 // User logged in.

    //                 const storageRef = firebase.storage().ref('/');
    //                 var file = this.state.coverImageUrl;
    //                 var metadata = {
    //                     contentType: 'image/jpeg'
    //                 };

    //                 var uploadTask = storageRef.child('images/' + Date.now()).put(file, metadata);
    //                 uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //                     function (snapshot) {
    //                         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                         switch (snapshot.state) {
    //                             case firebase.storage.TaskState.PAUSED:
    //                                 break;
    //                             case firebase.storage.TaskState.RUNNING:
    //                                 break;
    //                         }
    //                     }, function (error) {
    //                         switch (error.code) {
    //                             case 'storage/unauthorized':
    //                                 break;
    //                             case 'storage/canceled':
    //                                 break;
    //                             case 'storage/unknown':
    //                                 break;
    //                         }
    //                     }, (snapshot) => {
    //                         categotyObj.coverImageUrl = snapshot.downloadURL
    //                         database.child("/Categorys").push(categotyObj)
    //                         alert("Sussess")
    //                         this.setState({
    //                             dialogVisible: !this.state.dialogVisible
    //                         })
    //                     });
    //             } else {
    //                 alert("Please Login")
    //                 this.props.navigation.navigate("SignIp")
    //             }
    //         });

    //     }
    //     else {
    //         alert("Pleace Write something and select image")
    //     }
    // }

    render() {
        return (
            <Container>
                <Content>
                    <View style={styles.categoryGridComponent} >
                        {this.props.catogery_List.categoryList.map((value, index) => {
                            return (
                                <TouchableOpacity key={index}
                                    onPress={this.ViewCategory.bind(this)}
                                    activeOpacity={0.8}>
                                    <Card style={styles.categoryCard} >
                                        <ImageBackground
                                            resizeMode="cover"
                                            source={{ uri: value.coverImageUrl }}
                                            style={styles.ImageBackground} >
                                            <TouchableOpacity
                                                onPress={this.ViewCategory.bind(this)}
                                                activeOpacity={0.7} style={styles.CardItemView} >
                                                <Text style={styles.CardItemText} >
                                                    {value.newCategoryVal}
                                                </Text>
                                                <Text style={styles.CardItemText} >
                                                    Items :{index}
                                                </Text>
                                            </TouchableOpacity>
                                        </ImageBackground>
                                    </Card>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </Content>
                {/* <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { this.setState({ dialogVisible: !this.state.dialogVisible }) }}
                    style={styles.addButtonConstainer} >
                    <Text style={styles.addButtonText} >
                        +
                        </Text>
                </TouchableOpacity> */}
                {/* <View>
                    <Dialog
                        animationType="fade"
                        visible={this.state.dialogVisible}
                        onTouchOutside={() => this.setState({ dialogVisible: false })} >
                        <TouchableOpacity
                            onPress={() => { this.setState({ dialogVisible: !this.state.dialogVisible }) }}
                            activeOpacity={0.6} style={styles.cancleView} >
                            <Icon style={{ color: "#fff" }} size={30} name='md-close' />
                        </TouchableOpacity>
                        <View style={styles.DialogContent} >
                            <View style={{ marginTop: 20 }} >
                                <View style={styles.TextInputContainer}>
                                    <TextInput
                                        value={this.state.newCategoryVal}
                                        style={styles.TextInput}
                                        underlineColorAndroid="transparent"
                                        placeholderTextColor="#00bcd4"
                                        onChangeText={(newCategoryVal) => { this.setState({ newCategoryVal }) }}
                                        placeholder="Add catogery" />
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

                                                <View activeOpacity={0.7} style={styles.CardItemView} >
                                                    <Text style={styles.CardItemText} >
                                                        Laptop
                                                 </Text>
                                                    <Text style={styles.CardItemText} >
                                                        Items :0
                                                </Text>
                                                </View>
                                            </ImageBackground>
                                        </Card>
                                    </View>
                                }
                            </View>
                            <View style={styles.btnView} >
                                <TouchableOpacity
                                    onPress={this.submitCategory.bind(this)}
                                    activeOpacity={0.6}
                                    style={styles.addBtn} >
                                    <Text style={styles.addBtnText} >Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Dialog>

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
                </View> */}
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
        marginBottom: 5
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
        paddingBottom: 15,

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
        // categoryList: (data) => {
        //     dispatch(categoryList(data))
        // },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(Products)

