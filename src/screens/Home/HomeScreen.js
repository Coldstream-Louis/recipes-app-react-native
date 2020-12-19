import React from 'react';
import { FlatList, ScrollView, Text, View, TouchableHighlight, Image } from 'react-native';
import styles from './styles';
import { recipes } from '../../data/dataArrays';
import MenuImage from '../../components/MenuImage/MenuImage';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import DrawerActions from 'react-navigation';
import { getCategoryName } from '../../data/MockDataAPI';
import { getDataModel } from '../../data/dataModel';

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Welcome Home '+navigation.getParam('user').displayName,
    headerLeft: () => <MenuImage
      onPress={() => {
        navigation.openDrawer();
      }}
    />,
    headerRight: () => <ProfileImage
      onPress={() => {
        let user = navigation.getParam('user');
        navigation.navigate('MyRecipes', {user: user});
      }}
    />
  });

  constructor(props) {
    super(props);
    this.dataModel = getDataModel();
    let user = this.props.navigation.getParam('user');
    this.state = {
      recipeList: [],
      user: user
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.addListener ('willFocus', async () =>{
      await this.dataModel.loadRecipes();
      let allRecipes = this.dataModel.getRecipes();
      this.setState({recipeList: allRecipes});
    });
  }

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
