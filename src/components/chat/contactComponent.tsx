"use client";
import React from "react";
import Image from "next/image";
import AddUserSvg from "../btn/addUserSvg";
import styles from "./styles.module.css";
import Firebase from "@/firebase/firebase";
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

		const { auth, storage, database } = Firebase;
	return (
		<div className={styles.contact}>

			<div className={auth.currentUser?.uid !== contact.docid?styles.ContactImgCover:styles.hide}>
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
							<AddUserSvg/>
						</div>
					</div>
		</div>
	);
};

ContactComponent.displayName = "ContactComponent";
export default ContactComponent;
