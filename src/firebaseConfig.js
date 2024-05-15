
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCwBFFgwlqvTAcCUZFyFbUOMMcU8fN3LrM",
    authDomain: "peliculas-catalogo.firebaseapp.com",
    databaseURL: "https://peliculas-catalogo-default-rtdb.firebaseio.com",
    projectId: "peliculas-catalogo",
    storageBucket: "peliculas-catalogo.appspot.com",
    messagingSenderId: "420536429320",
    appId: "1:420536429320:web:aa692bcefacef0868b9abd"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
