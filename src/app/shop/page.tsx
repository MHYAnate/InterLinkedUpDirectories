"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "../register/logo";
import Image from "next/image";
import Nav from "@/components/nav/mainNav/nav";
import VendorNav from "@/components/nav/userNav/nav";
import { ShopData } from "@/database/shopData";
import HeroDetail from "./heroDetail";

import {
	collection,
	collectionGroup,
	doc,
	setDoc,
	addDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import ShopModelStock from "@/components/filters/singularFilter/filterShopModelItems";

import styles from "./styles.module.css";

type ShopValues = {
	email: string;
	shopName: string;
	address: string;
	name: string;
	contact: string;
	account: string;
	accountName: string;
	bankName: string;
	shopSrc: string;
	src: string;
	shopId: string;
	market:string;
};

const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

export default function Shop() {
	const [user, loading, error] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<ShopValues | null>(null);

	const [imageUrl, setImageUrl] = useState("");

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

	const shopImg = searchParams.get("shopImg");

	const shopName = searchParams.get("shopName");

	const shopAddress = searchParams.get("shopAddress");

	const shopManager = searchParams.get("shopManager");

	const shopacct = searchParams.get("act");

	const shopBnk = searchParams.get("bnkName");

	const shopacctName = searchParams.get("actName");

	const shopPhone = searchParams.get("contact");

	const shopComplex = searchParams.get("complex");


	const shopId = searchParams.get("shopId");

	const profileDetailRef = collection(database, `shop`);


	

	const userQuery = query(
		profileDetailRef,
		where("email", "==", `${user?.email}`)
	);

	const imageRef = ref(storage, `shopImage/${user?.email}`);

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

					const retrievedData = querySnapshot.docs[0].data() as ShopValues;
					setProfileDetails(retrievedData);
				} catch (error) {
					console.error("Error getting profile detail:", error);
				}
			};

			handleGetProfileDetail();
		} else {
			// Redirect to login page if not signed in
		}
	});

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<div className={styles.nav}>{user ? <VendorNav /> : <Nav />}</div>
				<div className={styles.shopContainer}>
					<div className={styles.shopDetailCover}>
						<HeroDetail user={user} imgM={shopImg} img={profileDetails?.shopSrc} shopNameM={shopName} shopName={profileDetails?.shopName} addressM={shopAddress} address={profileDetails?.address} shopMgM={shopManager} shopMg={profileDetails?.name}
						contactM={shopPhone} contact={profileDetails?.contact} actNumM={shopacct}
						actNum={profileDetails?.account} bnkNameM={shopBnk} bnkName={profileDetails?.bankName} actNameM={shopacctName} actName={profileDetails?.accountName} shopMarketM={ shopComplex} shopMarket={profileDetails?.market} />
					</div>
					<div className={styles.shopStockCover}>
					<ShopModelStock shopName={`${shopName}`} />
					</div>
					
				</div>
			</div>
		</Suspense>
	);
}
