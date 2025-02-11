"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import VendorNav from "@/components/nav/userNav/nav";
import { MarketTag } from "@/database/marketTag";
import { MarketStatus } from "@/database/marketStatus";
import { MarketCondition } from "@/database/marketCondition";
import FilterItems from "@/components/filters/userFilters/filterItems";
import FilterUserPostItems from "@/components/filters/filterUserPostItems/filterUserItems";
import { Suspense } from 'react'
import Loading from "@/app/register/logo";
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
	inventoryUpDate: string;
	priceUpDate: string;
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
			inventoryUpDate: "",
			priceUpDate: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [profileDetails, setProfileDetails] = useState<FormValue | null>(null);

	const [id, setId] = useState("");

	const [imageUrl, setImageUrl] = useState("");

	const [imageUrl2, setImageUrl2] = useState("");

	const [tab, setTab] = useState("");





	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user === null) {
				return;
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

			handleGetProfileDetail();
		});

		// Cleanup function to avoid memory leaks
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		auth.currentUser?.reload();
	}, []);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const fileInputRef2 = useRef<HTMLInputElement>(null);


	const handleStockDetails = async (data: FormValue) => {
		try {
			const stockDetailRef = collection(database, "market");

			const docRef = await addDoc(stockDetailRef, {
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
				type: "items",
			});
			const docId = docRef.id;
			setId(docId);

			const setStockDetailRef = collection(database, "market");

			await setDoc(
				doc(setStockDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			const fileInput = fileInputRef.current;

			const imageRef = ref(storage, `${docId}1`);

			if (fileInput && fileInput.files && fileInput.files.length > 0) {
				const file = fileInput.files[0];

				await uploadBytes(imageRef, file);

				const imageDoc = await getDownloadURL(imageRef);

				setImageUrl(imageDoc);

				await setDoc(
					doc(stockDetailRef, docId),
					{
						image: imageDoc,
					},
					{ merge: true }
				);
			}

			const fileInput1 = fileInputRef2.current;

			const imageRef2 = ref(storage, `${docId}2`);

			if (fileInput1 && fileInput1.files && fileInput1.files.length > 0) {
				const file = fileInput1.files[0]; 

				await uploadBytes(imageRef2, file);

				const imageDoc = await getDownloadURL(imageRef2);
				setImageUrl2(imageDoc);
				await setDoc(
					doc(stockDetailRef, docId),
					{
						image2: imageDoc,
					},
					{ merge: true }
				);
			}
			reset();
			console.log("stock detail added successfully");
		} catch (error) {
			console.error("Error adding stock detail:", error);
		}
	};


	const onSubmit = (data: FormValue) => {
		handleStockDetails(data);
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
		<Suspense fallback={<Loading/>}>
		<div className={styles.Main}>
			<VendorNav />
			<div className={styles.pageBodyCover}>
				<div className={styles.bodyCover}>
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
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.innerFormCover}>
							<div className={styles.post}>Post Items on Market Space</div>
							<div className={styles.selectCover}>
								<div className={styles.title}>Select Tag</div>
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
								<div className={styles.title}>Enter the Name</div>
								<input
									type="text"
									className={styles.input}
									{...register("title", {
										required: "Required",
									})}
									id="title"
									placeholder={""}
								/>
							</div>
							<div className={styles.selectCover}>
								<div className={styles.title}>select Status</div>
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
								<div className={styles.title}>Enter Price</div>
								<input
									type="text"
									className={styles.input}
									{...register("price", {
										required: "Required",
									})}
									id="price"
									placeholder={""}
								/>
							</div>
							<div className={styles.inputCover}>
								<div className={styles.title}>The features</div>
								<textarea
									className={styles.textarea}
									{...register("features", {
										required: "Required",
									})}
									id="features"
									placeholder={""}
									rows={3}
								/>
							</div>
							<div className={styles.selectCover}>
								<div className={styles.title}>Select Condition</div>
								<select
									className={styles.select}
									{...register("condition", {
										required: "Required",
									})}
									id="condition"
								>
									<option className={styles.option} value="select">
										Select Stock Condition
									</option>
									{RenderMarketCondition()}
								</select>
							</div>
							<div className={styles.inputCover}>
								<div className={styles.title}>Enter number of stocks</div>
								<input
									type="text"
									className={styles.input}
									{...register("inventory", {
										required: "Required",
									})}
									id="inventory"
									placeholder={""}
								/>
							</div>
							<div className={styles.inputImageCover}>
								<div className={styles.title}>Upload Front Picture</div>
								<input
									type="file"
									accept="image/*"
									className={styles.input}
									ref={fileInputRef}
									placeholder="Upload Stock Front Picture"
								/>
							</div>
							<div className={styles.inputImageCover}>
								<div className={styles.title}>Upload Side Picture</div>
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
					<div className={styles.midBody}>
						<div className={styles.openShop}>Open a Shop</div>
						<div className={styles.mySpaceCover}>
							<div className={styles.mySpace}>
								List of Items in Market Space
							</div>
							<div className={styles.mySpaceRender}>
								<FilterUserPostItems />
							</div>
						</div>
					</div>
					<div className={styles.body}>
						<FilterItems />
					</div>
				</div>
			</div>
		</div>
		</Suspense>
	);
}
