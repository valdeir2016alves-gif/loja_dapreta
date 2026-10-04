import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7kuexOeZ6NHJ7djMVlyYyEFgOf8PfTz4",
  authDomain: "loja-da-preta-5a6a7.firebaseapp.com",
  projectId: "loja-da-preta-5a6a7",
  storageBucket: "loja-da-preta-5a6a7.firebasestorage.app",
  messagingSenderId: "225129922178",
  appId: "1:225129922178:web:05eefab182695a6b2ffe9b",
  measurementId: "G-YHTF5ZMYQD"
};

// Inicializa o app do Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Instância do Firestore Database
export const db = getFirestore(firebaseApp);
