"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Firebase from "@/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const { auth } = Firebase;

export default function LogInComponent() {
	const { register, handleSubmit } = useForm<ProfileValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const user = auth.currentUser;

	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push("/dashboard");
		}
	}, [user, router]);

	interface ProfileValues {
		email: string;
		password: string;
	}

	const SignIn = async (data: ProfileValues) => {
		setIsLoading(true);
		signInWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed up
				console.log(userCredential.user);

				router.push("/dashboard");
			})
			.catch((error) => {
				setIsLoading(false);
				// ..
				console.log(error);
			});
	};

	const onSubmit = (data: ProfileValues) => {
		SignIn(data);
	};

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div className={styles.formContainer}>
			<div className={styles.formHeader}>
				<h1 className={styles.formH1}>Log Into your account</h1>
				<p className={styles.formP}>
					Continue your business networking with an amplified reach
				</p>
			</div>

			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formGroup}>
					<label className={styles.label} htmlFor="email">
						Email
					</label>
					<input
						{...register("email", {
							required: "Required",
						})}
						className={styles.input}
						id="email"
						type="email"
						autoComplete="email"
						required
						placeholder="Enter your email"
					/>
				</div>

				<div className={styles.formGroup}>
					<label className={styles.label} htmlFor="password">
						Password
					</label>
					<div className={styles.passwordInput}>
						<input
							{...register("password", {
								required: "Required",
							})}
							className={styles.input}
							type={isPasswordVisible ? "text" : "password"}
							onKeyUp={() => onkeyup}
							placeholder={"Enter your password"}
							id="password"
							autoComplete="new-password"
							required
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

				<button
					type="submit"
					className={styles.submitButton}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className={styles.loadingSpinner}></div>
					) : (
						"Continue"
					)}
				</button>

				<div className={styles.divider}>
					<span>Or continue with</span>
				</div>

				<button type="button" className={styles.googleButton}>
					{/* <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Google logo"
                width={20}
                height={20}
              /> */}
					Sign In with Google
				</button>

				<p className={styles.loginLink}>
					Dont have an account? <Link href="/login">Sign Up</Link>
				</p>
			</form>
		</div>
	);
}
