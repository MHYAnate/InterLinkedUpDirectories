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
import { Suspense } from 'react'
import Loading from "../register/logo";
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

export default function Register() {
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
	const [isVendorTab, setIsVendorTab] = useState("vendor");
	const [loader, setLoader] = useState(false);

	const router = useRouter();

	const handleTogglePassword = () => {
		setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
	};

	const handleTogglePasswordV = () => {
		setPasswordVisibleV((prevPasswordVisibleV) => !prevPasswordVisibleV);
	};

	const check0 = watch("passCode0");

	const selectService = watch("selectCategory");
	const selectCountry = watch("countrySelect");
	const selectState = watch("stateSelect");

	const UserEmail =typeof document !== 'undefined' ?
		(document.querySelector("#email") as HTMLInputElement)?.value || "":"";
	
	const countryValue =typeof document !== 'undefined' ?
		(document.querySelector('[name="countrySelect"]') as HTMLInputElement)
			?.value || "":"";

	const stateValue =typeof document !== 'undefined' ?
		(document.querySelector('[name="stateSelect"]') as HTMLInputElement)
			?.value || "":"";

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
		(category) => category.category === "Personal"
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
				countrySelect: data.countrySelect,
				stateSelect: data.stateSelect,
				areaSelect: data.areaSelect,
				email: `${UserEmail}`,
				src: "",
				docid: "",
			});
			const docId = docRef.id;
			setProfileDetails(docId);
			setLoader(true);
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

				setLoader(false);

				// ..
			});
	};

	const categoryFieldState = getFieldState("selectCategory");

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

	return (
		<Suspense fallback={<Loading/>}>
		<>
			{loader ? (
				<Loader />
			) : (
				<div className={styles.Main}>
					<nav className={styles.navHolder}>
						<Nav />
					</nav>
					<div className={styles.formContainer}>
						<div className={styles.titleCover}>
							<div className={styles.categoryCover}>
								<div className={styles.categoryImgCover}>
									<Image
										object-fit="cover"
										className={styles.categoryImg}
										alt="Picture of the author"
										quality={100}
										width={100}
										height={100}
										src="/service/register.jpg"
										priority={true}
										unoptimized
									/>
								</div>
								<div className={styles.title}>
									<div className={styles.flextitle}></div>
								</div>
							</div>
						</div>
						<div className={styles.formCover}>
							<div className={styles.topSelect}>
								<div
									onClick={() => setIsVendorTab("user")}
									className={
										isVendorTab === "user"
											? styles.topSelectBtnLeftSelected
											: styles.topSelectBtnLeft
									}
								>
									<span className={styles.tsSpan}>Register as User</span>
								</div>
								<div
									onClick={() => setIsVendorTab("vendor")}
									className={
										isVendorTab === "vendor"
											? styles.topSelectBtnRightSelected
											: styles.topSelectBtnRight
									}
								>
									<span className={styles.tsSpan}>Register as Vendor</span>
								</div>
							</div>
							{isVendorTab === "vendor" && (
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.innerFormCover}>
										<div className={styles.formCoverLeft}>
											<div className={styles.selectCover}>
												<p className={styles.selectTitle}>
													{categoryFieldState.isDirty
														? ""
														: "Start by Selecting Your Service Category Here"}
												</p>
												<select
													className={styles.select}
													{...register("selectCategory", {
														required: "Required",
													})}
												>
													<option>{"Select Service Category"}</option>
													<option className={styles.option} value="Automotive">
														{autoCategory?.category}
													</option>
													<option className={styles.option} value="Maintenance">
														{maintenanceCategory?.category}
													</option>
													<option className={styles.option} value="Personal">
														{personalCategory?.category}
													</option>
												</select>
											</div>

											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("selectService", {
														required: "Required",
													})}
												>
													<option className={styles.option} value="select">
														Select Service
													</option>
													{selectService === "Automotive" &&
														renderAutomotiveServices()}
													{selectService === "Maintenance" &&
														renderMaintenance1Services()}
													{selectService === "Personal" &&
														renderPersonalServices()}
												</select>
											</div>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("countrySelect", {
														required: "Required",
													})}
													value={countryValue}
												>
													<option
														className={styles.option}
														value="select Country"
													>
														Select Country
													</option>
													<option className={styles.option} value="Nigeria">
														Nigeria
													</option>
												</select>
											</div>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("stateSelect", {
														required: "Required",
													})}
												>
													<option
														className={styles.option}
														value="select State"
													>
														Select State
													</option>
													{selectCountry === "Nigeria" &&
														renderAvailableStates()}
												</select>
											</div>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("areaSelect", {
														required: "Required",
													})}
												>
													<option className={styles.option} value="select Area">
														Select Area
													</option>
													{selectState === `${stateValue}` &&
														renderAvailableAreas()}
												</select>
											</div>

											<div className={styles.inputCover}>
												<textarea
													className={styles.textarea}
													{...register("address", {
														required: "Required",
													})}
													id="Address"
													placeholder={"Address"}
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
													placeholder={"number"}
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
													className={styles.input}
													ref={fileInputRef}
													placeholder="Upload Display Picture"
												/>
											</div>

											<div className={styles.inputCover}>
												<input
													type="text"
													className={styles.input}
													{...register("email", {
														required: "Required",
													})}
													id="email"
													placeholder={"Email"}
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
													placeholder={"PassWord"}
													id="password"
												/>
												<div
													className={styles.passWordVisibilityBtn}
													id="toggle-password"
													onClick={handleTogglePassword}
												>
													{passwordVisible ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
														</svg>
													)}
												</div>
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
													placeholder={"Verify PassWord"}
												/>
												<div
													className={styles.passWordVisibilityBtn}
													id="toggle-password"
													onClick={handleTogglePasswordV}
												>
													{passwordVisibleV ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
														</svg>
													)}
												</div>
											</div>
											<button className={styles.RegiterButton} type="submit">
												Register
											</button>
										</div>
									</div>
								</form>
							)}
							{isVendorTab === "user" && (
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.innerFormCover}>
										<div className={styles.formCoverLeft}>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("countrySelect", {
														required: "Required",
													})}
													value={countryValue}
												>
													<option
														className={styles.option}
														value="select Country"
													>
														Select Country
													</option>
													<option className={styles.option} value="Nigeria">
														Nigeria
													</option>
												</select>
											</div>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("stateSelect", {
														required: "Required",
													})}
												>
													<option
														className={styles.option}
														value="select State"
													>
														Select State
													</option>
													{selectCountry === "Nigeria" &&
														renderAvailableStates()}
												</select>
											</div>
											<div className={styles.selectCover}>
												<select
													className={styles.select}
													{...register("areaSelect", {
														required: "Required",
													})}
												>
													<option className={styles.option} value="select Area">
														Select Area
													</option>
													{selectState === `${stateValue}` &&
														renderAvailableAreas()}
												</select>
											</div>

											<div className={styles.inputCover}>
												<textarea
													className={styles.textarea}
													{...register("address", {
														required: "Required",
													})}
													id="Address"
													placeholder={"Address"}
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
													placeholder={"number"}
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
													placeholder={"User Name"}
												/>
											</div>

											<div className={styles.inputImageCover}>
												<input
													type="file"
													accept="image/*"
													className={styles.input}
													ref={fileInputRef}
													placeholder="Upload Display Picture"
												/>
											</div>

											<div className={styles.inputCover}>
												<input
													type="text"
													className={styles.input}
													{...register("email", {
														required: "Required",
													})}
													id="email"
													placeholder={"Email"}
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
													placeholder={"PassWord"}
													id="password"
												/>
												<div
													className={styles.passWordVisibilityBtn}
													id="toggle-password"
													onClick={handleTogglePassword}
												>
													{passwordVisible ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
														</svg>
													)}
												</div>
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
													placeholder={"Verify PassWord"}
												/>
												<div
													className={styles.passWordVisibilityBtn}
													id="toggle-password"
													onClick={handleTogglePasswordV}
												>
													{passwordVisibleV ? (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
															/>
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={1.5}
															stroke="currentColor"
															className={styles.svg}
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
															/>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
															/>
														</svg>
													)}
												</div>
											</div>
											<button className={styles.RegiterButton} type="submit">
												Register
											</button>
										</div>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			)}
		</>
		</Suspense>
	);
}
