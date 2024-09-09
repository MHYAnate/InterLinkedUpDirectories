"use client";
import React, { useState } from "react";

import Image from "next/image";
import RemoveUserSvg from "../btn/removeUserSvg";
import styles from "./styles.module.css";

interface ContactProps {
	contactNumber: string;
	contactImg: string;
	contactName: string;
	lastMsg: string;
	handleDeleteContact: any;
	contact: any;
	setRoomName: any;
	roomName: string;
	setContactNameDisplay:any;
	setContactContactDisplay:any;
}

const MyContactComponent: React.FC<ContactProps> = ({
	contactNumber,
	contactImg,
	contactName,
	lastMsg,
	handleDeleteContact,
	contact,
	setRoomName,
	roomName,
	setContactNameDisplay,
	setContactContactDisplay,
}) => {
	const [isdelete, setIsDelete] = useState(false);

	const [isName, setIsName] = useState(false);

	return (
		<div
			className={
				isName
					? styles.highlightedContact
					: styles.contactCover
			}
		>
			<div
				onClick={() => {setRoomName(`Private`), setIsName(true), setContactNameDisplay(contactName), setContactContactDisplay(contactNumber)}}
				className={styles.enterContainer}
			>
				<div className={styles.ContactImgCover}>
					<Image
						className={styles.contactImg}
						src={`${contactImg}`}
						alt={`${contactName}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.contactDetail}>
					<div className={styles.ContactName}>{contactName}</div>
					<div className={styles.ContactName}>{contactNumber}</div>
					<div className={styles.lastMsg}>{lastMsg}</div>
				</div>
			</div>
			<div className={styles.deleteBodyCover}>
				<div
					onClick={() => {
						setIsDelete(true);
					}}
					className={isdelete ? styles.hide : styles.deleteContact}
				>
					<span>Delete Contact</span>
					<RemoveUserSvg />
				</div>
				<div className={isdelete ? styles.deleteCover : styles.hide}>
					<div
						onClick={() => {
							handleDeleteContact(contact);
							setIsDelete(false);
						}}
						className={styles.confirmDelete}
					>
						Yes
					</div>
					<div
						onClick={() => {
							setIsDelete(false);
						}}
						className={styles.confirmDeleteNo}
					>
						No
					</div>
				</div>
			</div>
		</div>
	);
};

MyContactComponent.displayName = "MyContactComponent";
export default MyContactComponent;
