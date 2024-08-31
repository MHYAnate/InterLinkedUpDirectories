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
import BreketeSvg from "../btn/publicSvg";
import RoomSvg from "../btn/roomSvg";
import StateSvg from "../btn/stateSvg";
import AreaSvg from "../btn/areaSvg";
import RemoveUserSvg from "../btn/removeUserSvg";
import AddUserSvg from "../btn/addUserSvg";
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

interface ContactProps {
	contactImg:string;
	contactName:string;
  handleRequestContact:any;
  contact:any;
}

const ContactComponent: React.FC<ContactProps> = ({
  contactImg,
  contactName,
  handleRequestContact,
  contact,
}) => {

	return (
		<div className={styles.contact}>
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
						<div className={styles.ContactName}>
							{contactName}
						</div>
						<div onClick={()=>{
							handleRequestContact(contact);
						}} className={styles.RequestContact}>
							<span>Contact Request</span>
							<AddUserSvg/>
						</div>
					</div>
		</div>
	);
};

ContactComponent.displayName = "ContactComponent";
export default ContactComponent;
