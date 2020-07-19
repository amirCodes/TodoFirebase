
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA9otMDXQHR_nIXAWhOVW8VgQdP7Ei2olc",
  authDomain: "todo-55bae.firebaseapp.com",
  databaseURL: "https://todo-55bae.firebaseio.com",
  projectId: "todo-55bae",
  storageBucket: "todo-55bae.appspot.com",
  messagingSenderId: "210533312851",
  appId: "1:210533312851:web:524936be813c78334899a6",
  measurementId: "G-FBES8VW1N7"
};

 firebase.initializeApp(config);
 const db =firebase.firestore();
//const auth = firebase.auth();
//const storage = firebase.storage();
// export default db; is also posible 
export default db;