
import React from 'react';
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

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
    if(this.props.navigation.getParam('operation')=='add')
        this.props.navigation.navigate('AddRecipe', {operation:'Upload Image', index: this.index, url: img_url});
    else
        this.props.navigation.navigate('EditRecipe', {operation:'Upload Image', index: this.index, url: img_url});
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
                  backgroundColor: 'lightskyblue',
                  minWidth: 100,
                  height: 50,
                  borderRadius: 10,
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 22, margin: 10, color: 'white' }}> 
                  Flip 
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <TouchableOpacity onPress={this.handleTakePicture} 
              style={styles.cameraButton}>
              <Image style={styles.cameraIcon} source={require('../../../assets/icons/camera.png')}/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

