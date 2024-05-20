"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Suspense } from 'react'
import VendorNav from "@/components/nav/vendorNav/nav";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onAuthStateChanged, reload, updateProfile } from "firebase/auth";
import dynamic from 'next/dynamic'
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
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
	const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

	const router = useRouter();
	const user = auth.currentUser;
	



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
					getDownloadURL(imageRef).then((url)=>{
						setImageUrl(url);
						setTab("");
					})
					
					console.log("Uploaded a file!");
				})
				.catch((error) => {
					console.error(error); // Handle any errors
				});
		}
	};

	const profileDetailRef = collection(
		database,
		`profile`
	);

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
			const profileDetailRef = collection(
				database,
				`profile`,

			);
			await setDoc(doc(profileDetailRef, profileDetails?.docid), {
				src: imageUrl,
			},{merge: true});
			console.log("Profile detail added successfully");
		} catch (error) {
			console.error("Error adding profile detail:", error);
		}
	};
	useEffect(() => {
		handleProfileDetail();
	},[handleUpload]);
		
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
			

				getDownloadURL(imageRef).then(url =>{
					setImageUrl(url);
				})

				handleGetProfileDetail(); 
				
				// Update profile with image URL if user is signed in
				// updateProfile(user, { photoURL: imageUrl })
				// 	.then(() => {
				// 		console.log('Profile picture updated successfully');
				// 	})
				// 	.catch((error) => {
				// 		console.error('Error updating profile picture:', error);
				// 	});
			} else {
			// Redirect to login page if not signed in
				router.push('/');
			}
		});
	
		// Cleanup function to avoid memory leaks
		return () => unsubscribe();
	}, [reload]); // Re-run useEffect when imageUrl or auth changes



	

	return (
		<main className={styles.mainBodyCover}>
			<VendorNav/>
			<div className={styles.mainBody}>
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
							src={`${serviceImg}`}
							priority={true}
							unoptimized
						/>
					</div>
					<div className={styles.profilePictureBodyCover}>
						<div className={styles.profilePictureBodyFlexControl}>
							<div className={styles.profilePictureCover}>
								<div className={styles.profileName}>{user?.displayName}</div>
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
										<div className={styles.updateCover}>
											<span
												onClick={() =>
													tab === "update" ? setTab("") : setTab("update")
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
										<button onClick={handleUpload}>
											Upload
										</button>
										<button onClick={()=> setTab("")}>Back</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.profileBodyFlexControl}>
				<div className={styles.profileBodyCategoryCover}>
					
				
					<div className={styles.profileBodyCover}>
					<div className={styles.flexControl}>
					<div className={styles.categoryCover}>
						<div className={styles.categoryImgCover}>
            <Image
							object-fit="cover"
							className={styles.categoryImg}
							alt="Picture of the author"
							quality={100}
							width={100}
							height={100}
							src={`${categoryImg}`}
							priority={true}
							unoptimized
						/>
						</div>
						<div className={styles.categoryName}>
							<div className={styles.flexCategoryName}>
							<div className={styles.infoHeaderContainer}>
									<span className={styles.titleHeaderInfo}>
										{profileDetails?.selectCategory}{" "}{"Service"}
									</span>
								</div>
              <div className={styles.profileInfoContainer}>
								
								<div className={styles.infoContainer}>
									<span className={styles.title}>Specialty </span>
									<span className={styles.titleInfo}>
										{profileDetails?.selectService}{" "}{"Specialist"}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>Country </span>
									<span className={styles.titleInfo}>
										{profileDetails?.countrySelect}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>State </span>
									<span className={styles.titleInfo}>
										{profileDetails?.stateSelect}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>Area </span>
									<span className={styles.titleInfo}>
										{profileDetails?.areaSelect}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>Address </span>
									<span className={styles.titleInfo}>
										{profileDetails?.address}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>Contact </span>
									<span className={styles.titleInfo}>
										{profileDetails?.number}
									</span>
								</div>
								<div className={styles.infoContainer}>
									<span className={styles.title}>Email </span>
									<span className={styles.titleInfoE}>
									{profileDetails?.email}
									</span>
								</div>
							</div>
							</div>
						</div>
					</div>
				</div>
				
				</div>
				</div>
			</div>
			</div>
		</main>
	);
}
