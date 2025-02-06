"use client";
import React,{ useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import Image from "next/image";
import Nav from "@/components/nav/mainNav/nav";
import Loader from "@/components/load/load";
import VisibilityBtn from "@/components/btn/visibilityBtn";
import {
	signInWithEmailAndPassword,
	sendEmailVerification,
	sendPasswordResetEmail,
	GoogleAuthProvider,
	signInWithRedirect,
	signInWithPopup,
	getRedirectResult,
} from "firebase/auth";

import { Services } from "@/database/data";
import { Suspense } from "react";
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

	const [isVendorTab, setIsVendorTab] = useState("vendor");

	const [loader, setLoader] = useState(false);

	const router = useRouter();

	const provider = new GoogleAuthProvider();

	const isMobileDevice = () => {
		const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
	
		// Regular expressions for common mobile OS and browser user agents
		const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Opera Mini|Fennec|Mobile|Windows Phone|Kindle|Silk|CriOS|Googlebot-Mobile|Opera Mobi/i;
	
		return mobilePattern.test(userAgent);
	};

	const SignInWithGoogle = () => {
		
		const handleSignIn = async () => {
			try {
				if (isMobileDevice()) {
					// For mobile devices, use redirect
					await signInWithRedirect(auth, provider);
					 const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
        // Handle errors appropriately
      }
    };

    if (isMobileDevice()) {
      checkRedirectResult();
    }
				} else {
					// For desktops, use popup
					await signInWithPopup(auth, provider);
					router.push("/dashboard");
				}
			} catch (error) {
				console.error("Error signing in with Google:", error);
				// Handle errors appropriately (e.g., display an error message)
			}
		};
		handleSignIn();
	};


	useEffect(() => {
    // Check for redirect result on component mount for mobile devices
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
        // Handle errors appropriately
      }
    };

    if (isMobileDevice()) {
      checkRedirectResult();
    }
  }, []);
  

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

				router.push("dashboard");

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
		<Suspense fallback={<Loading />}>
			<>
				{loader ? (
					<Loader />
				) : (
					<div className={styles.Main}>
						<nav className={styles.navHolder}>
							<Nav />
						</nav>
						<div className={styles.formContainer}>
							<form
								className={styles.innerFormBody}
								onSubmit={handleSubmit(onSubmit)}
							>
								{tab !== "Reset" && (
									<>
										<div className={styles.emailContain}>
											<input
												type="text"
												className={styles.email}
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
											<VisibilityBtn state={passwordVisible} setState={setPasswordVisible} />
										</div>

										<div className={styles.logInCover}>
											<button className={styles.logInButton} type="submit">
												Log In
											</button>

											<div
												className={styles.logInWithGoogle}
												onClick={() => {
													SignInWithGoogle();
												}}
											>
												<div className={styles.gImgHolder}>
													<Image
														object-fit="cover"
														className={styles.gImg}
														alt="Picture of the author"
														quality={100}
														width={100}
														height={100}
														src="/service/google.jpg"
														priority={true}
														unoptimized
													/>
												</div>
												<div className={styles.googleLogIn}> logIn with Google</div>
											</div>
											
										</div>

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
									</>
								)}

								{tab === "Reset" && (
									<div className={styles.resetForm}>
										<div className={styles.emailContain}>
											<input
												type="text"
												className={styles.email}
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
							</form>
						</div>
					</div>
				)}
			</>
		</Suspense>
	);
}
