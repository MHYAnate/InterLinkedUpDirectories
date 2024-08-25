"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
	collection,
	setDoc,
	doc,
	getDocs,
	query,
	where,
	CollectionReference,
	onSnapshot,
	orderBy,
	limit,
	startAt,
	startAfter,
	endAt,
	endBefore,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import ChatMessage from "./chatMessage";

interface ChatProps {
	stateName:string;
	roomName: string;
	roomLocation: string;
	senderId: string;
	senderName: string;
	senderPic: string;
	user: {
		uid: string;
	};
}

interface FormValue {
	chat: string;
}

const Chat: React.FC<ChatProps> = ({
	user,
	roomName,
	roomLocation,
	senderId,
	senderName,
	senderPic,
	stateName,
}) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		getFieldState,
		formState: { isSubmitSuccessful, isDirty, isSubmitting },
	} = useForm<FormValue>({
		defaultValues: {
			chat: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const chat = watch("chat");

	const { auth, storage, database } = Firebase;

	const [docId, setDocId] = useState("");

	const [nameDisplay, setNameDisplay] = useState(false);

	const [inputValues, setInputValues] = useState("");

	const chatDetailRef = collection(database, "chat");

	const [imageUrl, setImageUrl] = useState("");

	const senderQuery = query(
		chatDetailRef,
		where("stateName", "==", stateName),
		where("roomLocation", "==", roomLocation),
		where("roomName", "==", roomName),
		where("senderId", "==", senderId),
		orderBy("createdAt"),
		limit(10000)
	);

	const [massages, loading, error] = useCollectionData(senderQuery);

	const send = async () => {
		try {
			const docRef = await addDoc(chatDetailRef, {
				chat: `${inputValues}`,
				createdAt: serverTimestamp(),  
				docid: "",
				senderId: `${senderId}`,
				roomLocation: `${roomLocation}`,
				roomName: `${roomName}`,
				senderName: `${senderName}`,
				senderPic: `${senderPic}`,
				stateName: `${stateName}`,
				chatPic: "",
			});
			const docId = docRef.id;
			setDocId(docId);

			await setDoc(
				doc(chatDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const imageRef = ref(storage, `image/${senderId}`);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
		const fileInput = fileInputRef.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef, file)
				.then((snapshot) => {
					getDownloadURL(imageRef).then((url) => {
						setImageUrl(url);
						handleImageProfileDetail();
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

	const handleImageProfileDetail = async () => {
		try {
			const profileDetailRef = collection(database, `profile`);
			await setDoc(
				doc(profileDetailRef, docId),
				{
					src: imageUrl,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const vAssist = useRef<HTMLDivElement>(null);

	const onSubmit = () => {
		handleUpload();
		handleImageProfileDetail();
		send();
		setInputValues("");
		vAssist.current?.scrollIntoView({ behavior: "smooth" });
	};	

	return (
		<div>
			<div className={styles.chatMsg}>
				{massages &&
					massages.map((msg) => (
						<ChatMessage 
							key={msg.docid}
							chat={msg.chat}
							senderId={msg.senderId}
							senderName={msg.senderName}
							senderPic={msg.senderPic}
							createdAt={msg.createdAt}
							user={user}
							chatImg={msg.chatImg}
						/>
					))}
				<div ref={vAssist}> </div>
			</div>
			<div className={styles.chatCover}>
				<form className={styles.inputCover}  onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.chatInput}>
						<input
							type="text"
							className={styles.input}
							{...register("chat", {
								required: "Required",
							})}
							id="chat"
							value={inputValues}
							onChange={(e) => setInputValues(e.target.value)}
							placeholder={`${roomLocation} ${roomName} Community`}
						/>
					</div>
					<div className={styles.inputImageCover}>
				
				<input
					type="file"
					accept="image/*"
					className={styles.inputImg}
					ref={fileInputRef}
					id="file"
					placeholder="Upload Display Picture"
				/>
				<label htmlFor="file">
				<Image
				object-fit="cover"
				className={styles.upLoadPic}
				alt="Picture of the author"
				quality={100}
				width={100}
				height={100}
				src="/service/u1.jpg"
				priority={true}
				unoptimized
			/>
				</label>
				<span>Upload Display Picture</span>
			</div>
				</form>
				<button
					onSubmit={handleSubmit(onSubmit)}
					className={styles.chatBtn}
					type="submit"
				>
					chat
				</button>
			</div>
		</div>
	);
};

Chat.displayName = "Chat";
export default Chat;
