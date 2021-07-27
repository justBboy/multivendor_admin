import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQ-JycWHYd0copZnNusne1G8nIsqO2ks4",
  authDomain: "multivendor-ecommerce-5e8d7.firebaseapp.com",
  projectId: "multivendor-ecommerce-5e8d7",
  storageBucket: "multivendor-ecommerce-5e8d7.appspot.com",
  messagingSenderId: "80184822554",
  appId: "1:80184822554:web:2376d3fc6ed65634723aa3",
  measurementId: "G-GYFZPSEPEG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();


export {
    db,
    auth,
    storage
}
