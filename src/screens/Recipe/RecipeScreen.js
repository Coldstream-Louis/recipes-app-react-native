import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { getIngredientName, getCategoryName, getCategoryById } from '../../data/MockDataAPI';
import BackButton from '../../components/BackButton/BackButton';
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';

const { width: viewportWidth } = Dimensions.get('window');

export default class RecipeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      headerLeft: () => <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0
    };
  }

  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    //const category = getCategoryById(item.category);
    //const title = getCategoryName(category.id);

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: item.image_url }} />
        </View>
        <View style={styles.infoRecipeContainer}>
          <Text style={styles.infoRecipeName}>{item.title}</Text>
          <View style={styles.infoContainer}>
            <TouchableHighlight
              onPress={() => navigation.navigate('RecipesList', {name: item.category})}
            >
              <Text style={styles.category}>{item.category.toUpperCase()}</Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
            <Text style={styles.infoRecipe}>{item.time} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <FlatList
              data={item.ingredients}
              style={{marginTop: 25, borderBottomWidth: 1, borderBottomColor: 'black'}}
              ListHeaderComponent = {() => {
                return (
                  <View style={styles.listHeaderContainer}>
                    <Text style={styles.listHeader}>Ingredients:</Text>
                  </View>
                )
              }}
              renderItem={({item})=>{
                return(
                  <View style={styles.listItemContainer}>
                    <View style={styles.listItemTextContainer}> 
                      <Text style={styles.listItemText}>
                        {item.name}
                      </Text> 
                    </View>
                    <View style={styles.listItemButtonContainer}>
                      <Text style={styles.listItemText}>
                        {item.quantity}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <FlatList
              data={item.content}
              style={{marginTop: 40}}
              ListHeaderComponent = {() => {
                return (
                  <View style={styles.listHeaderContainer}>
                    <Text style={styles.listHeader}>Steps:</Text>
                  </View>
                )
              }}
              renderItem={({item})=>{
                return(
                  <View style={styles.stepContainer}>
                    <View style={styles.stepImageContainer}>
                      <Image style={styles.step_image} source={{ uri: item.img_url }} />
                    </View>
                    <Text style={styles.infoDescriptionRecipe}>{item.text}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
