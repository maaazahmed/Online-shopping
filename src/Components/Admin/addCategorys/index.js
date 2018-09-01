import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    Dimensions,
    Image,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    CameraRoll,
    Modal,
    PermissionsAndroid
} from 'react-native';
import CameraRollPicker from 'react-native-camera-roll-picker';
import firebase from "react-native-firebase";


import { Container, Header, Body, Title, Content, Card, CardItem, Text, Icon } from 'native-base';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import { Dialog } from 'react-native-simple-dialogs';





export default class AddCategory extends Component {
    constructor() {
        super()
        this.state = {
            dialogVisible: false,
            modalVisible: false,
            num: 0,
            selected: [],
            coverImageUrl: "",
            newCategoryVal: ""
        }
    }


    componentWillMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'Cool App ...',
                'message': 'App needs access to external storage'
            }
        ).then(() => this.setState({ permit: true }))
    }



    getSelectedImages(images, current) {
        var num = images.length;

        this.setState({
            num: num,
            selected: images,
        });
        this.setState({
            coverImageUrl: current.uri,
            modalVisible: false
        })
    }





    ViewCategory() {
        alert("Laptop")
    }

    suploadImage() {
        this.setState({
            modalVisible: true
        })
    }

    submitCategory(){
        // RNFetchBlob.fs
        // .readFile(source.uri, 'base64')
        // .then((data) => {
        //     console.log(data)
        // }).catch((a) => console.warn("errrrrCCC", a));
    }


    render() {
        let arr = []
        for (var i = 0; i < 23; i++) {
            arr.push(
                <TouchableOpacity onPress={this.ViewCategory.bind(this)} activeOpacity={0.8}>
                    <Card style={styles.categoryCard} >
                        <ImageBackground
                            resizeMode="cover"
                            source={{ uri: this.state.coverImageUrl }}
                            style={styles.ImageBackground} >
                            <TouchableOpacity onPress={this.ViewCategory.bind(this)} activeOpacity={0.7} style={styles.CardItemView} >
                                <Text style={styles.CardItemText} >
                                    Laptop
                                </Text>
                                <Text style={styles.CardItemText} >
                                    Items :10
                                </Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </Card>
                </TouchableOpacity>
            )
        }

        return (
            <Container>
                <Content style={{}} >
                    <View style={styles.categoryGridComponent} >
                        {arr}
                    </View>
                </Content>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { this.setState({ dialogVisible: !this.state.dialogVisible }) }}
                    style={styles.addButtonConstainer} >
                    <Text style={styles.addButtonText} >
                        +
                        </Text>
                </TouchableOpacity>
                <View>
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
                                            onPress={this.suploadImage.bind(this)}
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

                                                <View onPress={this.ViewCategory.bind(this)} activeOpacity={0.7} style={styles.CardItemView} >
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


                </View>
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
        paddingBottom: 15

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
        // flex: 1,
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

    TextInputContainer: {

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
