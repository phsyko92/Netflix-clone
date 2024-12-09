import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut} from 'firebase/auth';
import {
  addDoc,
  collection,
  getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAbbyEPckvP58_Kv0Ki-jaAHPBUmLqzTAI",
  authDomain: "netflix-clone-575bb.firebaseapp.com",
  projectId: "netflix-clone-575bb",
  storageBucket: "netflix-clone-575bb.firebasestorage.app",
  messagingSenderId: "820354260914",
  appId: "1:820354260914:web:546f224ca29c573f3d4eab"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth,email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  }catch (error) {
    console.log(error);
    alert(error);
  }
}

const login = async (email, password) => {
  try {
      signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
  const logout = () => {
    signOut(auth);
  }

  export {auth, db, login, signup, logout};
