import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 200
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 200
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  listItemTextContainer: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
    listItemText: {
      fontSize: 14,
    },
  listItemButtonContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 30
  },
  step_image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 180
  },
  stepImageContainer: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 180
  },
  titleInputBox: {
    borderColor: "black",
    borderWidth: 1,
    width: '80%', 
    height: 40, 
    fontSize: 24,
    padding: 5,
  },
  ingredientInputBox: {
    borderColor: "black",
    borderWidth: 1,
    width: '90%', 
    height: 28, 
    fontSize: 16,
    padding: 5,
  },
  sectionInputBox: {
    borderColor: "black",
    borderWidth: 1,
    width: '100%', 
    maxHeight: 100,
    minHeight: 100,
    fontSize: 16,
    padding: 5,
    marginTop: 15
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropDown: {
    height: 50, 
    width: 200,
    margin: 40
  },
  timeInputBox: {
    borderColor: "black",
    borderWidth: 1,
    width: '50%', 
    height: 36, 
    margin: 12,
    fontSize: 16,
    padding: 5,
  },
});

export default styles;
