import styles from "./styles.module.css";
import Image from "next/image";

import { useState, useEffect, useCallback } from "react";

const HeroDetail: React.FC<any> = ({
	imgM,
	img,
	companyNameM,
	companyName,
	addressM,
	address,
	companyTagM,
	companyTag,
	contactM,
	contact,
	emailM,
	email,
	aboutM,
	about,
}) => {
	return (
		<div className={styles.heroDatailCover}>
			<div className={styles.flexControl}>
				<div className={styles.imgCover}>
					<div className={styles.vendorName}>{`${
						companyName ? companyName : companyNameM
					}`}</div>
					<Image
						className={styles.idiImg}
						src={`${img !== undefined ? img : imgM}`}
						alt={`${companyName ? companyName : companyNameM}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>

				<div className={styles.detailBody}>
					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>
							{`${companyName !== undefined ? companyName : companyNameM}`} {" Service Details"}
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Company Tag</div>
							<div className={styles.detail}>
								{`${companyTag !== undefined ? companyTag : companyTagM}`}
							</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>{"About Us"}</div>
							<div className={styles.detail}>
								{`${about ? about : aboutM}`}
							</div>
						</div>
					</div>

					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>Contact Info</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Office Line</div>
							<div className={styles.detail}>{`${
								contact ? contact : contactM
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Email Address</div>
							<div className={styles.detail}>{`${
								email ? email : emailM
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Address</div>
							<div className={styles.detail}>{`${
								address ? address : addressM
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
