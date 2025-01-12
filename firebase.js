import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';

import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';





// Votre configuration Firebase
const firebaseConfig = {
    projectId: "arthureffront",
    apiKey: "AIzaSyD3QE7-g6thMIo11Z-UTVqvgd1HsnV6OxY",
    storageBucket: "gs://arthureffront.firebasestorage.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

const storage = getStorage(app);


// Fonction pour récupérer des documents depuis Firestore
async function getData(collectionName) {
    let data = [];
    const querySnapshot = await getDocs(collection(db, collectionName));
    console.log(collectionName);
    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
    });
    return data;
}





export {  getData};
