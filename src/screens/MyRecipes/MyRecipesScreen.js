import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight,TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles';
import { getDataModel } from '../../data/dataModel';
import { Ionicons } from '@expo/vector-icons';

export default class MyRecipesScreen extends React.Component {

  constructor(props) {
    super(props);
    let user = this.props.navigation.getParam('user');
    this.dataModel = getDataModel();
    this.state = {
      user:user,
      recipeList:[]
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener ('willFocus', async () =>{
      await this.dataModel.loadRecipes();
      let allRecipes = this.dataModel.getRecipes();
      let MyRecipes = [];
      for (let i=0; i < allRecipes.length; i++) {
        if (allRecipes[i].userID == this.state.user.key){
          MyRecipes.push(allRecipes[i]);
        }
      }
      this.setState({recipeList: MyRecipes});
    });
  }

 
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  onEdit = (item) => {
    this.props.navigation.navigate('EditRecipe', {user: this.state.user, operation: 'edit', recipe: item});
  }

  addRecipeFunction=()=>{
    //Alert.alert("Floating Button Clicked");
    this.props.navigation.navigate('AddRecipe', {user: this.state.user, operation: 'create' });
  };

  deleteItem = async (item) => {
    await this.dataModel.deleteRecipe(item.key);
    await this.dataModel.loadRecipes();
    let allRecipes = this.dataModel.getRecipes();
    let MyRecipes = [];
    for (let i=0; i < allRecipes.length; i++) {
      if (allRecipes[i].userID == this.state.user.key){
        MyRecipes.push(allRecipes[i]);
      }
    }
    this.setState({recipeList: MyRecipes});
  }

  onDelete = async (item) => {
    Alert.alert(
      "Are you sure you want to",
      "Delete this recipe?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => this.deleteItem(item) }
      ],
      { cancelable: false }
    );
  }

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image_url  }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.ButtonContainer}>
        <Ionicons name="md-create" style={styles.editicon}
                        size={35} 
                        onPress={()=>{this.onEdit(item)}} />
        <Ionicons name="md-trash" style={styles.deleteicon}
                        size={35} 
                        onPress={()=>{this.onDelete(item)}} />
        </View>
      </View>
      
    </TouchableHighlight>
  );

  render() {
    return (
      <View style={{minHeight: '100%'}}>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={1}
          data={this.state.recipeList}
          renderItem={this.renderRecipes}
        />
      <View style={styles.MainContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={this.addRecipeFunction} style={styles.TouchableOpacityStyle} >
        <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png'}} 
         style={styles.FloatingButtonStyle} />
         </TouchableOpacity>
      </View>
      </View>
    );
  }
}
