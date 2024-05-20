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
	deleteDoc,
	CollectionReference,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";

import styles from "./styles.module.css";
import { vendored } from "next/dist/server/future/route-modules/app-page/module.compiled";

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

const { auth, storage, database, Delete } = Firebase;


export default function FilterUserPostItems() {
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

	const [searchInput, setSearchInput] = useState("");

	const [priceInput, setPriceInput] = useState("");

	const [stockDetails, setStockDetails] = useState<FormValue[]>([]);

	const [image, setImage] = useState("");

	const [more, setMore] = useState("");

	const [isdelete, setIsDelete] = useState("");

	const watchUpDatePrice = watch("priceUpDate");

	const watchUpDateInventory = watch("priceUpDate");

	const user = auth.currentUser;

	const profileDetailRef = collection(database, `profile`);

	const stockDetailRef = collection(database, `market`);



		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user === null) {return ;}

				const {email, uid} = user;

				const vendorsQuery = query(
					stockDetailRef,
					where("email", "==", `${email}`)
				);

				const handleGetstockDetail = async () => {
					try {
						const querySnapshot = await getDocs(vendorsQuery);

						if (querySnapshot.empty) {
							console.log("No  stock in get stock details found");
							return;
						}

						const retrievedData: FormValue[] = [];
						querySnapshot.forEach((doc) => {
							const docData = doc.data() as FormValue;
							retrievedData.push(docData);
						});

						setStockDetails(retrievedData);
					} catch (error) {
						console.error("Error getting stock detail:", error);
					}
				};

			   handleGetstockDetail();
			});

		
			// Cleanup function to avoid memory leaks
			return () => unsubscribe();
		}, [stockDetailRef]);


			



	const handleDeleteStock = async (data: FormValue) => {
		try {
			await deleteDoc(doc(stockDetailRef, data.docid)).then(() => {
				setIsDelete("");
				
			});
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleUpDateStockPrice = async (data: FormValue) => {
		try {
			await setDoc(
				doc(stockDetailRef, data.docid),
				{
					price: data.priceUpDate,
				},
				{ merge: true }
			);

			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleUpDateStockNumber = async (data:FormValue) => {
		try {
			await setDoc(
				doc(stockDetailRef, data.docid),
				{
					inventory: data.inventoryUpDate,
				},
				{ merge: true }
			).then(() => {});
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const updatePriceInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPriceInput(event.target.value);
		// handleSuggestionClick;
	};

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const filteredFirebaseTitleList =
		stockDetails?.length > 0
			? stockDetails.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	function RenderUserStock() {
		if (stockDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return filteredFirebaseTitleList?.map((stock: any) => (
			
		
			<div className={styles.stockRenderCover} key={stock.docid}>
			
				<div className={styles.stockName}>{stock.title}</div>
				<div className={styles.stockSeperatorCover}>
					<div className={styles.stockImgCover}>
						<Image
							className={
								isdelete !== `${stock.docid}` ? styles.stockIdImg : styles.hide
							}
							src={ image === `${stock.docid}` ? `${stock.image}` : image === `${stock.title}` ? `${stock.image2}` :`${stock.image}`}
							alt={`${stock.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
						{isdelete === `${stock.docid}` && (
							<div className={styles.confirmDelete}>
								<div className={styles.confirmDeleteHeader}>Confirm Delete</div>
								<div className={styles.confirmDeleteBtnCover}>
									<div
										className={styles.confirmDeleteBtnNo}
										onClick={() => {
											setIsDelete("");
										}}
									>
										No
									</div>
									<div
										className={styles.confirmDeleteBtnYes}
										onClick={() => {
											handleDeleteStock(stock);
										  
										}}
									>
										Yes
									</div>
								</div>
							</div>
						)}
					</div>
					<div className={styles.imgControl}>
						<div
							onClick={() => setImage(`${stock.docid}`)}
							className={
								image === `${stock.docid}` ? styles.imgBtnHighlighted : styles.imgBtn
							}
						>
							ImgI
						</div>
						<div
							onClick={() => setImage(`${stock.title}`)}
							className={
								image === `${stock.title}` ?styles.imgBtnHighlighted  : styles.imgBtn
							}
						>
							ImgII
						</div>
					</div>
					<div
						onClick={() => {
							setIsDelete(stock.docid);
						}}
						className={styles.delete}
					>
						Delete Stock
					</div>
				</div>

				{more === `${stock.docid}` && (
					<div className={styles.showMore}>
						<form>
							<div className={styles.MainDetailCover}>
								<div className={styles.detailCover}>
									<div className={styles.detailTitle}>Number Of Stock</div>

									<div className={styles.detail}>{stock.inventory}</div>
								</div>
								<div className={styles.detailCover}>
									<div className={styles.detailTitle}>
										Enter Updated Stock Here
									</div>

									<input
										type="text"
										className={styles.detailInput}
										{...register("inventoryUpDate")}
										id="inventoryUpDate"
										placeholder={""}
									/>
								</div>

								<div
									className={styles.upDate}
									onClick={() =>
										handleUpDateStockNumber(stock)
									}
								>
									Update Stock
								</div>
							</div>
						</form>
						<form>
							<div className={styles.MainDetailCover}>
								<div className={styles.detailCover}>
									<div className={styles.detailTitle}>Current Price</div>

									<div className={styles.detail}>{stock.price}</div>
								</div>
								<div className={styles.detailCover}>
									<div className={styles.detailTitle}>
										Enter Updated Price Here
									</div>

									<input
										type="text"
										className={styles.detailInput}
										{...register("priceUpDate")}
										value={priceInput}
					          onChange={updatePriceInput}
										id="priceUpDate"
										placeholder={"priceUpDate"}
									/>
								</div>

								<button
									type="submit"
									className={styles.upDate}
									onClick={() => {
										handleUpDateStockPrice(stock);
									}}
								>
									Update Price
								</button>
							</div>
						</form>
						<div className={styles.contactCover}>
							<div className={styles.contactTitle}>Inventory</div>
							<div className={styles.contact}>{stock.inventory}</div>
						</div>
						<div className={styles.contactCover}>
							<div className={styles.contactTitle}>Condition</div>
							<div className={styles.contact}>{stock.condition}</div>
						</div>
					</div>
				)}
				<button
					className={styles.showDetails}
					onClick={() => {
						more === `${stock.docid}` ? setMore("") : setMore(stock.docid);
					}}
				>
					{more === `${stock.docid}` ? "Close" : "Details"}
				</button>
			</div>
		));
	}

	return (
		<div className={styles.filterStock}>
			<div className={styles.inputCover}>
				<input
					type="search"
					className={styles.inputStock}
					{...register("address")}
					value={searchInput}
					onChange={updateSearchInput}
					id="vendorAddress"
					placeholder="Name of Items"
				/>
			</div>
			<div className={styles.renderFilterStock}>{RenderUserStock()}</div>
		</div>
	);
}
