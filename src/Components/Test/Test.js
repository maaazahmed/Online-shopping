
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
} from 'react-native';




const HEADER_MAX_HEIGHT = 300;
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
          )}
        >
          {this._renderScrollViewContent()}
        </ScrollView>

        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] }]}
            source={require('./images/tect.png')} />
          <Animated.View>

          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
});