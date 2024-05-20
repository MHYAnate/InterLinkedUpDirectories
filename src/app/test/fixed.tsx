"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
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
	CollectionReference,
	onSnapshot,
	deleteDoc,
	updateDoc,
	deleteField,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import VendorNav from "@/components/nav/vendorNav/nav";
import { MarketTag } from "@/database/marketTag";
import { MarketStatus } from "@/database/marketStatus";
import { MarketCondition } from "@/database/marketCondition";
import FilterItems from "@/components/filters/userFilters/filterItems";
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

	const [searchInput, setSearchInput] = useState("");

	const [stockDetails, setStockDetails] = useState<FormValue[]>([]);

	const [docStateId, setDocId] = useState("");

	const [imageUrl, setImageUrl] = useState("");

	const [imageUrl2, setImageUrl2] = useState("");

	const [image, setImage] = useState("");

	const [tab, setTab] = useState("");
	const [userA, setUser] = useState<any>(auth);

	const [more, setMore] = useState("");

	const [isOpen, setIsOpen] = useState("");

	const [isdelete, setIsDelete] = useState("");

	const router = useRouter();
	const user = auth.currentUser;

	const watchUpDatePrice = watch("priceUpDate");
	const watchUpDateInventory = watch("priceUpDate");

	const UserEmail =
		(document.querySelector("#email") as HTMLInputElement)?.value || "";

	const imageRef = ref(storage, `stock/${user?.email}`);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageUpload1 = () => {
		const fileInput = fileInputRef.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef, file)
				.then((snapshot) => {
					getDownloadURL(imageRef).then((url) => {
						setImageUrl(url);
						setTab("");
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

	const imageRef2 = ref(storage, `stock2/${user?.email}`);

	const fileInputRef2 = useRef<HTMLInputElement>(null);

	const handleImageUpload2 = () => {
		const fileInput = fileInputRef2.current;
		if (fileInput && fileInput.files && fileInput.files.length > 0) {
			const file = fileInput.files[0]; // Get the first selected file

			// Reference to the root of the default Firebase Storage bucket

			// Upload the file
			uploadBytes(imageRef2, file)
				.then((snapshot) => {
					getDownloadURL(imageRef2).then((url) => {
						setImageUrl2(url);
						setTab("");
					});

					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

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

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				handleGetProfileDetail();
				handleGetstockDetail();
				RenderStock()
			} else {
				// Redirect to login page if not signed in
			}
		});

		// Cleanup function to avoid memory leaks
		return () => unsubscribe();
	}, []);
	const stockDetailRef = collection(database, "market");

	const handleProfileDetail = async (data: FormValue) => {
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
				type:"items",
			});
			const docId = docRef.id;
			setDocId(docId);

			const setStockDetailRef = collection(database, "market");

			await setDoc(
				doc(setStockDetailRef, docId),
				{
					docid: docId,
				},
				{ merge: true }
			);

			console.log("stock detail added successfully");
		} catch (error) {
			console.error("Error adding stock detail:", error);
		}
	};

	const handleProfileImageDetail1 = async () => {
		try {
			await setDoc(
				doc(stockDetailRef, docStateId),
				{
					image: imageUrl,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleProfileImageDetail2 = async () => {
		try {
			await setDoc(
				doc(stockDetailRef, docStateId),
				{
					image2: imageUrl2,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleDeleteStock = async (data: FormValue) => {
		try {
			await deleteDoc(doc(stockDetailRef, data.docid)).then(() => {
				handleGetstockDetail();
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
			).then(() => {
				handleGetstockDetail();
			});
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	const handleUpDateStockNumber = async (data: FormValue) => {
		try {
			await setDoc(
				doc(stockDetailRef, data.docid),
				{
					inventory: data.inventoryUpDate,
				},
				{ merge: true }
			).then(() => {
				handleGetstockDetail();
			});
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};

	useEffect(() => {
		handleProfileImageDetail1();
		handleProfileImageDetail2();
	}, [handleImageUpload1, handleImageUpload2]);

	const onSubmit = (data: FormValue) => {
		handleProfileDetail(data);
		handleImageUpload1();
		handleImageUpload2();
		handleProfileImageDetail1();
		handleProfileImageDetail2();
		handleGetstockDetail();
		reset();
	};

	const onUpDateStock = (data: FormValue) => {
		handleUpDateStockNumber(data);
		reset();
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

	const vendorsQuery = query(
		stockDetailRef,
		where("email", "==", `${profileDetails?.email}`)
	);

	const handleGetstockDetail = async () => {
		try {
			const querySnapshot = await getDocs(vendorsQuery);

			if (querySnapshot.empty) {
				console.log("No stock details found");
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

	useEffect(() => {
		handleGetstockDetail();
		handleGetProfileDetail();
	}),
		[handleDeleteStock];

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const filteredFirebaseCountryList =
		stockDetails?.length > 0
			? stockDetails.filter((eachItem) => {
					const text = eachItem.countrySelect.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	function RenderStock() {
		function Render() {
			if (!stockDetails) {
				// Return a message or component indicating that the "Maintenance" category is not found
				return null;
			}
			return filteredFirebaseCountryList.map((stock) => (
				<div className={styles.stockRenderCover} key={stock.docid}>
					<div className={styles.stockName}>{stock.title}</div>
					<div className={styles.stockSeperatorCover}>
						<div className={styles.stockImgCover}>
							<Image
								className={
									isdelete !== `${stock.docid}`
										? styles.stockIdImg
										: styles.hide
								}
								src={image === "imgI" ? `${stock.image}` : `${stock.image2}`}
								alt={`${stock.title}`}
								quality={100}
								width={500}
								height={500}
								// unoptimized
							/>
							{isdelete === `${stock.docid}` && (
								<div className={styles.confirmDelete}>
									<div className={styles.confirmDeleteHeader}>
										Confirm Delete
									</div>
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
								onClick={() => setImage("imgI")}
								className={
									image === "imgI" ? styles.imgBtnHighlighted : styles.imgBtn
								}
							>
								ImgI
							</div>
							<div
								onClick={() => setImage("imgII")}
								className={
									image === "imgII" ? styles.imgBtnHighlighted : styles.imgBtn
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
										{...register("inventoryUpDate", {
											required: "Required",
										})}
										id="inventoryUpDate"
										placeholder={""}
									/>
								</div>

								<div
									className={styles.upDate}
									onClick={() => handleUpDateStockNumber(stock)}
								>
									Update Stock
								</div>
							</div>
							</form>
							<form onSubmit={handleSubmit(onUpDateStock)}>
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
										{...register("priceUpDate", {
											required: "Required",
										})}
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
				<div className={styles.renderFilterStock}>{Render()}</div>
			</div>
		);
	}

	window.addEventListener("load", RenderStock);

	return (
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
								<div className={styles.title}>Select Tag</div>
								<input
									type="file"
									accept="image/*"
									className={styles.input}
									ref={fileInputRef}
									placeholder="Upload Stock Front Picture"
								/>
							</div>
							<div className={styles.inputImageCover}>
								<div className={styles.title}>Select Tag</div>
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
							<div className={styles.mySpaceRender}>{RenderStock()}</div>
						</div>
					</div>
					<div className={styles.body}>
						<FilterItems />
					</div>
				</div>
			</div>
		</div>
	);
}
