"use client";
import React, {useState, useEffect} from "react";
import PublicSvg from "../btn/publicSvg";
import RoomSvg from "../btn/roomSvg";
import StateSvg from "../btn/stateSvg";
import AreaSvg from "../btn/areaSvg";
import CommunitySvg from "../btn/communitySvg";
import ConnectSvg from "../btn/connectSvg";
import ConnectionsSvg from "../btn/conntectionsSvg";
import NoticeSvg from "../btn/noticeSvg";
import MyContactComponent from "./myContactComponent";
import ContactComponent from "./contactComponent";
import { StateData } from "@/database/stateData";
import Logo from "@/components/nav/mainNav/logo";
import Pagination from "../btn/paginationBtn";
import {
	deleteDoc,
	collection,
	setDoc,
	doc,
	getDocs,
	addDoc,
} from "firebase/firestore";
import Firebase from "@/firebase/firebase";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import ChatNotice from "./chatNotice";

interface ChatProps {
	setStateName: any;
	setRoomName: any;
	setRoomLocation: any;
	senderId: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	senderArea: string;
	roomName: string;
	setContactNameDisplay: any;
	setContactContactDisplay: any;
}

interface ContactValue {
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

type Value = {
	selectCategory: string;
	selectService: string;
	name: string;
	address: string;
	number: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	country: string;
	state: string;
	area: string;
	specialty: string;
	docid: string;
};

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
	requesteeName: string;
	requesteePic: string;
	requesteeArea: string;
	requesteeState: string;
	noticeType: string;
	noticeMsg: string;
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
		formState: {},
	} = useForm<FormValue>({
		defaultValues: {
			name: "",
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
			await deleteDoc(doc(myConnectRef, data.docid)).then(() => {});
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const filteredMyContactState =
		contactDetails?.length > 0
			? contactDetails.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return selectState !== (null || undefined || "" || "Select State")
						? text.includes(selectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredMyContactarea =
		filteredMyContactState?.length > 0
			? filteredMyContactState.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return selectArea !== (null || undefined || "" || "Select Area")
						? text.includes(selectArea.toLowerCase())
						: text;
			  })
			: [];

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

	function RenderMyContact(): React.JSX.Element {
		if (contactDetails.length === 0) {
			return (
				<div>
					<div>You Have No Available Contact</div>
				</div>
			);
		}
		return (
			<>
				{filteredMyContactName.map((contact) => {
					return (
						<div id={contact.contactId} className={styles.contactCover}>
							<MyContactComponent
								contactNumber={contact.contactNumber}
								contactImg={contact.contactImg}
								contactName={contact.contactName}
								lastMsg={contact.lastMsg}
								handleDeleteContact={handleDeleteMyContact}
								contact={contact}
								setRoomName={setRoomName}
								roomName={roomName}
								setContactNameDisplay={setContactNameDisplay}
								setContactContactDisplay={setContactContactDisplay}
							/>
						</div>
					);
				})}
			</>
		);
	}

	const noticeRef = collection(database, `notice`);

	const ConnectionRequest = async (data: RetrievedContactValue) => {
		try {
			const docRef = await addDoc(noticeRef, {
				noticetId: "",
				senderId: `${senderId}`,
				senderArea: `${senderArea}`,
				senderName: `${senderName}`,
				senderPic: `${senderPic}`,
				senderState: `${senderState}`,
				seen: "notSeen",
				status: "pending",
				requesteeId: `${data.docid}`,
				requesteeName: `${data.name}`,
				requesteePic: `${data.src}`,
				requesteeArea: `${data.areaSelect}`,
				requesteeState: `${data.stateSelect}`,
				noticeType: `request`,
				noticeMsg: `connection request`,
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

	const [profileDetails, setProfileDetails] = useState<Value[]>([]);

	const handleGetProfileDetail = async () => {
		try {
			const querySnapshot = await getDocs(profileDetailRef);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: Value[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as Value;
				retrievedData.push(docData);
			});
			setProfileDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetProfileDetail();
	}),
		[];

	const filteredContactState =
		profileDetails?.length > 0
			? profileDetails.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return selectState !== (null || undefined || "" || "Select State")
						? text.includes(selectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredContactarea =
		filteredContactState?.length > 0
			? filteredContactState.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return selectArea !== (null || undefined || "" || "Select Area")
						? text.includes(selectArea.toLowerCase())
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

	const filteredContactName =
		filteredContactAddres?.length > 0
			? filteredContactAddres.filter((eachItem) => {
					const text = eachItem.name.toLowerCase();
					return text.includes(searchName);
			  })
			: [];

			const [currentPage, setCurrentPage] = useState(1);
			const [postsPerPage] = useState(5);
		
			// Get current posts
			const indexOfLastPost = currentPage * postsPerPage;
			const indexOfFirstPost = indexOfLastPost - postsPerPage;
			const currentPosts = filteredContactName.slice(indexOfFirstPost, indexOfLastPost);
		
			// Change page
			const paginate = (pageNumber: number) => {
		
				setCurrentPage(pageNumber);
				
			}



	function RenderContact(): React.JSX.Element {
		if (profileDetails.length === 0) {
			return (
				<div>
					<div>There are No Available Contact Yet</div>
				</div>
			);
		}

		return (
			<>
				{currentPosts.map((contact) => {
					return (
						<div
							id={contact.docid}
							className={styles.contactCover}
							key={contact.docid}
						>
							<ContactComponent
								contactImg={contact.src}
								contactName={contact.name}
								handleRequestContact={ConnectionRequest}
								contact={contact}
							/>
						</div>
					);
				})}
			</>
		);
	}

	const [noticeDetails, setNoticeDetails] = useState<noticeValue[]>([]);

	const handleGetNotifications = async () => {
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
			setNoticeDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetNotifications();
	}, []);

	useEffect(() => {
		setSelectState(selectState);
		setSelectArea(selectArea);
	}, [selectState, selectArea]);

	function RenderNotice(): React.JSX.Element {
		if (noticeDetails.length === 0) {
			return (
				<div>
					<div> You Have No Notifications</div>
				</div>
			);
		}
		return (
			<>
				{noticeDetails.map((notice) => {
					return (
						<div id={notice.noticetId} className={styles.contactCover}>
							<ChatNotice
								senderId={notice.senderId}
								senderName={notice.senderName}
								senderPic={notice.senderPic}
								senderState={notice.senderState}
								senderArea={notice.senderArea}
								requesteeId={notice.requesteeId}
								requesteeName={notice.requesteeName}
								requesteePic={notice.requesteePic}
								requesteeArea={notice.requesteeArea}
								requesteeState={notice.requesteeState}
							/>
						</div>
					);
				})}
			</>
		);
	}

	return (
		<div className={styles.chatNavContainer}>
			<div className={styles.chatNavHeader}>
				<div className={styles.chatNavLogo}><Logo/></div>
				<div
					onClick={() => {
						switched !== "notice"
							? (setSwitched("notice"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
					className={
						switched !== "notice" ? styles.unHighLight : styles.highLight
					}
				>
					<div className={styles.svgHolder}><NoticeSvg lenght={noticeDetails} state={switched}/></div>
				</div></div>
				
			<div className={styles.switch}>
				<div
					onClick={() => {
						switched !== "contact"
							? (setSwitched("contact"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
					className={
						switched !== "contact" ? styles.unHighLighted : styles.highLighted
					}
				>
					<div className={styles.svgHolder}><ConnectSvg state={switched}/></div>
					<div className={styles.svgPHolder}>CONNECTS</div>
					</div>
				<div
					onClick={() => {
						switched !== "myContact"
							? (setSwitched("myContact"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
					className={
						switched !== "myContact" ? styles.unHighLighted : styles.highLighted
					}
				>
					<div className={styles.svgHolder}><ConnectionsSvg state={switched} /></div>
					<div className={styles.svgPHolder}>CONNECTIONS</div>
				</div>
				<div
					onClick={() => {
						switched !== "community"
							? (setSwitched("community"),
							  setSelectArea(""),
							  setSearchInput(""),
							  setSearchName(""))
							: setSwitched("");
					}}
					className={
						switched !== "community" ? styles.unHighLighted : styles.highLighted
					}
				>
					<div className={styles.svgHolder}><CommunitySvg state={		switched}/></div>
					<div className={styles.svgPHolder}>COMMUNITIES</div>
				</div>
			</div>
			{(switched === "myContact" || switched === "contact") && (
				<div className={styles.filterCover}>
					<form className={styles.filterContact}>
						<div className={styles.selectors}>
							<div className={styles.selectCoverChatNav}>
								<select
									value={
										selectState !== (undefined || null)
											? selectState
											: "Select State"
									}
									className={styles.selectChatNav}
									{...register("stateSelect")}
								>
									<option className={styles.option} value="Select State">
										Select State
									</option>
									{renderAvailableStates()}
								</select>
							</div>
							<div className={styles.selectCoverChatNav}>
								<select
									value={
										selectArea !== (undefined || null)
											? selectArea
											: selectState
											? ""
											: "Select Area"
									}
									className={styles.selectChatNav}
									{...register("areaSelect")}
								>
									<option className={styles.option} value="Select Area">
										Select Area
									</option>
									{selectState === `${stateValue}` && renderAvailableAreas()}
								</select>
							</div>
						</div>
						<div className={styles.inputCoverChatNav}>
							<input
								type="search"
								className={styles.inputChatNav}
								{...register("address")}
								value={searchInput}
								onChange={updateSearchInput}
								id="vendorAddress"
								placeholder="Search Personal Address"
							/>
						</div>
						<div className={styles.inputCoverChatNav}>
							<input
								type="search"
								className={styles.inputChatNav}
								{...register("name")}
								value={searchName}
								onChange={updateSearchName}
								id="vendorAddress"
								placeholder="Search for Contact Name"
							/>
						</div>
					</form>
				</div>
			)}
			<div className={styles.contactCover}>
				<div
					className={
						switched === "myContact" ? styles.displayMyContact : styles.hide
					}
				>
					{RenderMyContact()}
				</div>
				<div
					className={
						switched === "contact" ? styles.displayMyContact : styles.hide
					}
				>
					<div>{RenderContact()}</div>
					
					<div className={styles.pagi}>
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={filteredContactName.length}
									paginate={paginate}
									currentpage={currentPage}
								/>{" "}
							</div>
				</div>
				<div
					className={
						switched === "notice" ? styles.displayMyContact : styles.hide
					}
				>
				{RenderNotice()}
				</div>
				<div
					className={
						switched === "community" ? styles.displayMyContact : styles.hide
					}
				>
				{RenderNotice()}
				</div>
			</div>
		</div>
	);
};

ChatNav.displayName = "ChatNav";
export default ChatNav;
