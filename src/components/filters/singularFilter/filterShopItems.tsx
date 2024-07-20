import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketShopTag } from "@/database/marketShopTag";
import { MarketComplex } from "@/database/marketComplexTag";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";

import {
	collection,
	collectionGroup,
	doc,
	setDoc,
	addDoc,
	getDocs,
	query,
	where,
	or,
	and,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;
import styles from "./styles.module.css";

type ShopValues = {
	tag: string;
	status: string;
	condition: string;
	title: string;
	profileDetails: {
		email: string;
		shopName: string;
		address: string;
		name: string;
		contact: string;
		account: string;
		accountName: string;
		bankName: string;
		shopSrc: string;
		src: string;
		shopId: string;
	};
  shopInfo:{
		email: string;
		shopName: string;
		address: string;
		name: string;
		contact: string;
		account: string;
		accountName: string;
		bankName: string;
		shopSrc: string;
		src: string;
		shopId: string;
	};
};


const ShopStock: React.FC<ShopValues> = ({ profileDetails, shopInfo }) => {

  return(
    <div></div>
  )
}

ShopStock.displayName = "ShopStock";
export default ShopStock;

