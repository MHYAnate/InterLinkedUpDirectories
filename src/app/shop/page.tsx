"use client";
import React, {  useState} from "react";
import { onAuthStateChanged} from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "../register/logo";
import Nav from "@/components/nav/mainNav/nav";
import VendorNav from "@/components/nav/userNav/nav";
import HeroDetail from "./heroDetail";
import NewsLetter from "@/components/newsLetter/newsLetter";

import {
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";

import ShopModelStock from "@/components/filters/singularFilter/filterShopModelItems";
import ShopStock from "@/components/filters/singularFilter/flterFireBaseShopItems";

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

const { auth, storage, database} =
	firebase;

export default function Shop() {
	const [user] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<ShopValues | null>(null);

	const [imageUrl, setImageUrl] = useState("");

	const searchParams = useSearchParams();

	const shopName = searchParams.get("shopName");

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
				<div className={styles.nav}>{user ? <VendorNav /> : <Nav setQNav={setImageUrl} qNav="" />}</div>
				<div className={styles.shopContainer}>
					<div className={styles.shopDetailCover}>
						<HeroDetail user={user}  img={profileDetails?.shopSrc} shopNameM={shopName} shopName={profileDetails?.shopName} address={profileDetails?.address}  shopMg={profileDetails?.name}
						contact={profileDetails?.contact} 
						actNum={profileDetails?.account} bnkName={profileDetails?.bankName}  actName={profileDetails?.accountName} shopMarket={profileDetails?.market} id={`${shopId}`} />
					</div>
					<div className={styles.shopStockCover}>
						{user ? <ShopStock shopId={`${shopId}`} />: <ShopModelStock shopName={`${shopName}`} />}
					</div>
				</div>
				<div>
					<NewsLetter/>
				</div>
			</div>
		</Suspense>
	);
}
