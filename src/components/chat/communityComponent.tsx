"use client";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

interface CommunityProps {
	country: string;
	state: string;
	area: string;
	category: string;
	service: string;
	setRoomName: any;
	setRoomState: any;
	setRoomLocation: any;
	setContactNameDisplay: any;
	setContactContactDisplay: any;
}

const CommunityComponent: React.FC<CommunityProps> = ({
	country,
	state,
	area,
	category,
	service,
	setRoomName,
	setRoomState,
	setRoomLocation,
	setContactNameDisplay,
	setContactContactDisplay,
}) => {
	return (
		<div className={styles.communityCover}>
			<div className={styles.communityHolder}>
				<div className={styles.communitySvg}></div>
				<div className={styles.communityName}></div>
			</div>
			<div className={styles.communityHolder}>
				<div className={styles.communitySvg}></div>
				<div className={styles.communityName}></div>
			</div>
			<div className={styles.communityHolder}>
				<div className={styles.communitySvg}></div>
				<div className={styles.communityName}></div>
			</div>
			{category !== ( "" || null || undefined ) && (
				<>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
					<div className={styles.communityHolder}>
						<div className={styles.communitySvg}></div>
						<div className={styles.communityName}></div>
					</div>
				</>
			)}
		</div>
	);
};

CommunityComponent.displayName = "CommunityComponent";
export default CommunityComponent;
