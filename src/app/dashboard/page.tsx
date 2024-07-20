"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import VendorNav from "@/components/nav/userNav/nav";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import NewsLetter from "@/components/newsLetter/newsLetter";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import {
	collection,
	setDoc,
	doc, 
	getDocs,
	query,
	where, 
	CollectionReference,
	onSnapshot,
} from "firebase/firestore";
import JobsFilter from "@/components/filters/userFilters/filterjobs";
import FilterItems from "@/components/filters/userFilters/filterItems";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import GifIntro from "@/components/vidIntro/gifIntro";
import { Services } from "@/database/data";
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

const { auth, storage, database } = Firebase;

export default function Profile() {
	const [profileDetails, setProfileDetails] = useState<FormValue | null>(null);

	const [imageUrl, setImageUrl] = useState("");

	const [tab, setTab] = useState("");

	const [user, loading, error] = useAuthState(auth);

	const [isMarket, setIsMarket] = useState("item");

	const [isVacancy, setIsVacancy] = useState("job");

	const searchParams = useSearchParams();
	
	const router = useRouter();

	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			getDownloadURL(imageRef).then((url) => {
				setImageUrl(url);
			});

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
		} else {
			// Redirect to login page if not signed in
			router.push("/");
		}
	});

	const imageRef = ref(storage, `image/${user?.email}`);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
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

	const profileDetailRef = collection(database, `profile`);

	const userQuery = query(
		profileDetailRef,
		where("email", "==", `${user?.email}`)
	);

	const categoryName = profileDetails?.selectCategory;
	const serviceName = profileDetails?.selectService;

	const Category = Services.find(
		(category) => category.category === `${categoryName}`
	);

	const Service = Category?.services.find(
		(service) => service.name === `${serviceName}`
	);

	const categoryImg = Category?.src;
	const serviceImg = Service?.src;

	const handleProfileDetail = async () => {
		try {
			const profileDetailRef = collection(database, `profile`);
			await setDoc(
				doc(profileDetailRef, profileDetails?.docid),
				{
					src: imageUrl,
				},
				{ merge: true }
			);
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};
	useEffect(() => {
		handleProfileDetail();
	}, [handleProfileDetail]);

	return (
		<Suspense fallback={<Loading />}>
			<main className={styles.mainBodyCover}>
				<VendorNav />
				{loading && <Loading />}

				{user && (
					<>
						{" "}
						<div className={styles.pageBodyCover}>
							<div className={styles.bodyCover}>
								<div className={styles.profilePictureFlexControl}>
									<div className={styles.profilePictureServiceCover}>
										<div className={styles.serviceImgCover}>
											<Image
												object-fit="cover"
												className={styles.serviceImg}
												alt="Picture of the author"
												quality={100}
												width={100}
												height={100}
												src={profileDetails?.selectCategory? `${serviceImg}`:"/service/profile.jpg"}
												priority={true}
												unoptimized
											/>
										</div>
										<div className={styles.profilePictureBodyCover}>
											<div className={styles.profilePictureBodyFlexControl}>
												<div className={styles.profilePictureCover}>
													<div className={styles.profileName}>
														{user?.displayName}
													</div>
													{tab !== "update" && (
														<>
															<div className={styles.profileImgCover}>
																<Image
																	object-fit="cover"
																	className={styles.profileImg}
																	alt="Picture of the author"
																	quality={100}
																	width={100}
																	height={100}
																	src={`${imageUrl}`}
																	priority={true}
																	unoptimized
																/>
															</div>
															{profileDetails?.selectCategory && <div className={styles.categoryCover}>
																<div className={styles.formImgCover}>
																	<Image
																		object-fit="cover"
																		className={styles.detailImg}
																		alt="Picture of the author"
																		quality={100}
																		width={100}
																		height={100}
																		src={profileDetails?.selectCategory?`${categoryImg}`:"/service/suser.jpg"}
																		priority={true}
																		unoptimized
																	/>
																</div>
																<div className={styles.firstcategory}>
																	<div className={styles.flexFirstcategory}>
																		<div className={styles.infoHeaderContainer}>
																			<span className={styles.titleHeaderInfo}>
																				{profileDetails?.selectCategory}{" "}
																				{"Service Provider"}
																			</span>
																		</div>
																		<div className={styles.infoHeaderContainer}>
																			<span className={styles.titleHeaderInfo}>
																				{profileDetails?.selectService}{" "}
																				{"Specialist"}
																			</span>
																		</div>
																	</div>
																</div>
															</div>}
															
															<div className={styles.updateCover}>
																<span
																	onClick={() =>
																		tab === "update"
																			? setTab("")
																			: setTab("update")
																	}
																	className={styles.clickToUpdate}
																>
																	Update Profile picture
																</span>
															</div>
														</>
													)}

													{tab === "update" && (
														<div className={styles.formContainer}>
															<div className={styles.inputImageCover}>
																<input
																	type="file"
																	accept="image/*"
																	className={styles.input}
																	ref={fileInputRef}
																	placeholder="Upload Display Picture"
																/>
															</div>
															<button onClick={handleUpload}>Upload</button>
															<button onClick={() => setTab("")}>Back</button>
														</div>
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.form}>
									<div className={styles.profileBodyCategoryCover}>
										<div className={styles.profileBodyCover}>
											<div className={styles.flexControl}>
												<GifIntro />
												<div
													className={styles.flexVendorCategoryControl}
													onClick={() =>
														router.push(
															`/dashboard/vendors` +
																"?" +
																set("name", `${Services[0]?.category}`) +
																"&" +
																set("src", `${Services[0]?.src}`)
														)
													}
												>
													<div className={styles.vendorCategory}>
														<div className={styles.vendorCategoryImgCover}>
															<Image
																object-fit="cover"
																className={styles.vendorsCategoryImg}
																alt="Picture of the author"
																quality={100}
																width={100}
																height={100}
																src={Services[0]?.src}
																priority={true}
																unoptimized
															/>
														</div>
														<div className={styles.vendorsCategoryName}>
															<div className={styles.flexVendorInfoCover}>
																<div className={styles.flexVendorCategoryName}>
																	{Services[0]?.category}
																	<span className={styles.span}>
																		{" "}
																		Service{" "}
																		<span className={styles.bright}>
																			Category
																		</span>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div
													className={styles.flexVendorCategoryControl}
													onClick={() =>
														router.push(
															`/dashboard/vendors` +
																"?" +
																set("name", `${Services[1]?.category}`) +
																"&" +
																set("src", `${Services[1]?.src}`)
														)
													}
												>
													<div className={styles.vendorCategory}>
														<div className={styles.vendorCategoryImgCover}>
															<Image
																object-fit="cover"
																className={styles.vendorsCategoryImg}
																alt="Picture of the author"
																quality={100}
																width={100}
																height={100}
																src={Services[1]?.src}
																priority={true}
																unoptimized
															/>
														</div>
														<div className={styles.vendorsCategoryName}>
															<div className={styles.flexVendorInfoCover}>
																<div className={styles.flexVendorCategoryName}>
																	{Services[1]?.category}
																	<span className={styles.span}>
																		{" "}
																		Service{" "}
																		<span className={styles.bright}>
																			Category
																		</span>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div
													className={styles.flexVendorCategoryControl}
													onClick={() =>
														router.push(
															`/dashboard/vendors` +
																"?" +
																set("name", `${Services[2]?.category}`) +
																"&" +
																set("src", `${Services[2]?.src}`)
														)
													}
												>
													<div className={styles.vendorCategory}>
														<div className={styles.vendorCategoryImgCover}>
															<Image
																object-fit="cover"
																className={styles.vendorsCategoryImgP}
																alt="Picture of the author"
																quality={100}
																width={100}
																height={100}
																src={Services[2]?.src}
																priority={true}
																unoptimized
															/>
														</div>
														<div className={styles.vendorsCategoryName}>
															<div className={styles.flexVendorInfoCover}>
																<div className={styles.flexVendorCategoryName}>
																	{Services[2]?.category}
																	<span className={styles.span}>
																		{" "}
																		Service{" "}
																		<span className={styles.bright}>
																			Category
																		</span>
																	</span>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div
													className={styles.flexVendorCategoryControl}
													onClick={() => router.push(`/dashboard/market`)}
												>
													<div className={styles.vendorCategory}>
														<div className={styles.vendorCategoryImgCover}>
															<Image
																object-fit="cover"
																className={styles.vendorsCategoryImgP}
																alt="Picture of the author"
																quality={100}
																width={100}
																height={100}
																src="/service/commerce.jpg"
																priority={true}
																unoptimized
															/>
														</div>
														<div className={styles.vendorsCategoryName}>
															<div className={styles.flexVendorInfoCover}>
																<div className={styles.flexVendorCategoryName}>
																	Market Space
																</div>
															</div>
														</div>
													</div>
												</div>
												<div
													className={styles.flexVendorCategoryControl}
													onClick={() => router.push(`/dashboard/vacancies`)}
												>
													<div className={styles.vendorCategory}>
														<div className={styles.vendorCategoryImgCover}>
															<Image
																object-fit="cover"
																className={styles.vendorsCategoryImgP}
																alt="Picture of the author"
																quality={100}
																width={100}
																height={100}
																src="/service/vacancy.jpg"
																priority={true}
																unoptimized
															/>
														</div>
														<div className={styles.vendorsCategoryName}>
															<div className={styles.flexVendorInfoCover}>
																<div className={styles.flexVendorCategoryName}>
																	Vacancies
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={styles.midBody}>
									<div className={styles.mySpaceCover}>
										<div className={styles.mySpace}>
											<div onClick={()=>{isMarket === "item" ? setIsMarket("" ):setIsMarket("item");}} className={isMarket === "item"? styles.isClickLeft : styles.left}>{`Item's`}</div>
											<div onClick={()=>{isMarket === "shop" ? setIsMarket("" ):setIsMarket("shop");}} className={isMarket === "shop" ?styles.isClickRight : styles.right}>{`Shop's`} </div>
										</div>
										<div className={styles.mySpaceRender}>
											{isMarket === "item" && (<FilterItems/>)}
											{}
										</div>
									</div>
								</div>
								<div className={styles.body}>
									<div className={styles.myVacancySpaceCover}>
										<div className={styles.myVacancySpace}>
											<div onClick={()=>{isVacancy === "job" ? setIsVacancy("" ):setIsVacancy("job");}} className={isVacancy === "job"? styles.isClickLeft : styles.left}>{`Job's`}</div>
											<div  onClick={()=>{isVacancy === "company" ? setIsVacancy("" ):setIsVacancy("company");}} className={isVacancy === "company" ?styles.isClickRight : styles.right}>{`Companies`}</div>
										</div>
										<div className={styles.mySpaceVacancyRender}>
										  {isVacancy === "job" && (<JobsFilter/>)}
											{}
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</main>
		</Suspense>
	);
}
