import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { categories } from '../../data/dataArrays';
import { getNumberOfRecipes } from '../../data/MockDataAPI';
import { getDataModel } from '../../data/dataModel';

export default class CategoriesScreen extends React.Component {
  static navigationOptions = {
    title: 'Categories'
  };

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    let allCategories = this.dataModel.getCategories();
    let allRecipes = this.dataModel.getRecipes();
    this.state = {
      category_list: allCategories,
      recipe_list: allRecipes
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener ('willFocus', async () =>{
      await this.dataModel.loadRecipes();
      let allRecipes = this.dataModel.getRecipes();
      this.setState({recipe_List: allRecipes});
    });
  }

  onPressCategory = (name) => {
    this.props.navigation.navigate('RecipesList', {name});
  };

  getNumbers = (name) => {
    let c = 0;
    for(let i = 0; i < this.state.recipe_list.length; i++) {
      if(this.state.recipe_list[i].category == name){
        c++;
      }
    }
    return c;
  }

  renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressCategory(item.name)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.image_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        <Text style={styles.categoriesInfo}>{this.getNumbers(item.name)} recipes</Text>
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <View>
        <FlatList
          data={this.state.category_list}
          renderItem={this.renderCategory}
        />
      </View>
    );
  }
}
