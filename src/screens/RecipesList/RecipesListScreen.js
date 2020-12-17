import React from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from './styles';
import { getRecipes, getCategoryName } from '../../data/MockDataAPI';
import { getDataModel } from '../../data/dataModel';

export default class RecipesListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name')
    };
  };

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    let allRecipes = this.dataModel.getRecipes();
    let category = this.props.navigation.getParam('name');
    let selectedRecipes = [];
    for(let i = 0; i < allRecipes.length; i++) {
      if(allRecipes[i].category == category) {
        selectedRecipes.push(allRecipes[i]);
      }
    }
    this.state = {
      recipeList: selectedRecipes
    }
  }

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image_url  }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
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
      </View>
    );
  }
}
