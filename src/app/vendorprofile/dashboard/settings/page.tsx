"use client";
import React, { useRef } from "react";
import { useState } from "react";
import UserNav from "@/components/nav/vendorNav/nav";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import {
	collection,
	addDoc,
	setDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { Services } from "@/database/data";
import { StateData } from "@/database/stateData";
import { onAuthStateChanged } from "firebase/auth";
import styles from "./styles.module.css";

type FormValue = {
	email: string;
	passCode0: string;
	passCodeV0: string;
	selectCategory: string;
	selectService: string;
	input: any;
	name: string;
	address: string;
	number: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	docid: string;
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
			selectCategory: "",
			selectService: "",
			name: "",
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


	const [profileDetails, setProfileDetails] = useState<FormValue | null>(null);

	const router = useRouter();
	const user = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
		if (user) {
			user.reload();
		} else {
			router.push("/");
		}
	});


	const selectService = watch("selectCategory");
	const selectCountry = watch("countrySelect");
	const selectState = watch("stateSelect");

	const UserEmail =
		(document.querySelector("#email") as HTMLInputElement)?.value || "";
	const UserPassword =
		(document.querySelector("#password") as HTMLInputElement)?.value || "";
	const UserName =
		(document.querySelector("#name") as HTMLInputElement)?.value || "";

	const countryValue =
		(document.querySelector('[name="countrySelect"]') as HTMLInputElement)
			?.value || "";

	const stateValue =
		(document.querySelector('[name="stateSelect"]') as HTMLInputElement)
			?.value || "";

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

	const handleProfileDetail = async (data: FormValue) => {
		try {
			const setProfileDetailRef = collection(database, `profile`);

			await setDoc(
				doc(setProfileDetailRef, profileDetails?.docid),
				{
					name: data.name,
					address: data.address,
					number: data.number,
					selectCategory: data.selectCategory,
					selectService: data.selectService,
					countrySelect: data.countrySelect,
					stateSelect: data.stateSelect,
					areaSelect: data.areaSelect,
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
	};

	const categoryFieldState = getFieldState("selectCategory");

	return (
		<div className={styles.mainBody}>
			<UserNav />
			<div className={styles.formContainer}>
				<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.innerFormCover}>
						
						<div className={styles.formCoverLeft}>
						<div className={styles.header}><h1>Edith Your Profile Detail{"'"}s Here</h1></div>
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
									{selectService === "Automotive" && renderAutomotiveServices()}
									{selectService === "Maintenance" &&
										renderMaintenance1Services()}
									{selectService === "Personal" && renderPersonalServices()}
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
									<option className={styles.option} value="select Country">
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
									<option className={styles.option} value="select State">
										Select State
									</option>
									{selectCountry === "Nigeria" && renderAvailableStates()}
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
									{selectState === `${stateValue}` && renderAvailableAreas()}
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
									{...register("name", { required: true, maxLength: 10 })}
									id="name"
									placeholder={"User Name Max Of 10 Letters"}
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
							<button className={styles.RegiterButton} type="submit">
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
