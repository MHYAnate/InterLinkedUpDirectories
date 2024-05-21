"use client";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import Image from "next/image";
import Nav from "@/components/nav/mainNav/nav";
import Loader from "@/components/load/load";
import {
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
} from "firebase/auth";

import { Services } from "@/database/data";
import { Suspense } from 'react'
import Loading from "../register/logo";
import styles from "./styles.module.css";

type FormValue = {
	email: string;
	passCode0: string;
};

Services;

export default function Register() {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { isSubmitSuccessful, isDirty },
	} = useForm<FormValue>({
		defaultValues: {
			email: "",
			passCode0: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const { auth } = firebase;

	const [passwordVisible, setPasswordVisible] = useState(false);

	const [tab, setTab] = useState("");

	const [isVendorTab, setIsVendorTab] = useState("");

	const [loader, setLoader] = useState(false);

	const router = useRouter();

	const handleTogglePassword = () => {
		setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
	};

	async function Reset(userData: FormValue) {
		let result: any = null;
		let error: any = null;

		try {
			result = await sendPasswordResetEmail(auth, userData.email);
			const user = result.user;
		} catch (e: any) {
			error = e;
		}

		return { result, error };
	}

	if (isSubmitSuccessful) {
		reset();
	}

	const Register = (data: FormValue) => {
		signInWithEmailAndPassword(auth, data.email, data.passCode0)
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;

				if (isVendorTab === "vendor") {
					router.push("vendorprofile/dashboard");
				}
				if (isVendorTab === "user") {
					router.push("userprofile/dashboard");
				}

				setLoader(true);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setLoader(false);
				// ..
			});
	};

	const onSubmit = (data: FormValue) => {
		Register(data);
	};

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
							{" "}
							<div className={styles.categoryCover}>
								<div className={styles.categoryImgCover}>
									<Image
										object-fit="cover"
										className={styles.categoryImg}
										alt="Picture of the author"
										quality={100}
										width={100}
										height={100}
										src="/service/login.jpg"
										priority={true}
										unoptimized
									/>
								</div>
								<div className={styles.title}>
									<div className={styles.flextitle}>
						
									</div>
								</div>
							</div>
						</div>
						<div className={styles.formCover}>
							<div className={styles.topSelect}>
								<div
										onClick={() => setIsVendorTab("user")}
									className={isVendorTab === "user" ? styles.topSelectBtnLeftSelected:styles.topSelectBtnLeft}
								>
									<span className={styles.tsSpan}>Log In as User</span>
								</div>
								<div
									onClick={() => setIsVendorTab("vendor")}
									className={isVendorTab === "vendor" ? styles.topSelectBtnRightSelected:styles.topSelectBtnRight}
								>
									<span className={styles.tsSpan}>Log In as Vendor</span>
								</div>
							</div>
							{(isVendorTab === "vendor" || isVendorTab === "user") && (
								<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
									<div className={styles.innerFormCover}>
										{tab !== "Reset" && (
											<div className={styles.innerFormBody}>
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
													/>
													<button
														type="button"
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
													</button>
												</div>

												<button className={styles.logInButton} type="submit">
													Log In
												</button>
												<div className={styles.forgotPassword}>
													Forgot Password{" "}
													<div className={styles.resetCover}>
														<span
															onClick={() =>
																tab === "Reset" ? setTab("") : setTab("Reset")
															}
															className={styles.clickToReset}
														>
															Click Here
														</span>
													</div>
												</div>
											</div>
										)}

										{tab === "Reset" && (
											<div className={styles.resetForm}>
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
												<button
													className={styles.logInButton}
													typeof="button"
													onClick={() => {
														Reset;
														setTab("");
													}}
												>
													Reset
												</button>
												<div className={styles.forgotPassword}>
													Back To Log In Form
													<div className={styles.logInClickCover}>
														<span
															onClick={() => setTab("")}
															className={styles.clickToLogIn}
														>
															Click here
														</span>
													</div>
												</div>
											</div>
										)}
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
