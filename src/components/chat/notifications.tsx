"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import AcceptConnectSvg from "../btn/acceptConnectSvg";
import RejectConnectSvg from "../btn/rejectConnectSvg"; 
import styles from "./styles.module.css";


interface NoticeProps {
	senderArea: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	noticeType: string;
	noticeMsg: string;
	handleDeleteRequest: any;
	contact: any;
	onConfirm : any;
}

const Notifications: React.FC<NoticeProps> = ({
	senderArea,
	senderName,
	senderPic,
	senderState,
	handleDeleteRequest,
	onConfirm,
	contact,
	noticeType,
	noticeMsg,
}) => {
	const [isDelete, setIsDelete] = useState(false);

	const [isAccept, setIsAccept] = useState(false);

	return (
		<>
			{noticeType === `request` && (
				<div className={styles.highlightedContact}>
					<div className={styles.enterContainer}>
						<div className={styles.ContactImgCover}>
							<Image
								className={styles.contactImg}
								src={`${senderPic}`}
								alt={`${senderName}`}
								quality={100}
								width={500}
								height={500}
								// unoptimized
							/>
						</div>
						<div className={styles.contactDetail}>
							<div className={styles.ContactName}>{senderName}</div>
							<div className={styles.ContactName}>{senderState}</div>
							<div className={styles.lastMsg}>{senderArea}</div>
						</div>
					</div>
					<div className={styles.acceptBodyCover}>
					<div
							onClick={() => {
								setIsAccept(true);
							}}
							className={isAccept ? styles.hide : styles.deleteContact}
						>
							<span> Accept Connection</span>
							<AcceptConnectSvg />
						</div>
						<div className={isAccept ? styles.deleteCover : styles.hide}></div>
						<div
							onClick={() => {
								onConfirm(contact);
							}}
							className={styles.confirmDelete}
						>
							Yes
						</div>
						<div
							onClick={() => {
								setIsAccept(false);
							}}
							className={styles.confirmDeleteNo}
						>
							No
						</div>
					</div>
					<div className={styles.deleteBodyCover}>
						<div
							onClick={() => {
								setIsDelete(true);
							}}
							className={isDelete ? styles.hide : styles.deleteContact}
						>
							<span>Reject Connection</span>
							<RejectConnectSvg />
						</div>
						<div className={isDelete ? styles.deleteCover : styles.hide}></div>
						<div
							onClick={() => {
								handleDeleteRequest(contact);
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
			)}
			{noticeType === "admin" && (
			<div className={styles.adminNotice}>
				<div className={styles.noticeTopic}>{noticeType}</div>
				<div className={styles.adimNotice}>{	noticeMsg}</div>
			</div>)}
		</>
	);
};

Notifications.displayName = "Notifications";
export default Notifications;
