
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { Button } from 'react-native-elements';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

import styles from './styles';
import { getDataModel } from '../../data/dataModel';

export default class CameraScreen extends React.Component {

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();

    this.index = this.props.navigation.getParam('index');

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };  
  }

  componentDidMount() {
    this.getPermissions();
  }

  getPermissions = async () => {
    let cameraPerms = await Permissions.askAsync(Permissions.CAMERA);

    let permGranted = cameraPerms.status === 'granted';
    this.setState({
      hasCameraPermission: permGranted
    });
  }

  handleTakePicture = async () => {
    let picData = await this.camera.takePictureAsync();
    let img_url = await this.dataModel.addChatImage(picData);
    this.props.navigation.navigate('AddRecipe', {operation:'Upload Image', index: this.index, url: img_url});
  }

  setupCamera = async (cameraRef) => { 
    this.camera = cameraRef;
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera 
            style={{ flex: 1 }} 
            type={this.state.type}
            ratio='4:3'
            pictureSize='Medium'
            ref={this.setupCamera}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> 
                  Flip 
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <Button
            title='Take Picture'
            onPress={this.handleTakePicture}
          />
        </View>
      );
    }
  }
}

