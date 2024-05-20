import Firebase from "@/firebase/firebase"; 
import {getFirestore, collection,doc, addDoc, getDocs, deleteDoc, onSnapshot} from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const { auth, storage, database } = Firebase;


const DeleteStock: any = async  (idData : any, deleteData:any) => {
	try {
		await deleteDoc(doc(database, idData, deleteData.id ));
	} catch (error) {
		console.error("Error adding profile detail:", error);
	}
};

function FirebaseApi() {
	return {
		DeleteStock,
	};
}

export default FirebaseApi()