"use client";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	updateEmail,
} from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { StateData } from "@/database/stateData";
import React, { useState } from "react";
import Link from "next/link";
import Nav from "@/components/nav/mainNav/nav";

interface ProfileValues {
	ranking: string;
	docid: string;
	id: string;
	src: string;
	name: string;
	email: string;
	number: string;
	address: string;
	state: string;
	area: string;
	country: string;
	about: string;
	accountNumber: string;
	accountName: string;
	bankName: string;
	isVendor: string;
	isEmployedId: string;
	isVerified: string;
	gallaryImg1: string;
	gallaryImg2: string;
	gallaryImg3: string;
	coordinates?: [number, number];
	latitude: string;
	longitude: string;
	password: string;
	confirmPassword: string;
	yearsOfExperience: number;
	service1: string;
	s1Price: string;
	service2: string;
	s2Price: string;
	service3: string;
	s3Price: string;
	service4: string;
	s4Price: string;
	service5: string;
	s5Price: string;
	availability: string;
	availableFrom: string;
	availableTo: string;
}

export default function RegisterPage() {
	const router = useRouter();
	const { auth, database } = Firebase;

	// Step state and error messages
	const [step, setStep] = useState(1);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [passwordError, setPasswordError] = useState("");
	const [emailError, setEmailError] = useState("");
	const [navState, setNavState] = useState("");

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<ProfileValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			number: "",
			address: "",
			state: "",
			area: "",
			about: "",
		},
		mode: "onChange",
	});

	// Use watch to access form field values
	const passwordValue = watch("password");
	const confirmPasswordValue = watch("confirmPassword");
	const emailValue = watch("email");
	const selectState = watch("state");

	// Get available areas based on selected state
	const areaData = StateData.find(
		(stateItem) => stateItem.name === selectState
	);

	function renderAvailableStates() {
		return StateData.map((stateItem) => (
			<option key={stateItem.name} value={stateItem.name}>
				{stateItem.name}
			</option>
		));
	}

	function renderAvailableAreas() {
		if (!areaData) return null;
		return areaData.areaList.map((area) => (
			<option key={area.id} value={area.name}>
				{area.name}
			</option>
		));
	}

	// Validate step 1 fields then proceed to step 2
	const handleStepOne = async () => {
		if (!emailValue) {
			setEmailError("Email is required");
			return;
		} else {
			setEmailError("");
		}

		if (passwordValue.length < 8) {
			setPasswordError("Password must be at least 8 characters");
			return;
		}

		if (passwordValue !== confirmPasswordValue) {
			setPasswordError("Passwords do not match");
			return;
		}

		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsLoading(false);
		// Clear any previous errors and move to step 2
		setPasswordError("");
		setStep(2);
	};

	// Save profile details to Firestore
	const handleProfileDetail = async (data: ProfileValues) => {
		try {
			const profileDetailRef = collection(database, "profile");
			const docRef = await addDoc(profileDetailRef, {
				name: data.name,
				address: data.address,
				number: data.number,
				countrySelect: "Nigeria",
				state: data.state,
				area: data.area,
				email: emailValue,
				src: "",
				docid: "",
				ranking: "",
				about: data.about,
				accountNumber: "",
				accountName: "",
				bankName: "",
				isVendor: "true",
				isEmployedId: "",
				isVerified: "",
				gallaryImg1: "",
				gallaryImg2: "",
				gallaryImg3: "",
				coordinates: [0, 0],
				latitude: "",
				longitude: "",
				password: data.password,
			});
			const docId = docRef.id;
			await setDoc(
				doc(database, "profile", docId),
				{ docid: docId },
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	// Final submission handler for step 2
	const onSubmit = (data: ProfileValues) => {
		setIsLoading(true);
		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				await updateProfile(user, { displayName: data.name });
				await updateEmail(user, data.email);
				await handleProfileDetail(data);
				router.push("/dashboard");
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
			});
	};

	return (
		<div className={styles.registerPage}>
			<header className={styles.header}>
				<Nav setQNav={setNavState} qNav={navState} />
			</header>

			<main className={styles.mainContent}>
				<div className={styles.formContainer}>
					<div className={styles.formHeader}>
						<h1 className={styles.formH1}>Create your account</h1>
						<p className={styles.formP}>
							Join our simplified business network with an amplified reach
						</p>
					</div>

					<div className={styles.progressSteps}>
						<div className={styles.progressBar}>
							<div
								className={styles.progressFill}
								style={{ width: step === 1 ? "0%" : "100%" }}
							></div>
						</div>
						<div className={styles.steps}>
							<div
								onClick={() => setStep(1)}
								className={step >= 1 ? styles.stepActive : ""}
							>
								<div className={styles.stepNumber}>1</div>
								<span className={styles.stepLabel}>Account</span>
							</div>
							<div className={step >= 2 ? styles.stepActive : ""}>
								<div className={styles.stepNumber}>2</div>
								<span className={styles.stepLabel}>Details</span>
							</div>
						</div>
					</div>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className={styles.form}
						noValidate
					>
						{step === 1 ? (
							<>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor="email">
										Email
									</label>
									<input
										{...register("email", { required: "Required" })}
										className={styles.input}
										id="email"
										name="email"
										type="email"
										placeholder="Enter your email"
									/>
									{errors.email && (
										<p className={styles.error}>{errors.email.message}</p>
									)}
									{emailError && <p className={styles.error}>{emailError}</p>}
								</div>

								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor="password">
										Password
									</label>
									<div className={styles.passwordInput}>
										<input
											{...register("password", { required: "Required" })}
											className={styles.input}
											id="password"
											name="password"
											type={isPasswordVisible ? "text" : "password"}
											placeholder="Create a password"
										/>
										<button
											type="button"
											onClick={() => setIsPasswordVisible(!isPasswordVisible)}
											className={styles.togglePassword}
										>
											{isPasswordVisible ? "Hide" : "Show"}
										</button>
									</div>
								</div>

								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor="confirmPassword">
										Confirm Password
									</label>
									<input
										{...register("confirmPassword", {
											required: "Required",
											validate: (value) =>
												value === passwordValue || "Passwords do not match",
										})}
										className={styles.input}
										id="confirmPassword"
										name="confirmPassword"
										type={isPasswordVisible ? "text" : "password"}
										placeholder="Confirm your password"
									/>
									{errors.confirmPassword && (
										<p className={styles.error}>
											{errors.confirmPassword.message}
										</p>
									)}
									{passwordError && (
										<p className={styles.error}>{passwordError}</p>
									)}
								</div>

								<button
									type="button"
									onClick={handleStepOne}
									className={styles.submitButton}
									disabled={isLoading}
								>
									{isLoading ? (
										<div className={styles.loadingSpinner}></div>
									) : (
										"Continue"
									)}
								</button>
							</>
						) : (
							<>
								<div className={styles.formGroup}>
									<label className={styles.label} htmlFor="fullName">
										Full Name
									</label>
									<input
										{...register("name", { required: "Required" })}
										className={styles.input}
										id="fullName"
										name="fullName"
										type="text"
										autoComplete="organization"
										placeholder="Enter your full name"
									/>
									{errors.name && (
										<p className={styles.error}>{errors.name.message}</p>
									)}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="state" className={styles.label}>
										State
									</label>
									<select
										id="state"
										className={styles.select}
										{...register("state", { required: "Required" })}
									>
										<option value="">Select State</option>
										{renderAvailableStates()}
									</select>
									{errors.state && (
										<p className={styles.error}>{errors.state.message}</p>
									)}
								</div>

								<div className={styles.formGroup}>
									<label htmlFor="area" className={styles.label}>
										Area
									</label>
									<select
										id="area"
										className={styles.select}
										{...register("area", { required: "Required" })}
									>
										<option value="">Select Area</option>
										{renderAvailableAreas()}
									</select>
									{errors.area && (
										<p className={styles.error}>{errors.area.message}</p>
									)}
								</div>

								<button
									type="submit"
									className={styles.submitButton}
									disabled={isLoading}
								>
									{isLoading ? (
										<div className={styles.loadingSpinner}></div>
									) : (
										"Create Account"
									)}
								</button>
							</>
						)}

						<div className={styles.divider}>
							<span>Or continue with</span>
						</div>

						<button type="button" className={styles.googleButton}>
							Sign up with Google
						</button>

						<p className={styles.loginLink}>
							Already have an account? <Link href="/login">Sign in</Link>
						</p>
					</form>
				</div>
			</main>
		</div>
	);
}
