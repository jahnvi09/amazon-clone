import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "Insert-Your-API-Key",
    authDomain: "fir-812eb.firebaseapp.com",
    projectId: "fir-812eb",
    storageBucket: "fir-812eb.appspot.com",
    messagingSenderId: "689257840008",
    appId: "1:689257840008:web:f6ea5b4a162b39c38ece3d",
    measurementId: "G-1CDY5JXBPJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
