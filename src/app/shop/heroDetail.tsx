import styles from "./styles.module.css";
import Image from "next/image";
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
import RateUs from "@/components/btn/rateUs";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ShopData } from "@/database/shopData";

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
	shopNameM,
	shopName,
	address,
	shopMg,
	contact,
	actNum,
	bnkName,
	actName,
	shopMarket,
	id,
}) => {

	const Shop = ShopData.find(
		(shop) => shop.shopName === `${shopNameM}`
	);


	const [raterDetail, setRaterDetail] = useState<RaterValue| null>(null);

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
					<div className={styles.coverRate}>
					<div className={styles.shopImgHolder}>
						<div className={styles.titleTopHeader} >SHOP DISPLAY PICTURE</div>
						<Image
							object-fit="cover"
							className={styles.shopPic}
							alt="Picture of the author"
							quality={100}
							width={100}
							height={100}
							src={`${img !== undefined ? img:Shop?.shopPic}` }
							priority={true}
							unoptimized
						/>
					</div>
					<div>
					<RateUs rateeId={`${id?id:Shop?.id}`} raterId={`${raterDetail?.docid}`} raterName={`${raterDetail?.name}`} raterImg={`${raterDetail?.src}`} />
				</div>
					</div>

					<div className={styles.detailBody}>
						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Shop Detail</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Name</div>
								<div className={styles.detail}>
									{shopName ? shopName : Shop?.shopName}
								</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Market Complex</div>
								<div className={styles.detail}>
									{shopMarket ? shopMarket : Shop?.market}
								</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}> Shop Address</div>
								<div className={styles.detail}>{address ? address : Shop?.address}</div>
							</div>
						</div>

						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Manager Info</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Manager</div>
								<div className={styles.detail}>{shopMg ? shopMg : Shop?.name}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Contact</div>
								<div className={styles.detail}>{contact ? contact : Shop?.phone}</div>
							</div>
						</div>

						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Payment Detail</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Account Number</div>
								<div className={styles.detail}>{actNum ? actNum : Shop?.account}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Bank Name</div>
								<div className={styles.detail}>{bnkName ? bnkName : Shop?.bankName}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Account Name</div>
								<div className={styles.detail}>{actName ? actName : Shop?.accountName}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

HeroDetail.displayName = "HeroDetail";
export default HeroDetail;
