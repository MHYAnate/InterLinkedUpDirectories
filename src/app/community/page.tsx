"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
	collection,
	setDoc,
	doc,
	getDocs,
	query,
	where,
	addDoc,
	CollectionReference,
	onSnapshot,
	deleteDoc,
	updateDoc,
	deleteField,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";
import Chat from "@/components/chat/chatComponent";
import ChatNav from "@/components/chat/chatNav";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import styles from "./styles.module.css";



const { auth, storage, database } = Firebase;

type FormValue = {
	email: string;
	selectCategory: string;
	selectService: string;
	name: string;
	address: string;
	number: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	docid: string;
};



export default function Community() {

	const searchParams = useSearchParams();
	
const router = useRouter();

	const [profileDetails, setProfileDetails] = useState<FormValue | null>(null);
	
	const [roomName, setRoomName] = useState("Public");

	const [roomLocation, setRoomLocation] = useState(`${profileDetails?.stateSelect}`);

	const [roomState, setRoomState] = useState(`${profileDetails?.stateSelect}`);

	const [contactName, setContactNameDisplay] = useState("");

	const [contactContact, setContactContactDisplay] = useState("");

	useEffect(() => {
		const unsubscribe = 	onAuthStateChanged(auth, (user) => {

			const profileDetailRef = collection(database, `profile`);

			const userQuery = query(
				profileDetailRef,
				where("email", "==", `${user?.email}`)
			);
			
			if (user) {
				
	
				const handleGetProfileDetail = async () => {

					try {
						const querySnapshot = await getDocs(userQuery);
	
						if (querySnapshot.empty) {
							console.log("No profile details found");
							return;
						}
	
						const retrievedData = querySnapshot.docs[0].data() as FormValue;
						setProfileDetails(retrievedData);
					} catch (error) {
						console.error("Error getting profile detail:", error);
					}
				};
	
				handleGetProfileDetail();
			} else {
				// Redirect to login page if not signed in
				router.push("/");
			}
		});
		// Cleanup function to avoid memory leaks
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		auth.currentUser?.reload();
	}, []);

	return (
		<Suspense fallback={<Loading/>}>
			<div className={styles.chatContainer}>
				<div className={styles.chatNav}>

				</div>
				<div className={styles.chat}>
				  <Chat stateName={roomState} roomName={roomName} roomLocation={roomLocation} senderId={`${profileDetails?.docid}`} senderName={`${profileDetails?.name}`} senderPic={`${profileDetails?.src}`} user={`${profileDetails?.docid}`} contactName={contactName} contactContact={contactContact} />
				</div>
			</div>
		</Suspense>
	);
}
