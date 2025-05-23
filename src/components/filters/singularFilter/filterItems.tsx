import * as React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { StateData } from "@/database/stateData";
import { MarketData } from "@/database/marketData";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import Item from "./itemComponent";

import {
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
const { auth, database} =
	firebase;
import Pagination from "@/components/btn/paginationBtn";

import { onAuthStateChanged} from "firebase/auth";
import styles from "./styles.module.css";

type FormValue = {
	selectCategory: string;
	selectService: string;
	name: string;
	address: string;
	number: string;
	countrySelect: string;
	stateSelect: string;
	areaSelect: string;
	src: string;
	tag: string;
	shopTag: string;
	status: string;
	title: string;
	docid: string;
	condition: string;
	shopId: string;
};

interface RaterValue {
	name: string;
	docid: string;
	src: string;
}

export default function ItemsFilter() {
	const {
		register,
		handleSubmit,
		watch,
		formState: {
			
		},
	} = useForm<FormValue>({
		defaultValues: {
			address: "",
			countrySelect: "",
			stateSelect: "",
			areaSelect: "",
			tag: "",
			shopTag: "",
			status: "",
			condition: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [searchInput, setSearchInput] = useState("");

	const [searchAddress, setSearchAddress] = useState("");

	const [raterDetail, setRaterDetail] = useState<RaterValue | null>(null);

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const tag = watch("tag");

	const status = watch("status");

	const condition = watch("condition");

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

	const stateValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="stateSelect"]') as HTMLInputElement)
					?.value || ""
			: "";

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateValue}`
	);

	function renderAvailableStates() {
		if (!StateData) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return StateData.map((state) => (
			<option
				className={styles.renderCover}
				key={state.name}
				value={state.name}
			>
				{state.name}
			</option>
		));
	}

	function renderAvailableAreas() {
		if (!AreaList) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return AreaList.areaList.map((area) => (
			<option className={styles.renderCover} key={area.id} value={area.name}>
				{area.name}
			</option>
		));
	}

	function renderAvailableTag() {
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

	function renderAvailableStatus() {
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

	const filteredListstate = MarketData.filter((eachItem) => {
		const text = eachItem.state.toLowerCase();
		return selectState !== (null || undefined || "" || "Select State")
			? text.includes(selectState.toLowerCase())
			: text;
	});

	const filteredListarea =
		filteredListstate.length > 0
			? filteredListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return selectArea !== (null || undefined || "" || "Select Area")
						? text.includes(selectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredListTag =
		filteredListarea.length > 0
			? filteredListarea.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return tag !== (null || undefined || "" || "Select Tag")
						? text.includes(tag.toLowerCase())
						: text;
			  })
			: [];

	const filteredListStatus =
		filteredListTag.length > 0
			? filteredListTag.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return status !== (null || undefined || "" || "Select Status")
						? text.includes(status.toLowerCase())
						: text;
			  })
			: [];

	const filteredStockCondition =
		filteredListStatus.length > 0
			? filteredListStatus.filter((eachItem) => {
					const text = eachItem.condition.toLowerCase();
					return condition !== (null || undefined || "" || "Select Condition")
						? text.includes(condition.toLowerCase())
						: text;
			  })
			: [];

	const filteredItemAddressList =
		filteredStockCondition.length > 0
			? filteredStockCondition.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchAddress.toLowerCase());
			  })
			: [];

	const filteredList =
		filteredItemAddressList.length > 0
			? filteredItemAddressList.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(10);
	const [visiblePageRange, setVisiblePageRange] = useState([1, 5]);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => {

		setCurrentPage(pageNumber);
		
	}



	function RenderAvailableModelGoods() {
		if (filteredList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No item found</div>
				</div>
			);
		}

		return currentPosts?.map((stock) => (
			<div key={stock.id}>
				<Item title={stock.title} image={stock.image} image2={stock.image2} id={stock.id} price={stock.price} status={stock.status} features={stock.features} condition={stock.condition} phone={stock.phone} address={stock.address} docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} />
			</div>
		));
	}

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};
	const updateSearchInputAddress = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSearchAddress(event.target.value);
		// handleSuggestionClick;
	};

	// to prevent hydration due to typeof document !== 'undefined'?
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const profileDetailRef = collection(database, "market");

	const vendorsQuery = query(profileDetailRef);

	const [profileDetails, setProfileDetails] = useState<FormValue[]>([]);

	const handleGetProfileDetail = async () => {
		try {
			const querySnapshot = await getDocs(vendorsQuery);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: FormValue[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as FormValue;
				retrievedData.push(docData);
			});
			setProfileDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	const filteredFirebaseStateList =
		profileDetails?.length > 0
			? profileDetails.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return selectState !== (null || undefined || "" || "Select State")
						? text.includes(selectState.toLowerCase())
						: text;
			  })
			: [];
	const filteredFirebaseaAreaList =
		filteredFirebaseStateList.length > 0
			? filteredFirebaseStateList.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return selectArea !== (null || undefined || "" || "Select Area")
						? text.includes(selectArea.toLowerCase())
						: text;
			  })
			: [];

	const filteredFirebaseTagList =
		filteredFirebaseaAreaList.length > 0
			? filteredFirebaseaAreaList.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return tag !== (null || undefined || "" || "Select Tag")
						? text.includes(tag.toLowerCase())
						: text;
			  })
			: [];

	const filteredFirebasetStatusList =
		filteredFirebaseTagList.length > 0
			? filteredFirebaseTagList.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return status !== (null || undefined || "" || "Select Status")
						? text.includes(status.toLowerCase())
						: text;
			  })
			: [];

	const filteredFireBaseStockCondition =
		filteredFirebasetStatusList.length > 0
			? filteredFirebasetStatusList.filter((eachItem) => {
					const text = eachItem.condition.toLowerCase();
					return condition !== (null || undefined || "" || "Select Condition")
						? text.includes(condition.toLowerCase())
						: text;
			  })
			: [];

	const filteredFireBaseItemAddressList =
		filteredFireBaseStockCondition.length > 0
			? filteredFireBaseStockCondition.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchAddress.toLowerCase());
			  })
			: [];

	const filteredFirebaseSearchInputList =
		filteredFireBaseItemAddressList.length > 0
			? filteredFireBaseItemAddressList.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	const indexOfLastFireBasePost = currentPage * postsPerPage;
	const indexOfFirstFireBasePost = indexOfLastPost - postsPerPage;
	const currentFireBasePosts = filteredFirebaseSearchInputList.slice(
		indexOfFirstFireBasePost,
		indexOfLastFireBasePost
	);

	function RenderAvailableGoods() {
		if (profileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentFireBasePosts?.map((stock: any) => (
			<div className={styles.stockRenderCover} key={stock.docid}>
				<Item title={stock.title} image={stock.image} image2={stock.image2} id={stock.id} price={stock.price} status={stock.status} features={stock.features} condition={stock.condition} phone={stock.phone} address={stock.address} docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} />
			</div>
		));
	}

	useEffect(() => {
		handleGetProfileDetail();
	}),
		[];

	return (
		<div className={styles.filterBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select
							value={
								selectState !== (undefined || null)
									? selectState
									: "Select State"
							}
							className={styles.select}
							{...register("stateSelect")}
						>
							<option className={styles.option} value="Select State">
								Select State
							</option>
							{renderAvailableStates()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								selectArea !== (undefined || null)
									? selectArea
									: selectState
									? ""
									: "Select Area"
							}
							className={styles.select}
							{...register("areaSelect")}
						>
							<option className={styles.option} value="Select Area">
								Select Area
							</option>
							{selectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								tag !== (undefined || null)
									? tag
									: selectCountry
									? ""
									: "Select Tag"
							}
							className={styles.select}
							{...register("tag")}
						>
							<option className={styles.option} value="Select Tag">
								Select Tag
							</option>
							{renderAvailableTag()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select
							value={
								status !== (undefined || null)
									? status
									: selectCountry
									? ""
									: "Select Status"
							}
							className={styles.select}
							{...register("status")}
						>
							<option className={styles.option} value="Select Status">
								Select Status
							</option>
							{renderAvailableStatus()}
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
							{...register("address")}
							value={searchAddress}
							onChange={updateSearchInputAddress}
							id="vendorAddress"
							placeholder="Search Item Address"
						/>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("address")}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Name of Items"
						/>
					</div>
				</div>
			</form>
			<div className={styles.displayFilter}>
				{isClient && (
					<div className={styles.renderVendorInnerCover}>
						{profileDetails?.length > 0
							? RenderAvailableGoods()
							: RenderAvailableModelGoods()}
						{profileDetails?.length > 0 ? (
							<div className={styles.pagi}>
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={filteredFirebaseSearchInputList.length}
									paginate={paginate}
									currentpage={currentPage}
								/>{" "}
							</div>
						) : (
							<div className={styles.pagi}>
								<Pagination
									postsPerPage={postsPerPage}
									totalPosts={filteredList.length}
									paginate={paginate}
									currentpage={currentPage}
								/>{" "}
							</div>
						)}
					</div>
				)}
				{profileDetails?.length > 0 ? (
					<div className={styles.pagiMid}>
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={filteredFirebaseSearchInputList.length}
							paginate={paginate}
							currentpage={currentPage}
						/>{" "}
					</div>
				) : (
					<div className={styles.pagiMid}>
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={filteredList.length}
							paginate={paginate}
							currentpage={currentPage}
						/>{" "}
					</div>
				)}
			</div>
		</div>
	);
}
