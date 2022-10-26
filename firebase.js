import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCXGks6e-h1QTTUH63kY_7gm9gfg0ApRvI",
  authDomain: "chuck-354c0.firebaseapp.com",
  projectId: "chuck-354c0",
  storageBucket: "chuck-354c0.appspot.com",
  messagingSenderId: "1021457577109",
  appId: "1:1021457577109:web:673dd360a6ef47831e979c",
  measurementId: "G-2P9TFSYYVW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
