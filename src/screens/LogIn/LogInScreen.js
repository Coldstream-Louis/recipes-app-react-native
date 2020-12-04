import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getDataModel } from '../../data/dataModel';

export default class LogInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    this.state = {
      email:"",
      password:""
    };
  }

  onLogIn = () => {
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.email) {
        if (user.password === this.state.password) {
          // success!
          this.props.navigation.navigate('Home', {user});
          return;
        }
      }
    }

    Alert.alert(
      'Login Failed',
      'No match found for this email and password.',
      [{ text: 'OK',style: 'OK'}]
    );
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Let's Cook</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Email..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..." 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.onLogIn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.navigation.navigate('SignUp');
        }}>
          <Text style={styles.loginText}>Signup</Text>
        </TouchableOpacity>

      </View>
    );
  }
}