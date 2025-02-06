import styles from "./styles.module.css";
import Image from "next/image";
import { CompanyData } from "@/database/companyData";
import {
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
import RateUs from "@/components/btn/rateUs";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

interface RaterValue {
	name:string;
	docid:string;
	src:string;
}

const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

import { useState, useEffect, useCallback } from "react";

const HeroDetail: React.FC<any> = ({
	img,
	companyNameM,
	companyName,
	address,
	companyTag,
	contact,
	email,
	about,
	id,
}) => {
	const [raterDetail, setRaterDetail] = useState<RaterValue| null>(null);

	const Company = CompanyData.find(
		(company) => company.companyName === `${companyNameM}`
	);

	onAuthStateChanged(auth, (user) => {
		if (user) {

			const raterDetailRef = collection(database, `profile`);

			const raterQuery = query(
				raterDetailRef,
				where("email", "==", `${user?.email}`)
			);
			
			const handleGetProfileDetail = async () => {
				try {
					const querySnapshot = await getDocs(raterQuery);

					if (querySnapshot.empty) {
						console.log("No profile details found");
						return;
					}

					const retrievedData = querySnapshot.docs[0].data() as RaterValue;
					setRaterDetail(retrievedData);
				} catch (error) {
					console.error("Error getting profile detail:", error);
				}
			};

			handleGetProfileDetail();
		} else {
			
		}
	});
	return (
		<div className={styles.heroDatailCover}>
			<div className={styles.flexControl}>
				<div className={styles.imgCover}>
					<div className={styles.vendorName}>{`${
						companyName ? companyName : companyNameM
					}`}</div>
					<Image
						className={styles.idiImg}
						src={`${img !== undefined ? img : Company?.companyPic}`}
						alt={`${companyName ? companyName : Company?.companyName}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
					<div>
					<RateUs rateeId={`${id?id:Company?.id}`} raterId={`${raterDetail?.docid}`} raterName={`${raterDetail?.name}`} raterImg={`${raterDetail?.src}`} />
				</div>
				</div>

				<div className={styles.detailBody}>
					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>
							{`${companyName !== undefined ? companyName : Company?.companyName}`} {" Service Details"}
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Company Tag</div>
							<div className={styles.detail}>
								{`${companyTag !== undefined ? companyTag : Company?.companyTag}`}
							</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>{"About Us"}</div>
							<div className={styles.detail}>
								{`${about ? about : Company?.about}`}
							</div>
						</div>
					</div>

					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>Contact Info</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Office Line</div>
							<div className={styles.detail}>{`${
								contact ? contact : Company?.phone
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Email Address</div>
							<div className={styles.detail}>{`${
								email ? email : Company?.email
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Address</div>
							<div className={styles.detail}>{`${
								address ? address : Company?.address
							}`}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

HeroDetail.displayName = "HeroDetail";
export default HeroDetail;
