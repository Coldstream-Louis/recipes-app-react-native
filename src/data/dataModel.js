
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from '../../Secrets.js';

class DataModel {
    constructor() {
        if (firebase.apps.length === 0) { // aka !firebase.apps.length
            firebase.initializeApp(firebaseConfig);
        }
        this.usersRef = firebase.firestore().collection('users');
        this.recipesRef = firebase.firestore().collection('recipes');
        this.categoriesRef = firebase.firestore().collection('categories');
        this.storageRef = firebase.storage().ref();
        this.users = [];
        this.recipes = [];
        this.categories = [];
        this.asyncInit();
    }

    asyncInit = async () => {
        this.loadUsers();
        this.loadRecipes();
        this.loadCategories();
    }
    
    //Data Model Function for users
    loadUsers = async () => {
        let querySnap = await this.usersRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.users.push(data);
        });
    }

    getUsers = () => {
        return this.users;
    }

    createUser = async (email, pass, dispName) => {
        // assemble the data structure
        let newUser = {
          email: email,
          password: pass,
          displayName: dispName
        }
    
        // add the data to Firebase (user collection)
        let newUserDocRef = await this.usersRef.add(newUser);
    
        // get the new Firebase ID and save it as the local "key"
        let key = newUserDocRef.id;
        newUser.key = key;
        this.users.push(newUser);
        return newUser;
    }


    //Data Model function for Recipes
    loadRecipes = async () => {
        let querySnap = await this.recipesRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.recipes.push(data);
        });
    }

    getRecipes = () => {
        return this.recipes;
    }
    
    createRecipe = async(category,contents,image_url,ingredients,title,userID) => {

        let newRecipe = {
            category:category,
            contents:contents,
            image_url:image_url,
            ingredients:ingredients,
            time:time,
            title:title,
            userID:userID
        }
        
        // add the data to Firebase (recipe collection)
        let newRecipeDocRef = await this.recipesRef.add(newRecipe);

        // get the new Firebase ID and save it as the local "key"
        let key=newRecipeDocRef.id;
        newRecipe.key=key;
        this.recipes.push(newRecipe);
        return newRecipe;
    }

    deleteRecipe = async (recipeKey) => {
        let docRef = await this.recipesRef.doc(recipeKey);
        await docRef.delete(recipeKey);
 
     }

    updateList = async (recipeKey, category,image_url,contents,ingredients,time,title,userID) => {
        let Recipe={
        category:category,
        contents:contents,
        image_url:image_url,
        ingredients:ingredients,
        time:time,
        title:title,
        userID:userID
        }
          
        let docRef = await this.recipesRef.doc(recipeKey);
        await docRef.update(Recipe);
  
        // console.log(this.state.theList)
      }


    loadCategories = async () => {
        let querySnap = await this.categoriesRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.categories.push(data);
        });
    }
 
    getCategories = () => {
        return this.categories;
    }
}

let theDataModel = undefined;

export function getDataModel() {
    if (!theDataModel) {
      theDataModel = new DataModel();
    }
    return theDataModel;
=======
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from '../../Secrets.js';

class DataModel {
    constructor() {
        if (firebase.apps.length === 0) { // aka !firebase.apps.length
            firebase.initializeApp(firebaseConfig);
        }
        this.usersRef = firebase.firestore().collection('users');
        this.recipesRef = firebase.firestore().collection('recipes');
        this.categoriesRef = firebase.firestore().collection('categories');
        this.storageRef = firebase.storage().ref();
        this.theImage = undefined;
        this.theCallback = undefined;
        this.users = [];
        this.recipes = [];
        this.categories = [];
        this.asyncInit();
    }

    asyncInit = async () => {
        this.loadUsers();
        this.loadRecipes();
        this.loadCategories();
    }
    
    //Data Model Function for users
    loadUsers = async () => {
        let querySnap = await this.usersRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.users.push(data);
        });
    }

    getUsers = () => {
        return this.users;
    }

    createUser = async (email, pass, dispName) => {
        // assemble the data structure
        let newUser = {
          email: email,
          password: pass,
          displayName: dispName
        }
    
        // add the data to Firebase (user collection)
        let newUserDocRef = await this.usersRef.add(newUser);
    
        // get the new Firebase ID and save it as the local "key"
        let key = newUserDocRef.id;
        newUser.key = key;
        this.users.push(newUser);
        return newUser;
    }


    //Data Model function for Recipes
    loadRecipes = async () => {
        this.recipes=[];
        let querySnap = await this.recipesRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.recipes.push(data);
        });
    }

    getRecipes = () => {
        return this.recipes;
    }
    
    createRecipe = async(category,contents,ingredients,serves,time,title,userID) => {

        let newRecipe = {
            category:category,
            contents:contents,
            ingredients:ingredients,
            serves:serves,
            time:time,
            title:title,
            userID:userID
        }
        
        // add the data to Firebase (recipe collection)
        let newRecipeDocRef = await this.recipesRef.add(newRecipe);

        // get the new Firebase ID and save it as the local "key"
        let key=newRecipeDocRef.id;
        newRecipe.key=key;
        this.recipes.push(newRecipe);
        return newRecipe;
    }

    loadCategories = async () => {
        let querySnap = await this.categoriesRef.get();
        querySnap.forEach(qDocSnap => {
          let key = qDocSnap.id;
          let data = qDocSnap.data();
          data.key = key;
          this.categories.push(data);
        });
    }
 
    getCategories = () => {
        return this.categories;
    }

    addChatImage = async (imageObject) => {
        console.log('... and here we would add the image ...');
        this.theImage = imageObject;
    
        // invoke the callback right away, OK if the storage takes a bit longer
        if (this.theCallback) {
          this.theCallback(imageObject);
        }
    
        // Set up storage refs and download URL
        let fileName = '' + Date.now();
        let imageRef = this.storageRef.child(fileName);
    
        // fetch the image object from the local filesystem
        let response = await fetch(imageObject.uri);
        let imageBlob = await response.blob();
    
        // then upload it to Firebase Storage
        await imageRef.put(imageBlob);
    
        // ... and update the current image Document in Firestore
        let downloadURL = await imageRef.getDownloadURL();
        return downloadURL;
    }
    

}

let theDataModel = undefined;

export function getDataModel() {
    if (!theDataModel) {
      theDataModel = new DataModel();
    }
    return theDataModel;
  
}