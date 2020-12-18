import React from 'react';
import {
  FlatList,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  TouchableHighlight
} from 'react-native';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import AddContentButton from '../../components/AddContentButton/AddContentButton';
import { getDataModel } from '../../data/dataModel';

export default class RecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    let user = this.props.navigation.getParam('user');
    this.dataModel = getDataModel();
    this.allCategories = this.dataModel.getCategories();
    let ingredientList = [];
    let pl = {
        name: '',
        quantity: ''
    };
    ingredientList.push(pl);
    let contentList = [];
    let pc = {
        img_url: 'https://icon-library.com/images/add-image-icon/add-image-icon-14.jpg',
        text: ''
    };
    contentList.push(pc);
    this.state = {
        userId: user.key,
        title: '',
        image_url: 'https://icon-library.com/images/add-image-icon/add-image-icon-14.jpg',
        category: null,
        time: '',
        ingredientList: ingredientList,
        contentList: contentList
    };
  }

  addIngredient = () => {
    let temp = this.state.ingredientList;
    let pl = {
        name: '',
        quantity: ''
    };
    temp.push(pl);
    this.setState({ingredientList: temp});
  }

  addNewSection = () => {
    let temp = this.state.contentList;
    let pc = {
        img_url: 'https://icon-library.com/images/add-image-icon/add-image-icon-14.jpg',
        text: ''
    };
    temp.push(pc);
    this.setState({contentList: temp});
  }

  categoryList = () => {
    return( this.allCategories.map( (x,i) => { 
        return( {label: x.name, value: x.name} )} ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: this.state.image_url }} />
        </View>
        <View style={styles.infoRecipeContainer}>
          <View style={styles.infoContainer}>
            <TextInput
              placeholder='Enter title...'
              style={styles.titleInputBox}
              onChangeText={(text) => this.setState({title: text})}
              value={this.state.title}
            />
          </View>
          <View style={styles.infoContainer} zIndex={10}>
            <DropDownPicker
              items={this.categoryList()}
              defaultNull={this.state.category === null}
              placeholder="Select a Category"
              containerStyle={styles.dropDown}
              style={{backgroundColor: '#fafafa'}}
              dropDownStyle={{backgroundColor: '#fafafa', minHeight: 320}}
              onChangeItem={item => this.setState({category: item.value})}
            />
          </View>

          <View style={styles.infoContainer}>
            <Image style={styles.infoPhoto} source={require('../../../assets/icons/time.png')} />
            <TextInput
                placeholder='Enter time in minutes...'
                style={styles.timeInputBox}
                onChangeText={(text) => {this.setState({time: text})}}
                value={this.state.time}
            />
            <Text style={styles.infoRecipe}>{this.state.time} minutes </Text>
          </View>

          <View style={styles.infoContainer}>
            <FlatList
              data={this.state.ingredientList}
              style={{marginTop: 25, borderBottomWidth: 1, borderBottomColor: 'black'}}
              ListHeaderComponent = {() => {
                return (
                  <View style={styles.listHeaderContainer}>
                    <Text style={styles.listHeader}>Ingredients:</Text>
                  </View>
                )
              }}
              renderItem={({item, index})=>{
                return(
                  <View style={styles.listItemContainer}>
                    <View style={styles.listItemTextContainer}> 
                      <TextInput
                        placeholder='Enter ingredient name...'
                        style={styles.ingredientInputBox}
                        onChangeText={(text) => {
                            let newList = this.state.ingredientList;
                            newList[index].name = text;
                            this.setState({ingredientList: newList});
                        }}
                        value={item.name}
                      /> 
                    </View>
                    <View style={styles.listItemButtonContainer}>
                      <TextInput
                        placeholder='Quantity...'
                        style={styles.ingredientInputBox}
                        onChangeText={(text) => {
                            let newList = this.state.ingredientList;
                            newList[index].quantity = text;
                            this.setState({ingredientList: newList});
                        }}
                        value={item.quantity}
                      />
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.infoContainer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.addIngredient}>
              <Text>Add a New Ingredient</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <FlatList
              data={this.state.contentList}
              style={{marginTop: 40}}
              ListHeaderComponent = {() => {
                return (
                  <View style={styles.listHeaderContainer}>
                    <Text style={styles.listHeader}>Steps:</Text>
                  </View>
                )
              }}
              renderItem={({item, index})=>{
                return(
                  <View style={styles.stepContainer}>
                    <View style={styles.stepImageContainer}>
                      <Image style={styles.step_image} source={{ uri: item.img_url }} />
                    </View>
                    <TextInput
                        placeholder='Enter step description here...'
                        style={styles.sectionInputBox}
                        multiline={true}
                        onChangeText={(text) => {
                            let newList = this.state.contentList;
                            newList[index].text = text;
                            this.setState({contentList: newList});
                        }}
                        value={item.text}
                    />
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.infoContainer}>
              <AddContentButton
                onPress={this.addNewSection}
              />
          </View>
        </View>
      </ScrollView>
    );
  }
}