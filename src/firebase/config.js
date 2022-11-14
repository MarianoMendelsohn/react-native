import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDXc4cDgh8nrpJpvkd_NyIIBp9jsgmV28Y",
    authDomain: "fir-rn-95645.firebaseapp.com",
    projectId: "fir-rn-95645",
    storageBucket: "fir-rn-95645.appspot.com",
    messagingSenderId: "67661644320",
    appId: "1:67661644320:web:b1e4e291d4f532b8e0b245"
    
};

app.initializeApp(firebaseConfig)


export const auth = firebase.auth();

export const storage = app.storage();

export const db = app.firestore();