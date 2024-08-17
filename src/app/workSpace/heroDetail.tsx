import styles from "./styles.module.css";
import Image from "next/image";

import { useState, useEffect, useCallback } from "react";

const HeroDetail: React.FC<any> = ({
	imgM,
	img,
	vendorNameM,
	vendorName,
	addressM,
	address,
	serviceCatM,
	serviceCat,
	contactM,
	contact,
	actNumM,
	actNum,
	bnkNameM,
	bnkName,
	actNameM,
	actName,
	serviceNameM,
	serviceName,
	specialityM,
	speciality,
}) => {
	return (
		<div className={styles.heroDatailCover}>
			<div className={styles.flexControl}>
				<div className={styles.imgCover}>
					<div className={styles.vendorName}>{`${
						vendorName ? vendorName : vendorNameM
					}`}</div>
					<Image
						className={styles.idiImg}
						src={`${img ? img : imgM}`}
						alt={`${vendorName ? vendorName : vendorNameM}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>

				<div className={styles.detailBody}>
					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>
							{`${vendorName ? vendorName : vendorNameM}`} {" Service Details"}
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Service Category</div>
							<div className={styles.detail}>
								{`${serviceCat ? serviceCat : serviceCatM}`}
							</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}> Service Name</div>
							<div className={styles.detail}>
								{`${serviceName ? serviceName : serviceNameM}`}
							</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}> Specialty</div>
							<div className={styles.detail}>{`${
								speciality ? speciality : specialityM
							}`}</div>
						</div>
					</div>

					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>Vendors Contact Info</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Mobile Number</div>
							<div className={styles.detail}>{`${
								contact ? contact : contactM
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Addres</div>
							<div className={styles.detail}>{`${
								address ? address : addressM
							}`}</div>
						</div>
					</div>

					<div className={styles.shopDetail}>
						<div className={styles.titleTop}>Payment Detail</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Account Number</div>
							<div className={styles.detail}>{`${
								actNum ? actNum : actNumM
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Bank Name</div>
							<div className={styles.detail}>{`${
								bnkName ? bnkName : bnkNameM
							}`}</div>
						</div>
						<div className={styles.detailCover}>
							<div className={styles.detailTitle}>Account Name</div>
							<div className={styles.detail}>{`${
								actName ? actName : actNameM
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
