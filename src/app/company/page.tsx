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

import CompanyStaffModel from "@/components/filters/singularFilter/filterCompanyStaffs";

import CompanyOfferModel from "@/components/filters/singularFilter/filterCompanyOffers";

import CompanyVacancyModel from "@/components/filters/singularFilter/filterCompanyVacancies";
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

type CompanyValues = {
	companyName: string;
	address: string;
	contact: string;
	account: string;
	accountName: string;
	companyTag: string;
	img: string;
	email:string;
	about:string;
};

const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	Firebase;

export default function WorkSpace() {
	const [user, loading, error] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<CompanyValues | null>(null);

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

	const companyName = searchParams.get("companyName");

	const companyPic = searchParams.get("companyPic");

	const companyTag = searchParams.get("companyTag");

	const about = searchParams.get("about");

	const email = searchParams.get("email");

	const address = searchParams.get("companyAddress");

	const contact = searchParams.get("contact");

	const vendorId = searchParams.get("vendorId");

	const companyId = searchParams.get("companyId");

	const profileDetailRef = collection(database, `workSpace`);

	const userQuery = query(
		profileDetailRef,
		where("companyId", "==", `${companyId}`)
	);

			const handleGetProfileDetail = async () => {
				try {
					const querySnapshot = await getDocs(userQuery);

					if (querySnapshot.empty) {
						console.log("No profile details found");
						return;
					}

					const retrievedData = querySnapshot.docs[0].data() as CompanyValues;
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
				<div>
					<Hero />
				</div>
				<div className={styles.shopContainer}>
					<div className={styles.shopDetailCover}>
					<HeroDetail imgM={companyPic} img={profileDetails?.img} companyNameM={companyName} companyName={profileDetails?.companyName} addressM={address} address={profileDetails?.address} companyTagM={companyTag} companyTag={profileDetails?.companyTag} contactM={contact} contact={profileDetails?.contact} emailM={email} email={profileDetails?.email} aboutM={about} 	about={profileDetails?.about}   />
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
							RANKS
							</div>
						</div>

						{selector === "vacancy" && (companyId !== null || vendorId !== null) ? (
							<FireBaseVacancy
								companyId={`${companyId}`}
								vendorId={`${vendorId}`}
							/>
						) : selector === "vacancy" ? (
							<CompanyVacancyModel
							companyName={`${companyName}`}
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
							<CompanyStaffModel
							companyName={`${companyName}`}
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
							<CompanyOfferModel
								companyName={`${companyName}`}
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
