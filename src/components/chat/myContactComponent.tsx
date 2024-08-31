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
	contactNumber:string;
	contactImg:string;
	contactName:string;
	lastMsg:string;
  handleDeleteContact:any;
  contact:any;
	setRoomName: any;
	roomName:string;
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
}) => {

	const [isdelete, setIsDelete] = useState(false);

	return (
		<div className={roomName === `${contactName}`? styles.highlightedContact:styles.contactCover}>
			<div onClick={()=> setRoomName(`${contactName}`)} className={styles.enterContainer}>
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
            <div className={styles.ContactName}>
							{contactNumber}
						</div>
						<div className={styles.lastMsg}>
							{lastMsg}
						</div>
						
					</div>
					</div>
					<div className={styles.deleteBodyCover}>
						<div onClick={()=>{
							setIsDelete(true);
						}} className={isdelete?styles.hide:styles.deleteContact}>
							<span>Delete Contact</span>
							<RemoveUserSvg/>
						</div>
						<div className={isdelete?styles.deleteCover:styles.hide}>

						</div>
						<div onClick={()=>{
							handleDeleteContact(contact);
							setIsDelete(false);
						}}  className={styles.confirmDelete}>Yes</div>
						<div onClick={()=>{
							setIsDelete(false);
						}}  className={styles.confirmDeleteNo}>No</div>
					</div>
					
		</div>
	);
};

MyContactComponent.displayName = "MyContactComponent";
export default MyContactComponent;
