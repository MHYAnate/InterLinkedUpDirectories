"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import VendorNav from "@/components/nav/vendorNav/nav";
import { MarketTag } from "@/database/marketTag";
import { MarketStatus } from "@/database/marketStatus";
import { MarketCondition } from "@/database/marketCondition";
import styles from "./styles.module.css";

type FormValue = {
	image: any;
	image2: any;
	title: string;
	status: string;
	price: string;
	features: string;
	condition: string;
	inventory: string;
	tag: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
	address: string;
	email: string;
	name: string;
	number: string;
	picture: string;
	docid: string;
	shop: string;
	src: string;
};

const { auth, storage, database } = Firebase;

export default function Market() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		getFieldState,
		formState: { isSubmitSuccessful, isDirty, isSubmitting },
	} = useForm<FormValue>({
		defaultValues: {
			image: "",
			image2: "",
			title: "",
			status: "",
			price: "",
			features: "",
			condition: "",
			inventory: "",
			tag: "",
			countrySelect: "",
			stateSelect: "",
			areaSelect: "",
			address: "",
			email: "",
			name: "",
			number: "",
			picture: "",
			docid: "",
			shop: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [profileDetails, setProfileDetails] = useState<FormValue | null>(null);
	const [docStatecId, setDocId] = useState("");

	const [imageUrl, setImageUrl] = useState("");

	const [imageUrl2, setImageUrl2] = useState("");

	const [tab, setTab] = useState("");
	const [userA, setUser] = useState<any>(auth);

	const router = useRouter();
	const user = auth.currentUser;

	const UserEmail =
		(document.querySelector("#email") as HTMLInputElement)?.value || "";

	const imageRef = ref(storage, `stock/${user?.email}`);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload1 = () => {
		const fileInput = fileInputRef.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef, file)
				.then((snapshot) => {
					getDownloadURL(imageRef).then((url) => {
						setImageUrl(url);
						setTab("");
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

	const imageRef2 = ref(storage, `stock2/${user?.email}`);

	const fileInputRef2 = useRef<HTMLInputElement>(null);

	const handleImageUpload2 = () => {
		const fileInput = fileInputRef2.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef2, file)
				.then((snapshot) => {
					getDownloadURL(imageRef2).then((url) => {
						setImageUrl2(url);
						setTab("");
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

	const profileDetailRef = collection(database, `profile`);

	const userQuery = query(
		profileDetailRef,
		where("email", "==", `${user?.email}`)
	);

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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				handleGetProfileDetail();
			} else {
				// Redirect to login page if not signed in
				router.push("/");
			}
		});

		// Cleanup function to avoid memory leaks
		return () => unsubscribe();
	}, []);

	const handleProfileDetail = async (data: FormValue) => {
		try {
			const profileDetailRef = collection(database, `market`);

			const docRef = await addDoc(profileDetailRef, {
				image: data.image,
				image2: data.image2,
				title: data.title,
				status: data.status,
				price: data.price,
				features: data.features,
				condition: data.condition,
				inventory: data.inventory,
				tag: data.tag,
				countrySelect: profileDetails?.countrySelect,
				stateSelect: profileDetails?.stateSelect,
				areaSelect: profileDetails?.areaSelect,
				address: profileDetails?.address,
				email: profileDetails?.email,
				name: profileDetails?.name,
				number: profileDetails?.number,
				picture: profileDetails?.src,
				userId: profileDetails?.docid,
				docid: "",
				shop: "",
			});
			const docId = docRef.id;
			setDocId(docId);

			const setProfileDetailRef = collection(database, "market");

			await setDoc(
				doc(setProfileDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			console.log("stock detail added successfully");
		} catch (error) {
			console.error("Error adding stock detail:", error);
		}
	};

	const handleProfileImageDetail1 = async () => {
		try {
			const profileDetailRef = collection(database, "market");
			await setDoc(
				doc(profileDetailRef, docStatecId),
				{
					image: imageUrl,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleProfileImageDetail2 = async () => {
		try {
			const profileDetailRef = collection(database, `market`);
			await setDoc(
				doc(profileDetailRef, docStatecId),
				{
					image2: imageUrl2,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	useEffect(() => {
		handleProfileImageDetail1();
	}, [handleImageUpload1]);

	const onSubmit = (data: FormValue) => {
		handleProfileDetail(data);
		handleImageUpload1();
		handleImageUpload2();
		handleProfileImageDetail1();
		handleProfileImageDetail2();
	};

	function RenderMarketTag() {
		if (!MarketTag) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketTag.map((tag) => (
			<option className={styles.renderCover} key={tag.id} value={tag.tag}>
				{tag.tag}
			</option>
		));
	}

	function RenderMarketStatus() {
		if (!MarketStatus) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketStatus.map((status) => (
			<option
				className={styles.renderCover}
				key={status.id}
				value={status.status}
			>
				{status.status}
			</option>
		));
	}

	function RenderMarketCondition() {
		if (!MarketStatus) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketCondition.map((condition) => (
			<option
				className={styles.renderCover}
				key={condition.id}
				value={condition.condition}
			>
				{condition.condition}
			</option>
		));
	}

	return (
		<div className={styles.Main}>
			<VendorNav />
			<div className={styles.pageBodyCover}>
				<div className={styles.idBody}>
					<div className={styles.idName}>Market</div>
					<div>
						<Image
							className={styles.idiImg}
							src="/service/commerce.jpg"
							alt="Picture of the author"
							width={500}
							height={500}
							unoptimized
							quality={100}
						/>
					</div>
				</div>
				<div className={styles.bodyCover}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.innerFormCover}>
							<div className={styles.selectCover}>
								<select
									className={styles.select}
									{...register("tag", {
										required: "Required",
									})}
								>
									<option className={styles.option} value="select">
										Select tag
									</option>
									{RenderMarketTag()}
								</select>
							</div>
							<div className={styles.inputCover}>
								<input
									type="text"
									className={styles.input}
									{...register("title", {
										required: "Required",
									})}
									id="title"
									placeholder={"Name of Stock"}
								/>
							</div>
							<div className={styles.selectCover}>
								<select
									className={styles.select}
									{...register("status", {
										required: "Required",
									})}
								>
									<option className={styles.option} value="select">
										Select Status
									</option>
									{RenderMarketStatus()}
								</select>
							</div>
							<div className={styles.inputCover}>
								<input
									type="text"
									className={styles.input}
									{...register("price", {
										required: "Required",
									})}
									id="price"
									placeholder={"enter price"}
								/>
							</div>
							<div className={styles.inputCover}>
								<textarea
									className={styles.textarea}
									{...register("features", {
										required: "Required",
									})}
									id="features"
									placeholder={"features"}
									rows={3}
								/>
							</div>
							<div className={styles.selectCover}>
								<select
									className={styles.select}
									{...register("status", {
										required: "Required",
									})}
								>
									<option className={styles.option} value="select">
										Select Status
									</option>
									{RenderMarketStatus()}
								</select>
							</div>
							<div className={styles.selectCover}>
								<select
									className={styles.select}
									{...register("condition", {
										required: "Required",
									})}
								>
									<option className={styles.option} value="select">
										Select Stock Condition
									</option>
									{RenderMarketCondition()}
								</select>
							</div>
							<div className={styles.inputCover}>
								<input
									type="text"
									className={styles.input}
									{...register("inventory", {
										required: "Required",
									})}
									id="inventory"
									placeholder={"Number of Stock"}
								/>
							</div>
							<div className={styles.inputCover}>
								<input
									type="text"
									className={styles.input}
									{...register("name", {
										required: "Required",
									})}
									id="name"
									placeholder={"Vendor's User Name"}
								/>
							</div>

							<div className={styles.inputImageCover}>
								<input
									type="file"
									accept="image/*"
									className={styles.input}
									ref={fileInputRef}
									placeholder="Upload Stock Front Picture"
								/>
							</div>
							<div className={styles.inputImageCover}>
								<input
									type="file"
									accept="image/*"
									className={styles.input}
									ref={fileInputRef2}
									placeholder="Upload Stock Side Picture"
								/>
							</div>

							<button className={styles.RegiterButton} type="submit">
								Post
							</button>
						</div>
					</form>
					<div></div>
				</div>
			</div>
		</div>
	);
}
