"use client";
import React, { useRef } from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import Image from "next/image";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	updateEmail,
	sendEmailVerification,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Services } from "@/database/data";
import { StateData } from "@/database/stateData";
import Nav from "@/components/nav/mainNav/nav";
import Loader from "@/components/load/load";
import { Suspense } from "react";
import Loading from "../register/logo";
import VisibilityBtn from "@/components/btn/visibilityBtn";
import styles from "./styles.module.css";

type FormValue = {
	name: string;
	email: string;
	passCode0: string;
	passCodeV0: string;
	password: string;
	selectCategory: string;
	selectService: string;
	address: string;
	number: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
};

Services;

const Vendor: React.FC<any> = ({ state }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		getFieldState,
		formState: { isSubmitSuccessful, isDirty, isSubmitting },
	} = useForm<FormValue>({
		defaultValues: {
			name: "",
			email: "",
			passCode0: "",
			passCodeV0: "",
			password: "",
			selectCategory: "",
			selectService: "",
			address: "",
			number: "",
			countrySelect: "",
			stateSelect: "",
			areaSelect: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const { auth, storage, database } = firebase;

	const [passwordVisible, setPasswordVisible] = useState(false);

	const [passwordVisibleV, setPasswordVisibleV] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [profileDetails, setProfileDetails] = useState("");

	const router = useRouter();

	const handleTogglePassword = () => {
		setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
	};

	const handleTogglePasswordV = () => {
		setPasswordVisibleV((prevPasswordVisibleV) => !prevPasswordVisibleV);
	};

	const check0 = watch("passCode0");

	const selectService = watch("selectCategory");
	const ServiceSelect = watch("selectService");
	const selectCountry = watch("countrySelect");
	const selectState = watch("stateSelect");
	const selectArea = watch("areaSelect");
	

	const UserEmail =
		typeof document !== "undefined"
			? (document.querySelector("#email") as HTMLInputElement)?.value || ""
			: "";

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="stateSelect"]') as HTMLInputElement)
					?.value || ""
			: "";

	if (isSubmitSuccessful) {
		reset();
	}

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateValue}`
	);

	const autoCategory = Services.find(
		(category) => category.category === "Automotive"
	);

	const maintenanceCategory = Services.find(
		(category) => category.category === "Maintenance"
	);

	const personalCategory = Services.find(
		(category) => category.category === "Others"
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

	function renderAutomotiveServices() {
		if (!autoCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return autoCategory.services.map((service) => (
			<option className={styles.option} key={service.id}>
				{service.name}
			</option>
		));
	}
	function renderMaintenance1Services() {
		if (!maintenanceCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return maintenanceCategory.services.map((service) => (
			<option className={styles.option} key={service.id}>
				{service.name}
			</option>
		));
	}
	function renderPersonalServices() {
		if (!personalCategory) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return personalCategory.services.map((service) => (
			<option className={styles.option} key={service.id}>
				{service.name}
			</option>
		));
	}

	const handleProfileDetail = async (data: FormValue) => {
		try {
			const profileDetailRef = collection(database, `profile`);

			const docRef = await addDoc(profileDetailRef, {
				name: data.name,
				address: data.address,
				number: data.number,
				selectCategory: data.selectCategory,
				selectService: data.selectService,
				countrySelect: "Nigeria",
				stateSelect: data.stateSelect,
				areaSelect: data.areaSelect,
				email: `${UserEmail}`,
				src: "",
				docid: "",
			});
			const docId = docRef.id;
			setProfileDetails(docId);
			state(true);
			const setProfileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(setProfileDetailRef, docId),
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

	const Register = (data: FormValue) => {
		createUserWithEmailAndPassword(auth, data.email, data.passCode0)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				updateProfile(user, {
					displayName: `${data.name}`,
				});

				updateEmail(user, `${data.email}`);

				router.push("dashboard");
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				state(false);

				// ..
			});
	};

	const imageRef = ref(storage, `image/${UserEmail}`);

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
				doc(profileDetailRef, profileDetails),
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

	const onSubmit = (data: FormValue) => {
		handleProfileDetail(data);
		handleUpload();
		handleImageProfileDetail();
		Register(data);
	};

	if (isSubmitSuccessful) {
		reset();
	}

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.innerFormCover}>
				<div className={styles.formCoverLeft}>
					<div className={styles.selectCover}>
						<select
							value={
								selectService !== (undefined || null)
									? selectService
									: selectState
									? ""
									: "Select Service Category"
							}
							className={styles.select}
							{...register("selectCategory", {
								required: "Required",
							})}
						>
							<option>Select Service Category</option>
							<option className={styles.option} value="Automotive">
								{autoCategory?.category}
							</option>
							<option className={styles.option} value="Maintenance">
								{maintenanceCategory?.category}
							</option>
							<option className={styles.option} value="Others">
								{personalCategory?.category}
							</option>
						</select>
					</div>

					<div className={styles.selectCover}>
						<select
							value={
								ServiceSelect !== (undefined || null)
									? ServiceSelect
									: selectService
									? ""
									: "Select Service"
							}
							className={styles.select}
							{...register("selectService", {
								required: "Required",
							})}
						>
							<option className={styles.option} value="Select Service">
								Select Service
							</option>
							{selectService === "Automotive" && renderAutomotiveServices()}
							{selectService === "Maintenance" && renderMaintenance1Services()}
							{selectService === "Others" && renderPersonalServices()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								selectState !== (undefined || null)
									? selectState
									: selectCountry === "Nigeria"
									? ""
									: "Select State"
							}
							className={styles.select}
							{...register("stateSelect", {
								required: "Required",
							})}
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
								selectArea !== (undefined || null)
									? selectArea
									: selectState
									? ""
									: "Select Area"
							}
							className={styles.select}
							{...register("areaSelect", {
								required: "Required",
							})}
						>
							<option className={styles.option} value="select Area">
								Select Area
							</option>
							{selectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>

					<div className={styles.textCover}>
						<textarea
							className={styles.textarea}
							{...register("address", {
								required: "Required",
							})}
							id="Address"
							placeholder={"Enter Contact Address"}
							rows={3}
						/>
					</div>
					<div className={styles.inputCover}>
						<input
							type="text"
							className={styles.input}
							{...register("number", {
								required: "Required",
							})}
							id="number"
							placeholder={"Enter Contact Number"}
						/>
					</div>
				</div>
				<div className={styles.formCoverRight}>
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

					<div className={styles.inputCover}>
						<input
							type="text"
							className={styles.input}
							{...register("email", {
								required: "Required",
							})}
							id="email"
							placeholder={"Enter Contact Email"}
						/>
					</div>
					<div className={styles.passcodeContainer}>
						<input
							{...register("passCode0", {
								required: "Required",
							})}
							onKeyUp={() => onkeyup}
							className={styles.input1}
							type={passwordVisible ? "text" : "password"}
							placeholder={"Enter Contact PassWord"}
							id="password"
						/>
            <VisibilityBtn state={passwordVisible} setState={setPasswordVisible} />
					</div>
					<div className={styles.passcodeContainer}>
						<input
							{...register("passCodeV0", {
								required: "error message",
								validate: (value) => value === check0,
							})}
							onKeyUp={() => onkeyup}
							className={styles.input1}
							type={passwordVisibleV ? "text" : "password"}
							placeholder={"Verify Contact  PassWord"}
						/>
					 <VisibilityBtn state={passwordVisibleV} setState={setPasswordVisibleV} />
					</div>
					<button className={styles.RegiterButton} type="submit">
						Register
					</button>
				</div>
			</div>
		</form>
	);
};

Vendor.displayName = "Vendor";
export default Vendor;
