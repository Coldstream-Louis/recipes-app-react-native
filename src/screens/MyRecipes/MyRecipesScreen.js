import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight,TouchableOpacity, Image,Alert} from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { getDataModel } from '../../data/dataModel';
import { Ionicons } from '@expo/vector-icons';

export default class MyRecipesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    let allRecipes = this.dataModel.getRecipes();
    let MyRecipes = [];
    let user = this.props.navigation.getParam('user');

    for (let recipe of allRecipes) {
      if (recipe.userID ===user.key){
        MyRecipes.push(recipe);
      }
    }
    this.state = {
      recipeList: MyRecipes,
      user:user
    }
  }

 
  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  addRecipeFunction=()=>{
    Alert.alert("Floating Button Clicked");
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image_url  }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <View style={styles.ButtonContainer}>
        <Ionicons name="md-create" style={styles.editicon}
                        size={30} 
                        onPress={()=>{this.onEdit(item)}} />
        <Ionicons name="md-trash" style={styles.deleteicon}
                        size={30} 
                        onPress={()=>{this.deleteItem(item)}} />
        </View>
        </View>
      
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
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
