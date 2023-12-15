import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZw0Cjfd-AL6_Bbiqyve3ecP1GTDg1b50",
  authDomain: "liftit-1df6b.firebaseapp.com",
  projectId: "liftit-1df6b",
  storageBucket: "liftit-1df6b.appspot.com",
  messagingSenderId: "226941205012",
  appId: "1:226941205012:web:97b8bc535148f07ab5c501"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);


setPersistence(auth, browserSessionPersistence)
  .then(() => {

  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, firestore };
