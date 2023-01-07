import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  } from "firebase/firestore";

// Your web app's Firebase configuration  

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  projectId: process.env.REACT_PROJECT_ID ,
  storageBucket: process.env.REACT_STORAGE_BUCKET ,
  messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const getUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data()
  } else {
    console.log("El usuario no existe");
  }
}

export async function addUser (values, setloading, setSucces, setUserId) {
  try {
    setloading(true);
    const docRef = await addDoc(collection(db, "users"), {
      full_name: values.full_name,
      email: values.email,
      birth_date: values.birth_date,
      country_of_origin: values.country_of_origin,
      terms_and_conditions: values.terms_and_conditions
    });
    setUserId(docRef.id)
    setloading(false);
    setSucces(true);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}





