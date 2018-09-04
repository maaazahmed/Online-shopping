
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   PermissionsAndroid
// } from 'react-native';

// import CameraRollPicker from 'react-native-camera-roll-picker';

// export default class TestComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       num: 0,
//       selected: [],
//     };
//   }

// componentWillMount(){
//   PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//     {
//          'title': 'Cool App ...',
//          'message': 'App needs access to external storage'
//      }
// ).then(()=>this.setState({permit:true}))
// }
//   getSelectedImages(images, current) {
//     var num = images.length;

//     this.setState({
//       num: num,
//       selected: images,
//     });

//     console.log(current);
//     console.log(this.state.selected);
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <Text style={styles.text}>
//             <Text style={styles.bold}> {this.state.num} </Text> images has been selected
//           </Text>
//         </View>
//         {this.state.permit&&
//         <CameraRollPicker
//         scrollRenderAheadDistance={500}
//         initialListSize={1}
//         pageSize={3}
//         removeClippedSubviews={false}
//         groupTypes='SavedPhotos'
//         batchSize={5}
//         maximum={3}
//         selected={this.state.selected}
//         assetType='Photos'
//         imagesPerRow={3}
//         imageMargin={5}
//         callback={this.getSelectedImages.bind(this)} />
//       }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F6AE2D',
//   },
//   content: {
//     marginTop: 15,
//     height: 50,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexWrap: 'wrap',
//   },
//   text: {
//     fontSize: 16,
//     alignItems: 'center',
//     color: '#fff',
//   },
//   bold: {
//     fontWeight: 'bold',
//   },
//   info: {
//     fontSize: 12,
//   },
// });






// import React, { Component } from 'react';
// import {
//   Animated,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';





// const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = 60;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// export default class ScrollableHeader extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       scrollY: new Animated.Value(0),
//     };
//   }

//   _renderScrollViewContent() {
//     const data = Array.from({ length: 30 });
//     return (
//       <View style={styles.scrollViewContent}>
//         {data.map((_, i) =>
//           <View key={i} style={styles.row}>
//             <Text>{i}</Text>
//           </View>
//         )}
//       </View>
//     );
//   }

//   render() {
//     const headerHeight = this.state.scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE],
//       outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//       extrapolate: 'clamp',
//     });


//     const imageOpacity = this.state.scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//       outputRange: [1, 1, 0],
//       extrapolate: 'clamp',
//     });
//     const imageTranslate = this.state.scrollY.interpolate({
//       inputRange: [0, HEADER_SCROLL_DISTANCE],
//       outputRange: [0, -50],
//       extrapolate: 'clamp',
//     });



//     return (
//       <View style={styles.fill}>
//         <ScrollView
//           style={styles.fill}
//           scrollEventThrottle={16}
//           onScroll={Animated.event(
//             [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }]
//           )}
//         >
//           {this._renderScrollViewContent()}
//         </ScrollView>
//         <Animated.View style={[styles.header, {height: headerHeight}]}>
//           <View style={styles.bar}>
//             <Text style={styles.title}>Title</Text>
//           </View>
//         </Animated.View>
//       </View>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   fill: {
//     flex: 1,
//   },
//   row: {
//     height: 40,
//     margin: 16,
//     backgroundColor: '#D3D3D3',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#03A9F4',
//     overflow: 'hidden',
//   },
//   bar: {
//     marginTop: 28,
//     height: 32,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     backgroundColor: 'transparent',
//     color: 'white',
//     fontSize: 18,
//   },
//   scrollViewContent: {
//     marginTop: HEADER_MAX_HEIGHT,
//   },
// });











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
  ImageBackground
} from 'react-native';
import { Container, Header, Body, Title, Content, Card, CardItem, Icon } from 'native-base';




const HEADER_MAX_HEIGHT = 230;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollableHeader extends Component {
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

  render() {




    let arr = []
    for (var i = 0; i < 23; i++) {
      arr.push(
        <TouchableOpacity key={i} activeOpacity={0.8}>
          <Card style={styles.categoryCard} >
            <ImageBackground
              resizeMode="cover"
              source={require("./images/cadimg.jpg")}
              style={styles.ImageBackground} >
              <TouchableOpacity activeOpacity={0.7} style={styles.CardItemView} >
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
            {arr}
          </View>
        </ScrollView>

        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
            source={require('./images/test.jpeg')} />
          <TouchableOpacity activeOpacity={0.6} style={styles.backErrowIcon} >
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
  // row: {
  //   height: 40,
  //   margin: 16,
  //   backgroundColor: 'green',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#00bcd4',
    // backgroundColor: 'rgba(250, 250, 250 , 0.8)',
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
    // justifyContent:"center",
    // alignItems:"center"
  },




  categoryCard: {
    width: Dimensions.get("window").width / 2 - 5,
    height: Dimensions.get("window").height / 4.3,
    backgroundColor: "#fff",
    marginBottom: 0,
    elevation: 0,
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
  categoryGridComponent: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 0,
    marginTop: HEADER_MAX_HEIGHT
  },

  backErrowIcon:{
    //  backgroundColor:"rgba(0, 188, 212, 0.5)",
    // //  padding:3,
    //  borderRadius: 100,
    //  width:60 ,
    //  margin:4
  }

});