import { initializeApp } from "firebase/app";
import { 
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration  

const firebaseConfig = {
  apiKey: "AIzaSyD4FOfhnN9URQqb1KKv-rtoh1pLlzp3abI",
  authDomain: "greydive-challenge-46313.firebaseapp.com",
  projectId: "greydive-challenge-46313",
  storageBucket: "greydive-challenge-46313.appspot.com",
  messagingSenderId: "625571615728",
  appId: "1:625571615728:web:8da601e4ef1b276b70c335"
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
    console.log("No such document!");
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





