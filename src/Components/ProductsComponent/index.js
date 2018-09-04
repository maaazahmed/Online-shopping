import React, { Component } from 'react';
import {
    Animated,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    FlatList
} from 'react-native';
import { Container, Header, Body, Title, Content, Card, CardItem, Icon } from 'native-base';
import { connect } from "react-redux"




const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ProductComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrollY: new Animated.Value(0),
        };
    }

    _renderScrollViewContent() {
        const data = Array.from({ length: 30 });
        return (
            <View style={styles.scrollViewContent}>
                {data.map((_, i) =>
                    <View key={i} style={styles.row}>
                        <Text>{i}</Text>
                    </View>
                )}
            </View>
        );
    }

    componentWillMount() {
        console.log(this.props.catogeryData.categoryData, ".////")
        // console.log(this.props.categoryCoverImageUrl.coverImage)
    }

    render() {
        let categoryData = this.props.catogeryData.categoryData
        let arr = []
        for (var i = 0; i < 23; i++) {
            arr.push(
                <View key={i} activeOpacity={0.8}>
                    <Card style={styles.categoryCard} >
                        <View style={styles.CardViewImage} >
                            <Image
                                resizeMode="contain"
                                source={{ uri: "value.coverImageUrl" }}
                                source={require("./ttt.png")}

                                style={styles.ImageBackground} />
                        </View>
                        <View style={styles.producDetailView} >
                            <View style={styles.producDetaContain} >
                                <Text style={styles.nameText} >Nokia</Text>
                                <Text style={styles.modleText} >205-ATM-50</Text>
                                <Text style={styles.priceText} >$ 500</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} style={styles.bayBtnView}   >
                                <Icon name='add' style={{ color: "#00bcd4" }} />
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            )
        }





        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp',
        });


        const imageOpacity = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -50],
            extrapolate: 'clamp',
        });



        return (
            <View style={styles.fill}>
                <ScrollView
                
                    style={styles.fill}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
                    )}>

                    <View style={styles.categoryGridComponent} >
                        {categoryData.map((value, index) => {
                            return (
                                <View key={i} activeOpacity={0.8}>
                                    <Card style={styles.categoryCard} >
                                        <View style={styles.CardViewImage} >
                                            <Image
                                                resizeMode="contain"
                                                // source={{ uri: "" }}
                                                source={require("./ttt.png")}
                                                style={styles.ImageBackground} />
                                        </View>
                                        <View style={styles.producDetailView} >
                                            <View style={styles.producDetaContain} >
                                                <Text style={styles.nameText} >Nokia</Text>
                                                <Text style={styles.modleText} >205-ATM-50</Text>
                                                <Text style={styles.priceText} >$ 500</Text>
                                                {/* <Text style={styles.nameText} >{value.productNameVal}</Text>
                                                <Text style={styles.modleText} >{value.modalNumVal}</Text>
                                                <Text style={styles.priceText} >{value.priceVal}</Text> */}
                                            </View>
                                            <TouchableOpacity activeOpacity={0.5} style={styles.bayBtnView}   >
                                                <Icon name='add' style={{ color: "#00bcd4" }} />
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                </View>
                            )
                        })}
                        {arr}
                    </View>
                </ScrollView>
                <Animated.View style={[styles.header, { height: headerHeight }]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
                        source={{ uri: this.props.categoryCoverImageUrl.coverImage }} />
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate("Dashboard") }}
                        activeOpacity={0.6}  >
                        <View style={{ backgroundColor: "trancparant", padding: 17, }} >
                            <Icon name='arrow-back' style={{ color: "#fff" }} />
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00bcd4',
        overflow: 'hidden',
        elevation: 0.5,

    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    categoryCard: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height / 2,
        backgroundColor: "#fff",
        marginBottom: 0,
        elevation: 0,
        marginTop: 1,
        // justifyContent: "center"
        // paddingBottom:"10%"
    },
    ImageBackground: {
        // height: Dimensions.get("window").height / 4.3,
        // width: Dimensions.get("window").width / 2,
        height: "100%",
        height: "100%",
        justifyContent: "flex-start",
        // backgroundColor:"red",
        margin: "5%"
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
    categoryGridComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 0,
        marginTop: HEADER_MAX_HEIGHT
    },


    CardViewImage: {
        justifyContent: "center",
        alignItems: "center",
        flex: 2
    },
    producDetailView: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "2.5%",
        alignContent: "center",
        flex: 1
    },
    nameText: {
        color: "gray",
        fontSize: 15,

    },
    priceText: {
        color: "#00b91f",
        fontSize: 18,
        // fontWeight: "bold",
        fontStyle:"italic"
    },
    modleText: {
        color: "#000",
        fontSize: 20,
    },
    bayBtnView: {
        // backgroundColor:"red",
        justifyContent: "center",
        // height:"30%", 
        width: "8%",
        alignContent: "center",
        alignSelf: "center",
        alignItems: "center",
        padding: 4,
        borderWidth: .5,
        borderColor: "#00bcd4",
        borderRadius: 4
    },
    producDetaContain: {
        justifyContent: "center"
    }
});





const mapStateToProp = (state) => {
    return ({
        catogeryData: state.root,
        categoryCoverImageUrl: state.root,
    });
};
const mapDispatchToProp = (dispatch) => {
    return {
        // categoryData: (data) => {
        //     dispatch(categoryData(data))
        // },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(ProductComponent)
