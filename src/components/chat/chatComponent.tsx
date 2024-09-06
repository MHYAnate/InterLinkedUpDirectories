"use client";
import React, { useRef, useState, useEffect} from "react";
import ChatImageBtn from "../btn/chatImgBtn";
import ChatBtn from "../btn/chatBtn";
import PublicSvg from "../btn/publicSvg";
import RoomSvg from "../btn/roomSvg";
import StateSvg from "../btn/stateSvg";
import AreaSvg from "../btn/areaSvg";
import PrivateSvg from "../btn/privateChatSvg";
import UserSvg from "../btn/userSvg";
import ContactSvg from "../btn/contactSvg";
import Loader from "../load/load";
import NoticeSvg from "../btn/noticeSvg";
import ConnectionsSvg from "../btn/conntectionsSvg";
import {
	collection,
	setDoc,
	doc,
	query,
	orderBy,
	limit,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import ChatMessage from "./chatMessage";

interface ChatProps {
	stateName: string;
	roomName: string;
	roomLocation: string;
	senderId: string;
	senderName: string;
	senderPic: string;
	user: string;
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


	const { auth, storage, database } = Firebase;

	const [docId, setDocId] = useState("");

	const [contactName, setContactNameDisplay] = useState("");

	const [contactContact, setContactContactDisplay] = useState("");

	const [inputValues, setInputValues] = useState("");

	const chatDetailRef = collection(database, "chat");

	const [imageUrl, setImageUrl] = useState("");

	const [timestamp, setTimestamp] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimestamp(new Date());
		}, 1000); // Update every second

		return () => clearInterval(intervalId);
	}, []);

	const date = timestamp;

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Zero-pad month
	const day = String(date.getDate()).padStart(2, "0");
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	const clockStamp = `${hours}:${minutes}:${seconds}`;

	const senderQuery = query(
		chatDetailRef,
		orderBy("createdAt"),
		limit(1000)
	);

	const [massages, loading, error] = useCollectionData(senderQuery);

	const send = async () => {
		try {
			const docRef = await addDoc(chatDetailRef, {
				chat: `${inputValues}`,
				createdAt: serverTimestamp(),
				docid: "",
				userId: `${senderId}`,
				senderId: `${senderId}`,
				roomLocation: `${roomLocation}`,
				roomName: `${roomName}`,
				senderName: `${senderName}`,
				senderPic: `${senderPic}`,
				stateName: `${stateName}`,
				chatImg: "",
				Yearstamp: `${year}`,
				monthStamp: `${month}`,
				dayStamp: `${day}`,
				minuteStamp: `${minutes}`,
				timeStamp: `${clockStamp}`,
				recieverId:"",
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
					chatImg: imageUrl,
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
		<div className={styles.chatMsgContainer}>
			<div className={styles.chatMsg}>
				<div className={styles.roomDisplayDetails}>
					<div className={styles.topDetail}>
						<div className={styles.svgHolder}>
							{roomName === "Private"? <PrivateSvg/> : roomName === "Public" ? <PublicSvg /> : <RoomSvg />}
						</div>
						<div className={styles.svgDetail}>{roomName}</div>
					</div>
					<div className={styles.topDetail}>
						<div className={styles.svgHolder}>
							{roomName === "Private"?<UserSvg/>:<StateSvg />}
							
						</div>
						<div className={styles.svgDetail}>{roomName === "Private" ? contactName : stateName}</div>
					</div>
					<div className={styles.topDetail}>
						<div className={styles.svgHolder}>
							{roomName === "Private"?<ContactSvg/>:<AreaSvg />}
							
						</div>
						<div className={styles.svgDetail}>{roomName === "Private"? contactContact : roomLocation}</div>
					</div>
				</div>
				<div className={styles.massages}>
					{loading? <Loader/>:massages &&
						massages.map((msg) => (
							<ChatMessage
								key={msg.docid}
								chat={msg.chat}
								senderId={msg.senderId}
								senderName={msg.senderName}
								senderPic={msg.senderPic}
								user={user}
								chatImg={msg.chatImg}
								Yearstamp={msg.Yearstamp}
								monthStamp={msg.monthStamp}
								dayStamp={msg.dayStamp}
								minuteStamp={msg.minuteStamp}
								timeStamp={msg.timeStamp}
							/>
						))}
					
				</div>
				<div ref={vAssist}> </div>
			</div>
			<div className={styles.chatCover}>
				<form className={styles.inputCover} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.chatInput}>
						<textarea
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
							<ChatImageBtn />
						</label>
					</div>
					<button
						onSubmit={handleSubmit(onSubmit)}
						className={styles.chatBtn}
						type="submit"
					>
						<ChatBtn />
					</button>
				</form>
			</div>
		</div>
	);
};

Chat.displayName = "Chat";
export default Chat;
