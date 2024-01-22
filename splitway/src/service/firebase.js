import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"






const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore()
