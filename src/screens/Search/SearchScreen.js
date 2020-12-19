import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import { ListItem, SearchBar } from 'react-native-elements';
import MenuImage from '../../components/MenuImage/MenuImage';
import { getDataModel } from '../../data/dataModel';



export default class SearchScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerRight: (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    let recipes=this.dataModel.getRecipes();
    this.state = {
      MyRecipes:recipes,
      value: '',
      data: []
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener ('willFocus', async () =>{
      await this.dataModel.loadRecipes();
      let allRecipes = this.dataModel.getRecipes();
      this.setState({MyRecipes: allRecipes});
    });
  }
  
  getRecipesByCategoryName(categoryName) {
    let nameUpper = categoryName.toUpperCase();
    let recipesArray = [];
    this.state.MyRecipes.map(data => {
      if (data.category.toUpperCase().includes(nameUpper)) {
        recipesArray.push(data); // return a vector of recipes
      }
    });
    return recipesArray;
  }
  
  getRecipesByRecipeName(recipeName) {
    let nameUpper = recipeName.toUpperCase();
    let recipesArray = [];
    this.state.MyRecipes.map(data => {
      if (data.title.toUpperCase().includes(nameUpper)) {
        recipesArray.push(data);
      }
    });
    return recipesArray;
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleSearch: this.handleSearch,
      data: this.getValue()
    });
  }

  handleSearch = (text) => {
    var recipeArray1 = this.getRecipesByRecipeName(text);
    var recipeArray2 = this.getRecipesByCategoryName(text);
    // var recipeArray3 = getRecipesByIngredientName(text);
    var aux = recipeArray1.concat(recipeArray2);
    var recipeArray = [...new Set(aux)];
    if (text == '') {
      this.setState({
        value: text,
        data: []
      });
    } else {
      this.setState({
        value: text,
        data: recipeArray
      });
    }
  };

  getValue = () => {
    return this.state.value;
  };

  onPressRecipe = item => {
    this.props.navigation.navigate('Recipe', { item });
  };

  renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.image_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </TouchableHighlight>
  );
 
  


  render() {
    return (
      
      <View>
        <View style={styles.searchContainer}>
        <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1,
            marginTop: 50,
            width: 300
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: 40
          }}
          inputStyle={{
            backgroundColor: 'white',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={this.handleSearch}
          //onClear={() => params.handleSearch('')}
          placeholder="Search"
          value={this.state.value}
        />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={this.state.data}
            renderItem={this.renderRecipes}
          />
        </View>
      
      </View>
    );
  }
}
