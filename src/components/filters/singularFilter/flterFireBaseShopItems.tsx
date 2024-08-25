"use client";
import styles from "./styles.module.css";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect} from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';

import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
const { auth,database} =
	firebase;
	import { onAuthStateChanged} from "firebase/auth";
	import Item from "./itemComponent";

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

  const [shopItemDetails, setShopItemDetails] = useState<ShopValues[]>([]);

  const [isLoading, setIsLoading] = useState(true);


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
			<div key={item.itemId}>
					<Item title={item.title} image={item.image} image2={item.image2} id={item.itemId} price={item.price} status={item.status} features={item.features} condition={item.condition} phone={``} address={``} docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} />
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
