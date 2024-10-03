"use client";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";


interface Community {
  community:string;

}

const CommunityComponent: React.FC<Community> = ({


}) => {

	return (
		<div className={styles.communityCover}>

		</div>
	);
};

CommunityComponent.displayName = "CommunityComponent";
export default CommunityComponent;
