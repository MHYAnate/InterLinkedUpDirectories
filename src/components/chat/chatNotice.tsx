"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ChatImageBtn from "../btn/chatImgBtn";
import ChatBtn from "../btn/chatBtn";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import BreketeSvg from "../btn/publicSvg";
import RoomSvg from "../btn/roomSvg";
import StateSvg from "../btn/stateSvg";
import AreaSvg from "../btn/areaSvg";
import RemoveUserSvg from "../btn/removeUserSvg";
import MyContactComponent from "./myContactComponent";
import ContactComponent from "./contactComponent";
import { StateData } from "@/database/stateData";
import {
	deleteDoc,
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
	senderId: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	senderArea: string;
	requesteeId:string;
}

interface ContactValue {
	contactRoomId: string;
	contactId: string;
	contactNumber: string;
	contactImg: string;
	contactName: string;
	contactAddress: string;
	stateSelect: string;
	areaSelect: string;
	lastMsg: string;
	docid: string;
}

interface noticeValue {
	noticetId: string;
	senderId: string;
	senderArea: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	seen: string;
	status: string;
	requesteeId: string;
	noticeType:string;
  noticeMsg:string;
}

interface RetrievedContactValue {
	name: string;
	address: string;
	number: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	docid: string;
}

interface FormValue {
	noticeSelect: string;
	stateSelect: string;
	areaSelect: string;
}

const ChatNotice: React.FC<ChatProps> = ({
	senderId,
	senderName,
	senderPic,
	senderState,
	senderArea,
	requesteeId
}) => {
	const {
		register,
		watch,
		formState: {},
	} = useForm<FormValue>({
		defaultValues: {
			noticeSelect: "",
			stateSelect: "",
			areaSelect: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const selectNotice = watch("noticeSelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const [SelectState, setSelectState] = useState(selectState);

	const [SelectArea, setSelectArea] = useState(selectArea);

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="stateSelect"]') as HTMLInputElement)
					?.value || ""
			: "";

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateValue}`
	);

	function renderAvailableStates() {
		if (!StateData) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return StateData.map((state) => (
			<option
				className={styles.renderCover}
				key={state.name}
				value={state.name}
			>
				{state.name}
			</option>
		));
	}

	function renderAvailableAreas() {
		if (!AreaList) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return AreaList.areaList.map((area) => (
			<option className={styles.renderCover} key={area.id} value={area.name}>
				{area.name}
			</option>
		));
	}

	const [switched, setSwitched] = useState("myContact");

	const [searchInput, setSearchInput] = useState("");

	const [searchName, setSearchName] = useState("");

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const updateSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchName(event.target.value);
		// handleSuggestionClick;
	};

	const { auth, storage, database } = Firebase;

	const noticeRef = collection(database, `notice`);

	const [noticeDetail, setNoticeDetail] = useState<noticeValue[]>([]);

	const handleGetContactDetail = async () => {
		try {
			const querySnapshot = await getDocs(noticeRef);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: noticeValue[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as noticeValue;
				retrievedData.push(docData);
			});
			setNoticeDetail(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetContactDetail();
	}),
		[];

	const handleDeleteRequest = async (data: noticeValue) => {
		try {
			await deleteDoc(doc(noticeRef, data.noticetId)).then(() => {});
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const filteredMyContactState =
		noticeDetail?.length > 0
			? noticeDetail.filter((eachItem) => {
					const text = eachItem.senderState.toLowerCase();
					return SelectState !== (null || undefined || "" || "Select State")
						? text.includes(SelectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredMyContactarea =
		filteredMyContactState?.length > 0
			? filteredMyContactState.filter((eachItem) => {
					const text = eachItem.senderArea.toLowerCase();
					return SelectArea !== (null || undefined || "" || "Select Area")
						? text.includes(SelectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredNoticeType =
		filteredMyContactarea?.length > 0
			? filteredMyContactarea.filter((eachItem) => {
					const text = eachItem.senderArea.toLowerCase();
					return SelectArea !== (null || undefined || "" || "Select Area")
						? text.includes(SelectArea.toLowerCase())
						: text;
			  })
			: [];

	const RenderMyContact: any = () => {
		if (noticeDetail.length === 0) {
			return (
				<div>
					<div>You Have No Available Contact</div>
				</div>
			);
		}
		return filteredNoticeType.map((notice) => {
			<div id={notice.noticetId} className={styles.contactCover}></div>;
		});
	};

	const myConnectRef = collection(database, `connection-${requesteeId}`);
	const connectRef = collection(database, `connection-${senderId}`);

	const contactQuery = query(connectRef);

	const [contactDetails, setContactDetails] = useState<noticeValue[]>([]);

	const confirmMyRequest = async (data: noticeValue) => {
		try {
			const docRef = await addDoc(myConnectRef, {
				connectedId: "",
				connectId: `${data.requesteeId}`,
				senderArea: `${senderArea}`,
				senderName: `${senderName}`,
				senderPic: `${senderPic}`,
				senderState: `${senderState}`,
				connectionId: `${senderId}`,
			});
			const docId = docRef.id;

			await setDoc(
				doc(noticeRef, docId),
				{
					connectedId: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const confirmRequest = async (data: noticeValue) => {
		try {
			const docRef = await addDoc(connectRef, {
				connectedId: "",
				connectId: `${senderId}`,
				senderArea: `${senderArea}`,
				senderName: `${senderName}`,
				senderPic: `${senderPic}`,
				senderState: `${senderState}`,
				connectionId: `${data.requesteeId}`,
			});
			const docId = docRef.id;

			await setDoc(
				doc(noticeRef, docId),
				{
					connectedId: docId,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const profileDetailRef = collection(database, `profile`);

	const [retrivedContact, setRetrivedContact] = useState<
		RetrievedContactValue[]
	>([]);

	const handleGetProfileDetail = async () => {
		try {
			const querySnapshot = await getDocs(profileDetailRef);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: RetrievedContactValue[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as RetrievedContactValue;
				retrievedData.push(docData);
			});
			setRetrivedContact(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetProfileDetail();
	}, []);

	const filteredContactState =
		retrivedContact?.length > 0
			? retrivedContact.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return SelectState !== (null || undefined || "" || "Select State")
						? text.includes(SelectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredContactarea =
		filteredContactState?.length > 0
			? filteredContactState.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return SelectArea !== (null || undefined || "" || "Select Area")
						? text.includes(SelectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredContactAddres =
		filteredContactarea?.length > 0
			? filteredContactarea.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchInput);
			  })
			: [];

	const filteredNameTitle =
		filteredContactAddres?.length > 0
			? filteredContactAddres.filter((eachItem) => {
					const text = eachItem.name.toLowerCase();
					return text.includes(searchName);
			  })
			: [];

	const RenderNotice: any = () => {
		if (noticeDetail.length === 0) {
			return (
				<div>
					<div> No Available Contact</div>
				</div>
			);
		}
		return filteredNameTitle.map((notice) => {
			<div id={notice.docid} className={styles.contactCover}></div>;
		});
	};

	return (
		<div className={styles.chatNoticeContainer}>
			<div className={styles.filterCover}>
				<form className={styles.filterContact}>
					<div className={styles.selectCover}>
						<select
							value={
								SelectState !== (undefined || null)
									? SelectState
									: "Select State"
							}
							className={styles.select}
							{...register("stateSelect")}
						>
							<option className={styles.option} value="Select State">
								Select State
							</option>
							{renderAvailableStates()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								SelectArea !== (undefined || null)
									? SelectArea
									: SelectState
									? ""
									: "Select Area"
							}
							className={styles.select}
							{...register("areaSelect")}
						>
							<option className={styles.option} value="Select Area">
								Select Area
							</option>
							{SelectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								SelectArea !== (undefined || null)
									? SelectArea
									: SelectState
									? ""
									: "Select Area"
							}
							className={styles.select}
							{...register("areaSelect")}
						>
							<option className={styles.option} value="Select Area">
								Select Area
							</option>
							{SelectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
				</form>
			</div>

			<div className={styles.contactCover}></div>
			<div className={styles.contactCover}>
				<div
					className={
						switched === "myContact" ? styles.displayMyContact : styles.hide
					}
					onClick={() => {
						switched !== "myContact"
							? (setSwitched("myContact"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
				>
					<RenderMyContact />
				</div>
				<div
					className={
						switched === "contact" ? styles.displayMyContact : styles.hide
					}
					onClick={() => {
						switched !== "contact"
							? (setSwitched("contact"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
				>
					<RenderNotice />
				</div>
			</div>
		</div>
	);
};

ChatNotice.displayName = "ChatNotice";
export default ChatNotice;
