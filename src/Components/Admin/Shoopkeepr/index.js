import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Right
} from 'native-base';
import { BarIndicator } from 'react-native-indicators';
import firebase from "react-native-firebase";
import { connect } from "react-redux";
import { requestList } from "../../../store/action/action"

const database = firebase.database().ref("/")
class ShoopKeeperList extends Component {

    constructor() {
        super()
        this.state = {
            modalVisible: false,
            requestListLength: 0,
            isLoader: false
        }
    }


    componentWillMount() {
        database.child("Shoopkeeper-Reques").on("value", (snap) => {
            let obj = snap.val()
            userArr = []
            for (let key in obj) {
                userArr.push({ ...obj[key], key })
            }
            this.props.requestList(userArr)
            this.setState({
                requestListLength: userArr.length,
                isLoader: true
            })
        })
    }


    approve(user, index) {
        let requestList = this.props.PandingRequestList.requestList
        let newRequestList = requestList.slice(0, index).concat(requestList.slice(index + 1))
        firebase.auth().createUserWithEmailAndPassword(user.Email, user.Password)
            .then((res) => {
                database.child(`user/${res._user.uid}`).set(user)
                    .then(() => {
                        database.child(`Shoopkeeper-Reques/${user.key}`).remove()
                        this.props.requestList(newRequestList)
                    })
            }).catch((error) => {
                alert(error)
            });
    }

    reject(user, index) {
        let requestList = this.props.PandingRequestList.requestList
        let newRequestList = requestList.slice(0, index).concat(requestList.slice(index + 1))
        database.child(`Shoopkeeper-Reques/${user.key}`).remove()
        this.props.requestList(newRequestList)
    }
    render() {
        console.log(this.state.requestListLength)


        return (
            (this.state.isLoader) ?
                <Container>
                    {(this.state.requestListLength > 0) ?
                        <Content>
                            {
                                this.props.PandingRequestList.requestList.map((val, index) => {
                                    return (
                                        <Card key={index} style={styles.Card}>
                                            <CardItem>
                                                <Left>
                                                    <Thumbnail source={{ uri: val.profilePic }} />
                                                    <Body>
                                                        <Text>{val.Username}</Text>
                                                        <Text note>{val.userType}</Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    <Body>
                                                        <View style={styles.CardButtun} >
                                                            <TouchableOpacity
                                                                onPress={this.reject.bind(this, val, index)}
                                                                activeOpacity={0.8} style={styles.rejectButt}>
                                                                <Text style={styles.rejectText}>
                                                                    Reject
                                                            </Text>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity
                                                                onPress={this.approve.bind(this, val, index)}
                                                                activeOpacity={0.8}
                                                                style={styles.aprovButt} >
                                                                <Text style={styles.aprovText} >
                                                                    Approve
                                                         </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </Body>
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    )
                                })
                            }
                        </Content>
                        :
                        <Content style={{ backgroundColor: "#e4e4e4" }} >
                            <View style={styles.noResult}>
                                <Image
                                    resizeMode="center"
                                    style={styles.noResultImage}
                                    source={require("./image/nouser.png")} />
                                <Text style={{ fontSize: 28, color: "gray", marginTop: -80 }} >
                                    No Request
                                </Text>
                                <Text style={{ fontSize: 18, color: "#8a8a8a", marginTop: 10 }} >
                                    No Seller request in your List yet!
                                </Text>
                            </View>
                            
                        </Content>}
                </Container>
                :
                <Container>
                    <View style={styles.row}>
                        <BarIndicator color='#00bcd4' count={6} />
                    </View>
                </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: 600
    },
    Card: {
        marginBottom: 0,
        elevation: 0,
    },

    CardButtun: {
        flexDirection: "row",
    },

    aprovButt: {
        margin: 5,
        marginTop: 10,
        backgroundColor: "#00bcd4",
        padding: 5,
        borderRadius: 3,
        elevation: 5,
        width: 90,
        justifyContent: "center",
        alignItems: "center"
    },
    aprovText: {
        color: "#fff"
    },
    rejectButt: {
        margin: 5,
        marginTop: 10,
        backgroundColor: "#fff",
        padding: 5,
        borderRadius: 3,
        elevation: 4,
        width: 90,
        justifyContent: "center",
        alignItems: "center",
    },
    rejectText: {
        color: "gray"
    },
    noResult: {
        flex: 1,
        backgroundColor: "#e4e4e4",
        // #e4e4e4
        justifyContent: "center",
        alignItems: "center",
        // height: Dimensions.get("window").height
    },
    noResultImage: {
        width: 300,
        height: 300,
        opacity: 0.4,
        marginTop: 150
    },
    container: {
        flex: 1,
        backgroundColor: '#01579B',
        padding: 20,
    },

    row: {
        flex: 1,
        // height:Dimensions.get("window").height,
        backgroundColor: "#f2f2f2",
        // marginTop:80
        // flex:2,
        // flexDirection: 'row',
        // alignItems:"center",
        // flexDirection:"row"
    },

    reverse: {
        transform: [{
            rotate: '180deg',
        }],
    },
});

const mapStateToProp = (state) => {
    return ({
        PandingRequestList: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        requestList: (data) => {
            dispatch(requestList(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(ShoopKeeperList)
