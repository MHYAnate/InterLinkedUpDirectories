"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import Image from "next/image";
import {
	collection,
	addDoc,
} from "firebase/firestore";
import styles from "./styles.module.css";



type FormValue = {
	email: string;
};

export default function NewsLetter() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitSuccessful },
	} = useForm<FormValue>({
		defaultValues: {
			email: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const { database } =
		firebase;

	if (isSubmitSuccessful) {
		reset();
	}

	const HandleNewsLetter = async (data: FormValue) => {
		try {
			const profileDetailRef = collection(
				database,
				`newsletter/${data.email}/email`
			);
			await addDoc(profileDetailRef, {
				email: data.email,
			});
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const onSubmit = (data: FormValue) => {
		HandleNewsLetter(data);
	};

	return (
		<div className={styles.formContainer}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
								src="/service/background1.jpg"
								priority={true}
								unoptimized
							/>
						</div>
						<div className={styles.title}>
							<div className={styles.flextitle}>
								<div className={styles.cardBody}>
								<p className={styles.boldP}>
										Join us on our mission to simplify Business discovery and empower individuals by providing a user-friendly platform to find and showcase the perfect Business Connections
									</p>
									<p className={styles.boldP}>
										We are continuously working to expand our featured categories
										and enhance our platform to cater to our users evolving needs.
									</p>				
								</div>
								<div className={styles.innerCover}>
								<div className={styles.boldPSub}>
										For Any Suggestions, Observations and Complaint Post.
									</div>
									<div className={styles.innerFormCover}>
									<div className={styles.inputCover}>
										<textarea
											className={styles.textarea}
											{...register("email", {
												required: "Required",
											})}
											id="email"
											placeholder={"Feed Backs"}
										/>
									</div>
									<button className={styles.post} type="submit">
                  Post
									</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
