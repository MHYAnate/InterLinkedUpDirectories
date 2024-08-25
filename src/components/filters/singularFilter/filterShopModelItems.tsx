"use client";
import styles from "./styles.module.css";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import Item from "./itemComponent";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import { useForm } from "react-hook-form";
import {
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
import { onAuthStateChanged} from "firebase/auth";

interface RaterValue {
	name:string;
	docid:string;
	src:string;
}

const { auth,  database} =
	firebase;

type ShopValues = {
	tag: string;
	status: string;
	condition: string;
	title: string;
};

type ShopName = {
	shopName: string;
};


const ShopModelStock: React.FC<ShopName> = ({ shopName }) => {
	const {
		register,
		handleSubmit,
		watch,
		formState: {
		},
	} = useForm<ShopValues>({
		defaultValues: {
			status: "",
			tag: "",
			condition: "",
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const status = watch("status");

	const tag = watch("tag");

	const condition = watch("condition");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(6);

	const [raterDetail, setRaterDetail] = useState<RaterValue| null>(null);

	onAuthStateChanged(auth, (user) => {
		if (user) {

			const raterDetailRef = collection(database, `profile`);

			const raterQuery = query(
				raterDetailRef,
				where("email", "==", `${user?.email}`)
			);
			
			const handleGetProfileDetail = async () => {
				try {
					const querySnapshot = await getDocs(raterQuery);

					if (querySnapshot.empty) {
						console.log("No profile details found");
						return;
					}

					const retrievedData = querySnapshot.docs[0].data() as RaterValue;
					setRaterDetail(retrievedData);
				} catch (error) {
					console.error("Error getting profile detail:", error);
				}
			};

			handleGetProfileDetail();
		} else {
			
		}
	});


	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShopSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	function renderAvailablStockTag() {
		if (!MarketTag) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketTag.map((tag) => (
			<option className={styles.renderCover} key={tag.id} value={tag.tag}>
				{tag.tag}
			</option>
		));
	}

	function renderAvailablStockCondition() {
		if (!MarketCondition) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketCondition.map((condition) => (
			<option
				className={styles.renderCover}
				key={condition.id}
				value={condition.condition}
			>
				{condition.condition}
			</option>
		));
	}

	function renderAvailablStockStatus() {
		if (!MarketStatus) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketStatus.map((status) => (
			<option
				className={styles.renderCover}
				key={status.id}
				value={status.status}
			>
				{status.status}
			</option>
		));
	}

	const items = ShopData.find((shop) => shop.shopName === `${shopName}`);

	if (!items) return null;

	const filteredStockTag =
		items.items.length > 0
			? items.items.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return tag !== (null || undefined || "" || "Select Tag")
						? text.includes(tag.toLowerCase())
						: text;
			  })
			: [];

	const filteredStockStatus =
		filteredStockTag.length > 0
			? filteredStockTag.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return status !== (null || undefined || "" || "Select Status")
						? text.includes(status.toLowerCase())
						: text;
			  })
			: [];

	const filteredStockCondition =
		filteredStockStatus.length > 0
			? filteredStockStatus.filter((eachItem) => {
					const text = eachItem.condition.toLowerCase();
					return condition !== (null || undefined || "" || "Select Condition")
						? text.includes(condition.toLowerCase())
						: text;
			  })
			: [];

	const filteredList =
		filteredStockCondition.length > 0
			? filteredStockCondition.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(shopSearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RenderAvailableModelStocks() {
		if (filteredList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No item found</div>
				</div>
			);
		}

		return currentPosts?.map((item) => (
			<div key={item.id}>
					<Item title={item.title} image={item.image} image2={item.image2} id={item.id} price={item.price} status={item.status} features={item.features} condition={item.condition} phone={``} address={``} docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} />
			</div>
		));
	}

	return (
		<div className={styles.shopItemBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select
							value={tag !== (undefined || null) ? tag : "Select Tag"}
							className={styles.select}
							{...register("tag")}
						>
							<option className={styles.option} value="Select Tag">
								Select Tag
							</option>
							{renderAvailablStockTag()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								status !== (undefined || null)
									? status
									: tag
									? ""
									: "Select Status"
							}
							className={styles.select}
							{...register("status")}
						>
							<option className={styles.option} value="Select Status">
								Select Status
							</option>
							{renderAvailablStockStatus()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								condition !== (undefined || null)
									? condition
									: tag
									? ""
									: "Select Condition"
							}
							className={styles.select}
							{...register("condition")}
						>
							<option className={styles.option} value="Select Condition">
								Select Condition
							</option>
							{renderAvailablStockCondition()}
						</select>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("title")}
							value={shopSearchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Name of Items"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModStock}>
					{RenderAvailableModelStocks()}
				</div>
			</div>

			<div className={styles.renderAvModpagi}>
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={filteredList.length}
					paginate={paginate}
					currentpage={currentPage}
				/>
			</div>
		</div>
	);
};

ShopModelStock.displayName = "ShopModelStock";
export default ShopModelStock;
