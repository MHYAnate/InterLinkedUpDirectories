// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref } from "firebase/storage";
import {getFirestore, collection,doc, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface AddData {
  address: string;
	number: string;
}

interface deleteData {
	id: string;
}

// Initialize Firebase
const firebaseConfig = initializeApp( {
	apiKey: "AIzaSyAKWctb4m4IcjciteN6wOhSBjmWHKAutqA",
  authDomain: "seed1-48a42.firebaseapp.com",
  projectId: "seed1-48a42",
  storageBucket: "seed1-48a42.appspot.com",
  messagingSenderId: "229209699727",
  appId: "1:229209699727:web:719bd75b0e082ddb3607fa",
  measurementId: "G-5Q92YV3M7C"
});
  

 const faceredirect ="//clict2link.firebaseapp.com/__/auth/handler";
 const auth = getAuth(firebaseConfig);

 const database = getFirestore(firebaseConfig);

 const storage = getStorage(firebaseConfig);

//  const analytics = getAnalytics(firebaseConfig);

 const clientColRef = collection(database,'client')


const getClientDoc =getDocs(clientColRef)
 .then((snapshot)=>{
    let client = [];
    snapshot.docs.forEach((doc)=>{
      client.push({...doc.data(), id: doc.id})
    })
}).catch((error)=>{
  console.log(error)
})

const add: any = (AddData:AddData)=>{
	addDoc(clientColRef,{
  address:AddData.address,
  number:AddData.number,
})}

const Delete: any = (idData : any, deleteData:any)=>{
	const docRef = doc(database, idData, deleteData.id )
	deleteDoc(docRef)
}

const DeleteStock: any = async  (idData : any, deleteData:any) => {
	try {
		await deleteDoc(doc(database, idData, deleteData.id ));
	} catch (error) {
		console.error("Error adding profile detail:", error);
	}
};

export const getClientRealTimDoc = onSnapshot(clientColRef,(snapshot)=>{
	let client:any = [];
	snapshot.docs.forEach((doc)=>{
		client.push({...doc.data(), id: doc.id})
	})
	
}
)

async function getDoument(collection:any, id:any) {
	
	let result = null;
	let error = null;

	try {
			result = await getDocs(clientColRef);
	} catch (e) {
			error = e;
	}

	return { result, error };
}
 

function Firebase() {
	return {
		auth,
		storage,
		database,
		clientColRef,
		add,
		getClientDoc,
		Delete,
		DeleteStock,
	};
}

export default Firebase()