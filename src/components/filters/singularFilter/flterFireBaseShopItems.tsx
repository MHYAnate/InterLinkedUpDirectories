"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';

import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;
	import RateUs from "@/components/btn/rateUs";
	import { onAuthStateChanged, updateProfile } from "firebase/auth";

type ShopValues = {
	itemId: string;
  image: string;
  image2: string;
  title: string;
  price: string;
  condition: string;
  status: string;
  features: string;
  tag:string;
};

interface RaterValue {
	name:string;
	docid:string;
	src:string;
}

type shopId = {
	shopId: string;
};

const ShopStock: React.FC<shopId> = ({ shopId }) => {
	const {
		register,
		handleSubmit,
		watch,
		reset,
		unregister,
		setFocus,
		setValue,
		control,
		formState: {
			isSubmitSuccessful,
			errors,
			isSubmitted,
			isSubmitting,
			isDirty,
			isValid,
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

  const [shopItemDetails, setShopItemDetails] = useState<ShopValues[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [show, setShow] = useState<string | null>(null);

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [img, setImg] = useState("");

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

  useEffect(() => {
    const fetchShopItems = async () => {
      setIsLoading(true);
      try {
        const shopItemDetailRef = collection(database, 'items');
        const shopItemQuery = query(shopItemDetailRef, where('shopId', '==', shopId));
        const querySnapshot = await getDocs(shopItemQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setShopItemDetails([]);
        } else {
          const retrievedData: ShopValues[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as ShopValues;
            retrievedData.push(docData);
          });
          setShopItemDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setShopItemDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShopItems();
  }, [shopId]);

	const items = shopItemDetails;

	if (!items) return null;

	const filteredStockTag =
		items.length > 0
			? items.filter((eachItem) => {
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
			<div className={styles.InRenderItemCover} key={item.itemId}>
				<div className={styles.InShopItemsCover}>
					<div className={styles.InShopItemsDetailTitleName}>{item.title}</div>
					<div className={styles.InShopsItemsImgCover}>
						<Image
							className={styles.InShopItemImg}
							src={
								img === `${item.image}`
									? `${item.image}`
									: img === `${item.image2}`
									? `${item.image2}`
									: `${item.image}`
							}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>

					<div className={styles.InShopItemsDetailCover}>
						<div className={styles.picSel}>
							<div
								className={img === `${item.image}` ? styles.picH : styles.pic}
								onClick={() => {
									setImg(`${item.image}`);
								}}
							>
								{`FRONT`}
							</div>
							<div
								className={img === `${item.image2}` ? styles.picH : styles.pic}
								onClick={() => {
									setImg(`${item.image2}`);
								}}
							>
								{`SIDE`}
							</div>
						</div>
						<div>
					<RateUs rateeId={`${item.itemId}`} raterId={`${raterDetail?.docid}`} raterName={`${raterDetail?.name}`} raterImg={`${raterDetail?.src}`} />
				</div>
						{show === `${item.itemId}` ? (
							<></>
						) : (
							<div className={styles.InShopItemsBody}>{item.price}</div>
						)}
					</div>
				</div>
				{show === `${item.itemId}` && (
							<div className={styles.InShowMoreDetails}>
							<div className={styles.InShowMoreDetailCover}>
							<div className={styles.statusInShop}>{item.status}</div>
								<div className={styles.InShopItemsDetailCover}>
								<div className={styles.contactCover}>
								<div className={styles.contactTitle}>price</div>
								<div className={styles.contact}>{item.price}</div>
							</div>
								</div>
								<div className={styles.contactCover}>
								<div className={styles.contactTitle}>Condition</div>
								<div className={styles.contact}>{item.condition}</div>
							</div>
							<div className={styles.contactCover}>
								<div className={styles.contactTitle}>feature</div>
								<div className={styles.contact}>{item.features}</div>
							</div>
							</div>
						</div>
				)}
				<div
					className={show !== `${item.itemId}` ? styles.InBtn : styles.InBtn}
					onClick={
						show !== `${item.itemId}`
							? () => setShow(`${item.itemId}`)
							: () => setShow("")
					}
				>
					{show === `${item.itemId}` ? "Show Less" : "More Details"}
				</div>
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
							<option className={styles.option} value="Select condition">
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

ShopStock.displayName = "ShopStock";
export default ShopStock;
