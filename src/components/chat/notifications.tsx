"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Suspense } from "react";
import Loading from "@/app/register/logo";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ChatImageBtn from "../btn/chatImgBtn";
import ChatBtn from "../btn/chatBtn";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import AcceptConnectSvg from "../btn/acceptConnectSvg";
import RejectConnectSvg from "../btn/rejectConnectSvg";

import {
	deleteDoc,
	collection,
	setDoc,
	doc,
	getDocs,
	query,
	where,
	CollectionReference,
	onSnapshot,
	orderBy,
	limit,
	startAt,
	startAfter,
	endAt,
	endBefore,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "@/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import ChatMessage from "./chatMessage";

interface NoticeProps {
	noticetId: string;
	senderId: string;
	senderArea: string;
	senderName: string;
	senderPic: string;
	senderState: string;
	seen: string;
	status: string;
	requesteeId: string;
	noticeType: string;
	noticeMsg: string;
	handleDeleteRequest: any;
	contact: any;
	onConfirm : any;
}

const Notifications: React.FC<NoticeProps> = ({
	noticetId,
	senderId,
	senderArea,
	senderName,
	senderPic,
	senderState,
	seen,
	status,
	requesteeId,
	handleDeleteRequest,
	onConfirm,
	contact,
	noticeType,
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
		</>
	);
};

Notifications.displayName = "Notifications";
export default Notifications;
