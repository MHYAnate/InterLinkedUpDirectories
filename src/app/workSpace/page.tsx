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
import firebase from "@/firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
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
	market: string;
};

const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

export default function WorkSpace() {
	const [user, loading, error] = useAuthState(auth);

	const [profileDetails, setProfileDetails] = useState<ShopValues | null>(null);

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

	const vendorService = searchParams.get("service");

	const vendorId = searchParams.get("vendorId");

	const companyId = searchParams.get("companyId");

	const profileDetailRef = collection(database, `shop`);

	const userQuery = query(
		profileDetailRef,
		where("email", "==", `${user?.email}`)
	);

	return (
		<Suspense fallback={<Loading />}>
			<div>
				<div className={styles.nav}>{user ? <VendorNav /> : <Nav />}</div>
				<div>
					<Hero />
				</div>
				<div className={styles.shopContainer}>
					<div className={styles.shopDetailCover}>
						
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
