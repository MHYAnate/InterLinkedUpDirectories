"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
import Image from "next/image";
import { collection, addDoc } from "firebase/firestore";
import styles from "./styles.module.css";

interface UserData {
	email: string;
}

type FormValue = {
	email: string;
};

export default function Hero() {
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

	const { database } = firebase;

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
								<div className={styles.header}>
									<div className={styles.titleHero}>
									{":Link"}<span className={styles.age}>AGE</span> 
									</div>
									<div className={styles.titleHero2}>
									 <span className={styles.toWhat}>{"ToWhat"}</span> <span className={styles.matters}>{"!important;"}</span>
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
