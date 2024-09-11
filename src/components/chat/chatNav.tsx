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
import ChatNotice from "./chatNotice";

interface ChatProps {
	setStateName: string;
	setRoomName: string;
	setRoomLocation: string;
	senderId: string;
	senderName: string;
	senderPic: string;
	user: string;
	senderState:string;
	senderArea:string;
	roomName:string;
	setContactNameDisplay:any;
	setContactContactDisplay:any;
}

interface ContactValue {
	contactId: string;
	contactNumber:string;
	contactImg:string;
	contactName:string;
	contactAddress:string;
	stateSelect: string;
	areaSelect: string;
	lastMsg:string;
	docid:string;
}

interface RetrievedContactValue {
	name: string;
	address: string;
	number: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	docid:string;
}

interface FormValue {
	name: string;
	address: string;
	stateSelect: string;
	areaSelect: string;
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

const ChatNav: React.FC<ChatProps> = ({
	setRoomName,
	setRoomLocation,
	senderId,
	senderName,
	senderPic,
	setStateName,
	senderState,
	senderArea,
	roomName,
	setContactNameDisplay,
	setContactContactDisplay,
}) => {


	const {
		register,
		watch,
		formState: {
	
		},
	} = useForm<FormValue>({
		defaultValues: {
			name:"",
			address: "",
			stateSelect: "",
			areaSelect: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	

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

	const myConnectRef = collection(database, `connection-${senderId}`);

	const contactQuery = query(
		myConnectRef
	);

	const [contactDetails, setContactDetails] = useState<ContactValue[]>([]);

	const handleGetContactDetail = async () => {
		try {
			const querySnapshot = await getDocs(myConnectRef);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: ContactValue[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as ContactValue;
				retrievedData.push(docData);
			});
			setContactDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetContactDetail();
	}),
		[];

		const handleDeleteMyContact = async (data: ContactValue) => {
			try {
				await deleteDoc(doc(myConnectRef, data.docid)).then(() => {
	
					
				});
			} catch (error) {
				console.error("Error adding profile detail:", error);
			}
		};

		const filteredMyContactState= contactDetails?.length > 0
		? contactDetails.filter((eachItem) => {
			const text = eachItem.stateSelect.toLowerCase();
			return (SelectState !==(null || undefined|| "" || "Select State")?text.includes(SelectState.toLowerCase()):text );
		}):[];
	
		const filteredMyContactarea = filteredMyContactState?.length > 0 ?filteredMyContactState.filter((eachItem) => {
			const text = eachItem.areaSelect.toLowerCase();
			return (SelectArea !==(null || undefined|| "" || "Select Area")?text.includes(SelectArea.toLowerCase()):text );
		}):[];

		const filteredMyContactAddres =
		filteredMyContactarea?.length > 0
			? filteredMyContactarea.filter((eachItem) => {
					const text = eachItem.contactAddress.toLowerCase();
					return text.includes(searchInput);
			  })
			: [];
			
		const filteredMyContactName =
			filteredMyContactAddres?.length > 0
				? filteredMyContactAddres.filter((eachItem) => {
						const text = eachItem.contactName.toLowerCase();
						return text.includes(searchName);
					})
				: [];

		const  RenderMyContact: any=()=>{
			if(contactDetails.length === 0){
				return(
					<div>
						<div>You Have No Available Contact</div>
					</div>
				)
			}
			return filteredMyContactName.map((contact)=>{
				<div id={contact.contactId} className={styles.contactCover}>
					<MyContactComponent contactNumber={contact.contactNumber} contactImg={contact.contactImg} contactName={contact.contactName} lastMsg={contact.lastMsg} handleDeleteContact={handleDeleteMyContact} contact={contact} setRoomName={setRoomName} roomName={roomName} setContactNameDisplay={setContactNameDisplay} setContactContactDisplay={setContactContactDisplay} />
				</div>
			})
		}

		const noticeRef = collection(database, `notice`);


				const ConnectionRequest = async (data:RetrievedContactValue) => {
					try {
						const docRef = await addDoc(noticeRef, {
							noticetId: "",
							senderId: `${senderId}`,
							senderArea: `${senderArea}`,
							senderName: `${senderName}`,
							senderPic: `${senderPic}`,
							senderState: `${senderState}`,
							seen: "notSeen",
							status:"pending",
							requesteeId: `${data.docid}`,
							noticeType:`request`,
              noticeMsg:`connection request`
						});
						const docId = docRef.id;
						
						await setDoc(
							doc(noticeRef, docId),
							{
								noticetId: docId,
							},
							{ merge: true }
						);
			
						console.log("Profile detail added successfully");
					} catch (error) {
						console.error("Error adding profile detail:", error);
					}
				};


		const profileDetailRef = collection(database, `profile`);

	const [retrivedContact, setRetrivedContact] = useState<RetrievedContactValue[]>([]);

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

	const filteredContactState= retrivedContact?.length > 0
		? retrivedContact.filter((eachItem) => {
			const text = eachItem.stateSelect.toLowerCase();
			return (SelectState !==(null || undefined|| "" || "Select State")?text.includes(SelectState.toLowerCase()):text );
		}):[];
	
		const filteredContactarea = filteredContactState?.length > 0 ?filteredContactState.filter((eachItem) => {
			const text = eachItem.areaSelect.toLowerCase();
			return (SelectArea !==(null || undefined|| "" || "Select Area")?text.includes(SelectArea.toLowerCase()):text );
		}):[];

		const filteredContactAddres =
		filteredContactarea?.length > 0
			? filteredContactarea.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchInput);
			  })
			: [];
			
		const filteredContactName =
			filteredContactAddres?.length > 0
				? filteredContactAddres.filter((eachItem) => {
						const text = eachItem.name.toLowerCase();
						return text.includes(searchName);
					})
				: [];

				const  RenderContact: any=()=>{
					if(contactDetails.length === 0){
						return(
							<div>
								<div> No Available Contact</div>
							</div>
						)
					}
					return filteredContactName.map((contact)=>{
						<div id={contact.docid} className={styles.contactCover}>
							<ContactComponent contactImg={contact.src} contactName={contact.name} handleRequestContact={ConnectionRequest} contact={contact}/>
						</div>
					})
				}

				const [noticeDetails, setNoticeDetails] = useState<noticeValue[]>([]);

				const handleGetNotifications = async () => {
					try {
						const querySnapshot = await getDocs(myConnectRef);
			
						if (querySnapshot.empty) {
							console.log("No profile details found");
							return;
						}
			
						const retrievedData: noticeValue[] = [];
						querySnapshot.forEach((doc) => {
							const docData = doc.data() as noticeValue;
							retrievedData.push(docData);
						});
						setNoticeDetails(retrievedData);
					} catch (error) {
						console.error("Error getting profile detail:", error);
					}
				};

				useEffect(() => {
					handleGetNotifications();
				}, []);

				const  RenderNotice: any=()=>{
					if(noticeDetails.length === 0){
						return(
							<div>
								<div> No Available Contact</div>
							</div>
						)
					}
					return noticeDetails.map((notice)=>{
						<div id={notice.noticetId} className={styles.contactCover}>
							<ChatNotice senderId={notice.senderId} senderName={notice.senderName} 	senderPic={notice.senderPic} senderState={notice.senderState} senderArea={notice.senderArea} requesteeId={notice.requesteeId}  />
						</div>
					})
				}

				
	return (
		<div className={styles.chatNavContainer}>
			<div className={styles.filterCover}>
				<form className={styles.filterContact}>
				<div className={styles.selectCover}>
						<select value={SelectState !==(undefined || null) ? SelectState:"Select State" } className={styles.select} {...register("stateSelect")}>
							<option className={styles.option} value="Select State">
							Select State
							</option>
							{renderAvailableStates()}
						</select>
					</div>
				<div className={styles.selectCover}>
						<select value={SelectArea!==(undefined || null)? SelectArea:(SelectState?"": "Select Area")} className={styles.select} {...register("areaSelect")}>
							<option className={styles.option} value="Select Area">
							Select Area
							</option>
							{SelectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("address")}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Personal Address"
						/>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("name")}
							value={searchName}
							onChange={updateSearchName}
							id="vendorAddress"
							placeholder="Search for Contact Name"
						/>
					</div>
				</form>
			</div>
			
			<div className={styles.contactCover}>
				
			</div>
			<div className={styles.contactCover}>
				<div className={switched==="myContact"?styles.displayMyContact: styles.hide} onClick={()=>{
					switched !== "myContact" ? ( setSwitched("myContact"), setSelectArea(""), setSearchInput(""), setSearchName("")): setSwitched("");
				
				}}>
          <RenderMyContact/>
				</div>
				<div className={switched==="contact"?styles.displayMyContact: styles.hide} onClick={()=>{
					switched !== "contact" ? (setSwitched("contact"), setSelectArea(""), setSearchInput(""), setSearchName("")): setSwitched("");
				}}>
          <RenderContact/>
				</div>
			</div>
		</div>
	);
};

ChatNav.displayName = "ChatNav";
export default ChatNav;
