import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyAwJk2cg2PS8nVyd1Jp0Ir4tvl9HOPQnCQ",
    authDomain: "linkedin-14520.firebaseapp.com",
    projectId: "linkedin-14520",
    storageBucket: "linkedin-14520.appspot.com",
    messagingSenderId: "732646679593",
    appId: "1:732646679593:web:eb92eb19cb14808de0e838"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };