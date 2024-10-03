"use client";
import React, {useState, useEffect} from "react";
import { StateData } from "@/database/stateData";
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
import Notifications from "./notifications";

interface ChatProps {
	senderId: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	senderArea: string;
	requesteeId:string;
	requesteeName: string;
	requesteePic: string;
	requesteeArea: string;
	requesteeState: string;
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
	requesteeId,
	requesteeName,
	requesteePic,
	requesteeArea,
	requesteeState,
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

	const handleGetNoticeDetail = async () => {
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
		handleGetNoticeDetail();
	}),
		[];

	const handleDeleteRequest = async (data: noticeValue) => {
		try {
			await deleteDoc(doc(noticeRef, data.noticetId)).then(() => {});
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const filteredMyNoticeState =
		noticeDetail?.length > 0
			? noticeDetail.filter((eachItem) => {
					const text = eachItem.senderState.toLowerCase();
					return SelectState !== (null || undefined || "" || "Select State")
						? text.includes(SelectState.toLowerCase())
						: text;
			  })
			: [];

	const filteredMyNoticeArea =
		filteredMyNoticeState?.length > 0
			? filteredMyNoticeState.filter((eachItem) => {
					const text = eachItem.senderArea.toLowerCase();
					return SelectArea !== (null || undefined || "" || "Select Area")
						? text.includes(SelectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredNoticeType =
		filteredMyNoticeArea?.length > 0
			? filteredMyNoticeArea.filter((eachItem) => {
					const text = eachItem.senderArea.toLowerCase();
					return SelectArea !== (null || undefined || "" || "Select Area")
						? text.includes(SelectArea.toLowerCase())
						: text;
			  })
			: [];

	const RenderMyNotice: any = () => {
		if (noticeDetail.length === 0) {
			return (
				<div>
					<div>You Have No Available Notice</div>
				</div>
			);
		}
		return filteredNoticeType.map((notice) => {
			<div id={notice.noticetId} className={styles.contactCover}>
				<Notifications senderArea={senderArea} senderName={senderName} senderPic={senderPic} senderState={senderState} handleDeleteRequest={handleDeleteRequest} onConfirm={onConfirm} contact={notice} noticeType={notice.noticeType} noticeMsg={notice.noticeMsg}/>
			</div>;
		});
	};

	const myConnectRef = collection(database, `connection-${requesteeId}`);
	const connectRef = collection(database, `connection-${senderId}`);

	const confirmTheRequest = async (data: noticeValue) => {
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
				senderArea: `${requesteeArea}`,
				senderName: `${requesteeName}`,
				senderPic: `${requesteePic}`,
				senderState: `${requesteeState}`,
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

	const onConfirm = (data:noticeValue) => {
		confirmTheRequest(data);
		confirmRequest(data);
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
					<RenderMyNotice />
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
