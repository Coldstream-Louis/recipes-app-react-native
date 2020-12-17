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



    

}

let theDataModel = undefined;

export function getDataModel() {
    if (!theDataModel) {
      theDataModel = new DataModel();
    }
    return theDataModel;
}