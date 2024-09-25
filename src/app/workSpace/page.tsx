"use client";
import React, { useState, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "../register/logo";
import Nav from "@/components/nav/mainNav/nav";
import VendorNav from "@/components/nav/userNav/nav";
import HeroDetail from "./heroDetail";
import Hero from "@/components/hero/hero";
import NewsLetter from "@/components/newsLetter/newsLetter";
import VendorStaffModel from "@/components/filters/singularFilter/filterVendorsStaff";
import VendorOfferModel from "@/components/filters/singularFilter/filterVendorOffer";

import VendorVacancyModel from "@/components/filters/singularFilter/filterVendorVacancy";

import FireBaseOffers from "@/components/filters/singularFilter/filterFireBaseOffers";

import FireBaseStaff from "@/components/filters/singularFilter/filterFireBaseStaff";

import FireBaseVacancy from "@/components/filters/singularFilter/filterFireBaseVacancy";

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
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import styles from "./styles.module.css";

type SpaceValues = {
	name: string;
	address: string;
	number: string;
	account: string;
	accountName: string;
	bankName: string;
	src: string;
	selectCategory: string;
	selectService: string;
	speciality:string;
	docid:string;
};

const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	Firebase;

export default function WorkSpace() {
	const [user, loading, error] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<SpaceValues | null>(null);

	const [imageUrl, setImageUrl] = useState("");

	const [selector, setSelector] = useState("vacancy");

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

	const vendorName = searchParams.get("name");

	const src = searchParams.get("src");

	const vendorService = searchParams.get("service");

	const address = searchParams.get("adrs");

	const actNum = searchParams.get("actNum");

	const bnk = searchParams.get("bnk");

	const actName = searchParams.get("actName");

	const spec = searchParams.get("spec");

	const cat = searchParams.get("cat");

	const phone = searchParams.get("phone");

	const vendorId = searchParams.get("docid");

	const companyId = searchParams.get("companyId");

	const profileDetailRef = collection(database, `profile`);

	const userQuery = query(
		profileDetailRef,
		where("docid", "==", `${vendorId}`)
	);

			const handleGetProfileDetail = async () => {
				try {
					const querySnapshot = await getDocs(userQuery);

					if (querySnapshot.empty) {
						console.log("No profile details found");
						return;
					}

					const retrievedData = querySnapshot.docs[0].data() as SpaceValues;
					setProfileDetails(retrievedData);
				} catch (error) {
					console.error("Error getting profile detail:", error);
				}
			};

			handleGetProfileDetail();
		

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<div className={styles.nav}>{user ? <VendorNav /> : <Nav />}</div>
				<div className={styles.shopContainer}>
					<div className={styles.shopDetailCover}>
					<HeroDetail imgM={src} img={profileDetails?.src} vendorNameM={vendorName} vendorName={profileDetails?.name} addressM={address} address={profileDetails?.address} serviceCatM={cat} serviceCat={profileDetails?.selectCategory} contactM={phone} contact={profileDetails?.number} actNumM={actNum} actNum={profileDetails?.account} bnkNameM={bnk} 	bnkName={profileDetails?.bankName} actNameM={actName} actName={profileDetails?.accountName} serviceNameM={vendorService} serviceName={profileDetails?.selectService} specialityM={spec} speciality={profileDetails?.speciality} idM={vendorName} id={vendorId} />
					</div>
					<div className={styles.shopStockCover}>
						<div className={styles.coverSelectBtn}>
							<div
								onClick={
									selector !== "vacancy"
										? () => setSelector("vacancy")
										: () => setSelector("")
								}
								className={
									selector !== "vacancy"
										? styles.selectBtn
										: styles.selectBtnHighlighted
								}
							>
								VACANCY
							</div>
							<div
								onClick={
									selector !== "offer"
										? () => setSelector("offer")
										: () => setSelector("")
								}
								className={
									selector !== "offer"
										? styles.selectBtn
										: styles.selectBtnHighlighted
								}
							>
								OFFERS
							</div>
							<div
								onClick={
									selector !== "staff"
										? () => setSelector("staff")
										: () => setSelector("")
								}
								className={
									selector !== "staff"
										? styles.selectBtn
										: styles.selectBtnHighlighted
								}
							>
								STAFFS
							</div>
						</div>

						{selector === "vacancy" && (companyId !== null || vendorId !== null) ? (
							<FireBaseVacancy
								companyId={`${companyId}`}
								vendorId={`${vendorId}`}
							/>
						) : selector === "vacancy" ? (
							<VendorVacancyModel
								Vendor={`${vendorService}`}
								vendorName={`${vendorName}`}
							/>
						) : (
							<></>
						)}

						{selector === "staff" && (companyId !==  null || vendorId !== null) ? (
							<FireBaseStaff
								companyId={`${companyId}`}
								vendorId={`${vendorId}`}
							/>
						) : selector === "staff" ? (
							<VendorStaffModel
								Vendor={`${vendorService}`}
								vendorName={`${vendorName}`}
							/>
						) : (
							<></>
						)}

						{selector === "offer" &&  (companyId !== null || vendorId !== null )? (
							<FireBaseOffers
								companyId={`${companyId}`}
								vendorId={`${vendorId}`}
							/>
						) : selector === "offer" ? (
							<VendorOfferModel
								Vendor={`${vendorService}`}
								vendorName={`${vendorName}`}
							/>
						) : (
							<></>
						)}
					</div>
				</div>
				<div>
					<NewsLetter />
				</div>
			</div>
		</Suspense>
	);
}
