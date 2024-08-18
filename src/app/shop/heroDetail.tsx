import styles from "./styles.module.css";
import Image from "next/image";

import { useState, useEffect, useCallback } from "react";

const HeroDetail: React.FC<any> = ({
	user,
	imgM,
	img,
	shopNameM,
	shopName,
	addressM,
	address,
	shopMgM,
	shopMg,
	contactM,
	contact,
	actNumM,
	actNum,
	bnkNameM,
	bnkName,
	actNameM,
	actName,
	shopMarketM,
	shopMarket,
}) => {
	return (
		<div className={styles.heroDatailCover}>
			
				<div className={styles.flexControl}>
					<div className={styles.shopImgHolder}>
						<div className={styles.titleTopHeader} >SHOP DISPLAY PICTURE</div>
						<Image
							object-fit="cover"
							className={styles.shopPic}
							alt="Picture of the author"
							quality={100}
							width={100}
							height={100}
							src={`${img !== undefined ? img:imgM}` }
							priority={true}
							unoptimized
						/>
					</div>

					<div className={styles.detailBody}>
						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Shop Detail</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Name</div>
								<div className={styles.detail}>
									{shopName ? shopName : shopNameM}
								</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Market Complex</div>
								<div className={styles.detail}>
									{shopMarket ? shopMarket : shopMarketM}
								</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}> Shop Address</div>
								<div className={styles.detail}>{address ? address : addressM}</div>
							</div>
						</div>

						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Manager Info</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Shop Manager</div>
								<div className={styles.detail}>{shopMg ? shopMg : shopMgM}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Contact</div>
								<div className={styles.detail}>{contact ? contact : contactM}</div>
							</div>
						</div>

						<div className={styles.shopDetail}>
							<div className={styles.titleTop}>Payment Detail</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Account Number</div>
								<div className={styles.detail}>{actNum ? actNum : actNumM}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Bank Name</div>
								<div className={styles.detail}>{bnkName ? bnkName : bnkNameM}</div>
							</div>
							<div className={styles.detailCover}>
								<div className={styles.detailTitle}>Account Name</div>
								<div className={styles.detail}>{actName ? actName : actNameM}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

HeroDetail.displayName = "HeroDetail";
export default HeroDetail;
