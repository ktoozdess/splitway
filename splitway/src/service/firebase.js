import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
  apiKey: "AIzaSyBhj1vapxytLtelXcg3Mu0772-KYbJes-w",
  authDomain: "splitway-d35f6.firebaseapp.com",
  projectId: "splitway-d35f6",
  storageBucket: "splitway-d35f6.appspot.com",
  messagingSenderId: "1044137023255",
  appId: "1:1044137023255:web:60b9cce1a6828f58b54952",
  measurementId: "G-2SZQK0KFTE"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore()
