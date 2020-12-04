import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { getDataModel } from '../../data/dataModel';

export default class SignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    this.state = {
      email:"",
      password:"",
      confirmPassword: "",
      displayName: ""
    };
  }

  onCreateAccount = async () => {
    if(this.state.password != this.state.confirmPassword) {
        Alert.alert(
          'Password could not be confirmed',
          'Please check your input',
          [{ text: 'OK',style: 'OK'}]
        );
        return;
    }
    if(this.state.password.length < 6) {
        Alert.alert(
          'Invalid Password',
          'Password should include at least 4 characters',
          [{ text: 'OK',style: 'OK'}]
        );
        return;
    }
    
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.email) {
        console.log("found matching user");
        Alert.alert(
          'Duplicate User',
          'User ' + this.state.emailInput + ' already exists.',
          [{ text: 'OK',style: 'OK'}]
        );
        return;
      }
    }
    console.log("no matching user found, creating");

    let newUser = await this.dataModel.createUser(
      this.state.email,
      this.state.password,
      this.state.displayName
    );
    this.props.navigation.navigate('LogIn');
  }
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Create Account</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your Email" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Enter your Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm your Password" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({confirmPassword:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder="Enter your User Name" 
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({displayName:text})}/>
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={this.onCreateAccount}>
          <Text style={styles.loginText}>Register as New User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.props.navigation.goBack();
        }}>
          <Text style={styles.loginText}>Cancel</Text>
        </TouchableOpacity>

      </View>
    );
  }
}