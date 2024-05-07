import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCY5HbPARlWLci4MDZNXr6VBERtTuWmNMw",
  authDomain: "reading-book-app-b1348.firebaseapp.com",
  projectId: "reading-book-app-b1348",
  storageBucket: "reading-book-app-b1348.appspot.com",
  messagingSenderId: "566569947346",
  appId: "1:566569947346:web:9a8db4c3caf2651b3ddd0b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
