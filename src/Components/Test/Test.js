
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid
} from 'react-native';

import CameraRollPicker from 'react-native-camera-roll-picker';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      selected: [],
    };
  }

componentWillMount(){
  PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    {
         'title': 'Cool App ...',
         'message': 'App needs access to external storage'
     }
).then(()=>this.setState({permit:true}))
}
  getSelectedImages(images, current) {
    var num = images.length;

    this.setState({
      num: num,
      selected: images,
    });

    console.log(current);
    console.log(this.state.selected);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.text}>
            <Text style={styles.bold}> {this.state.num} </Text> images has been selected
          </Text>
        </View>
        {this.state.permit&&
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6AE2D',
  },
  content: {
    marginTop: 15,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    alignItems: 'center',
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold',
  },
  info: {
    fontSize: 12,
  },
});
