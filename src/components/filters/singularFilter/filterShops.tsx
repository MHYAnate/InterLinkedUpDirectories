import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketShopTag } from "@/database/marketShopTag";
import { ShopData } from "@/database/shopData";

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
	items: [
		{
			image: string;
			image2: string;
			title: string;
			status: string;
			price: string;
			features: string;
			condition: string;
			inventory: string;
			tag: string;
		}
	];
};

export default function ShopsFilter() {
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
	} = useForm<FormValue>({
		defaultValues: {
			address: "",
			countrySelect: "",
			stateSelect: "",
			areaSelect: "",
			tag: "",
			shopTag: "",
			status: "",
			title: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [isPending, startTransition] = useTransition();

	const [searchInput, setSearchInput] = useState("");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [more, setMore] = useState("");

	const [show, setShow] = useState("");

	const [market, setMarket] = useState("space");

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const tag = watch("tag");

	const shopTag = watch("shopTag");

	const status = watch("status");

	function selectTab(nextTab: string) {
		startTransition(() => {
			setMore(nextTab);
		});
	}

	function selectShowTab(nextTab: string) {
		startTransition(() => {
			setShow(nextTab);
		});
	}

	const countryValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="countrySelect"]') as HTMLInputElement)
					?.value || ""
			: "";

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

	

	function renderAvailablShopTag() {
		if (!MarketShopTag) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return MarketShopTag.map((tag) => (
			<option className={styles.renderCover} key={tag.id} value={tag.tag}>
				{tag.tag}
			</option>
		));
	}

	function shopItems(shopName: string) {
		const items = ShopData.find((shop) => shop.name === `${shopName}`);

		if (!items) return null;

		
	const filteredShopItemsTag = items?.items.filter((eachItem) => {
		const text = eachItem.tag.toLowerCase();
		return text.includes(tag.toLowerCase());
	});

	const filteredShopItemsName = filteredShopItemsTag.filter((eachItem) => {
		const text = eachItem.title.toLowerCase();
		return text.includes(shopSearchInput.toLowerCase());
	});

		return filteredShopItemsName?.map((item) => (
			<div className={styles.renderCover} key={item.id}>
				<div className={styles.shopItemsCover}>
					<div className={styles.shopsItemsImgCover}>
						<Image
							className={styles.shopItemImg}
							src={`${item.image}`}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.shopItemsDetailCover}>
						<div className={styles.shopItemsDetailTitleName}>{item.title}</div>
						<div className={styles.shopItemsBody}>{item.price}</div>
					</div>
				</div>
				{show === `${item.id}` && (
					<div className={styles.showMoreDetails}>
						<div className={styles.shopsItemsImgCover}>
						<Image
							className={styles.shopItemImg}
							src={`${item.image2}`}
							alt={`${item.title}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
						<div>
							<div className={styles.showMoreDetailsBody}>
							<span className={styles.shopItemsDetailTitle}>Condition</span>
							<span className={styles.shopItemsBody}>{item.condition}</span>
						</div>
						<div>
							<span className={styles.shopItemsDetailTitle}>Status</span>
							<span className={styles.shopItemsBody}>{item.status}</span>
						</div>
						<div>
							<span className={styles.shopItemsDetailTitle}>feature</span>
							<span className={styles.shopItemsBody}>{item.features}</span>
						</div>
					</div>
						
					</div>
				)}
				<div
					className={show !== `${item.id}` ? styles.btn : styles.btnA}
					onClick={
						show !== `${item.id}`
							? () => setShow(`${item.id}`)
							: () => setShow("")
					}
				>
					{show === `${item.id}` ? "Less" : "Details"}
				</div>
			</div>
		));
	}


	const filteredShopListcountry = ShopData.filter((eachItem) => {
		const text = eachItem.country.toLowerCase();
		return text.includes(selectCountry.toLowerCase());
	});
	const filteredShopListstate =
		filteredShopListcountry.length > 0
			? filteredShopListcountry.filter((eachItem) => {
					const text = eachItem.state.toLowerCase();
					return text.includes(selectState.toLowerCase());
			  })
			: [];
	const filteredShopListarea =
		filteredShopListstate.length > 0
			? filteredShopListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return text.includes(selectArea.toLowerCase());
			  })
			: [];

	const filteredShopList =
		filteredShopListarea.length > 0
			? filteredShopListarea.filter((eachItem) => {
					const text = eachItem.shopName.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	function RenderAvailableModelShops() {
		if (filteredShopList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No shop found</div>
				</div>
			);
		}

		return filteredShopList?.map((shop) => (
			<div className={styles.shopRenderCover} key={shop.id}>
				<div className={styles.shopName}>{shop.shopName} </div>
				<div className={styles.shopNavBtnCover}>
				<div
					className={more !== `${shop.id}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${shop.id}`
							? () => setMore(`${shop.id}`)
							: () => setMore("")
					}
				>
					{more === `${shop.id}` ? "STOCKS" : "stocks"}
				</div>
				<div
					className={more !== `${shop.shopName}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${shop.shopName}`
							? () => setMore(`${shop.shopName}`)
							: () => setMore("")
					}
				>
					{more === `${shop.shopName}` ? "DETAILS" : "details"}
				</div>
				</div>
	
				<div className={more !== `${shop.id}`?styles.shoptitleBodyDivide : styles.hide}>
					<div className={styles.imgCover}>
						<Image
							className={styles.idiImg}
							src={`${shop.shopPic}`}
							alt={`${shop.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.innerTextShopRenderCover}>
					<div className={styles.contactCover}>
							<div className={styles .contactTitle}> Tag</div>
							<div className={styles.contact}>{shop.shopTag}</div>
						</div>
						<div className={styles.contactCover}>
							<div className={styles.contactTitle}> Address</div>
							<div className={styles.address}>{shop.address}</div>
						</div>
						<div className={styles.contactCover}>
							<div className={styles .contactTitle}> Contact</div>
							<div className={styles.contact}>{shop.phone}</div>
						</div>
					</div>
				</div>
				
				
				{more === `${shop.id}` ? <div className={styles.displayShopItemsFilter}>
				<div className={styles.searchShopImgCover}>
						<Image
							className={styles.searchShopImg}
							src={`${shop.shopPic}`}
							alt={`${shop.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div><form>
					<div className={styles.selectCover}>
						<select className={styles.select} {...register("tag")}
	
						>
							<option className={styles.option} value="Filter Tag">
								Filter Tag
							</option>
							{renderAvailableTag()}
						</select>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("title")}
							value={shopSearchInput}
							onChange={updateShopItemSearchInput}
							id="vendorAddress"
							placeholder="Name of Item"
						/>
					</div>

					</form>
				</div> : <></>}

				{more === `${shop.id}` ? <div className={styles.displayShopItems}>{shopItems(shop.name)}</div> : <></>}

				{more === `${shop.shopName}` ?<div className={styles.displayShopItems}>
				<div className={styles.showMoreDetailsBody}>
							<span className={styles.shopItemsDetailTitle}>Owner</span>
							<span className={styles.shopItemsBody}>{shop.name}</span>
						</div>
						<div>
							<span className={styles.shopItemsDetailTitle}>Email</span>
							<span className={styles.shopItemsBody}>{shop.email}</span>
						</div>
						<div>
							<span className={styles.shopItemsDetailTitle}>Offer</span>
							<span className={styles.shopItemsBody}>{shop.offers} Services</span>
						</div>
				</div>:<></>}
			
			
			</div>
		));
	}

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const updateShopItemSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShopSearchInput(event.target.value);
		// handleSuggestionClick;
	};
	// to prevent hydration due to typeof document !== 'undefined'?
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const [shopProfileDetails, setShopProfileDetails] = useState<FormValue[]>([]);

	const shopDetailRef = collection(database, `MarketShop`);

	const shopsquery = query(
		shopDetailRef,
		where("countrySelect", "==", `${selectCountry}`)
	);

	const handleGetShopeDetail = async () => {
		try {
			const querySnapshot = await getDocs(shopsquery);

			if (querySnapshot.empty) {
				console.log("No profile details found");
				return;
			}

			const retrievedData: FormValue[] = [];
			querySnapshot.forEach((doc) => {
				const docData = doc.data() as FormValue;
				retrievedData.push(docData);
			});
			setShopProfileDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetShopeDetail();
	}),
		[];

	const filteredFirebaseCountryShopList =
		shopProfileDetails?.length > 0
			? shopProfileDetails.filter((eachItem) => {
					const text = eachItem.countrySelect.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	const filteredFirebaseStateShopList =
		filteredFirebaseCountryShopList.length > 0
			? filteredFirebaseCountryShopList.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return text.includes(selectState.toLowerCase());
			  })
			: [];
	const filteredFirebaseaAreaShopList =
		filteredFirebaseStateShopList.length > 0
			? filteredFirebaseStateShopList.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return text.includes(selectArea.toLowerCase());
			  })
			: [];

	const filteredFirebaseShopTagList =
		filteredFirebaseaAreaShopList.length > 0
			? filteredFirebaseaAreaShopList.filter((eachItem) => {
					const text = eachItem.shopTag?.toLowerCase();
					return text?.includes(shopTag.toLowerCase());
			  })
			: [];

	const filteredFirebaseShopSearchInputList =
		filteredFirebaseShopTagList.length > 0
			? filteredFirebaseShopTagList.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	function RenderAvailableShops() {
		if (shopProfileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return filteredFirebaseShopSearchInputList?.map((vendor: any) => (
			<div className={styles.stockRenderCover} key={vendor?.name}>
				<div className={styles.imgCover}>
					<div className={styles.vendorName}>{vendor.name}</div>
					<Image
						className={styles.idiImg}
						src={`${vendor.src ? vendor.src : "/placeholder.jpg"}`}
						alt={`${vendor.name}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextShopkRenderCover}>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Shop Tag</div>
						<div className={styles.contact}>{vendor.shopTag}</div>
					</div>
					<div className={styles.addresCover}>
						<div className={styles.addressTitle}>Address</div>
						<div className={styles.address}>{vendor.address}</div>
					</div>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Contact</div>
						<div className={styles.contact}>{vendor.number}</div>
					</div>
				</div>
			</div>
		));
	}

	return (
		<div className={styles.filterBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select
							className={styles.select}
							{...register("countrySelect")}
							value={countryValue}
						>
							<option className={styles.option} value="select Country">
								Filter Country
							</option>
							<option className={styles.option} value="Nigeria">
								Nigeria
							</option>
						</select>
					</div>
					<div className={styles.selectCover}>
						<select className={styles.select} {...register("stateSelect")}>
							<option className={styles.option} value="select State">
								Filter State
							</option>
							{selectCountry === "Nigeria" && renderAvailableStates()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select className={styles.select} {...register("areaSelect")}>
							<option className={styles.option} value="select Area">
								Filter Area
							</option>
							{selectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select className={styles.select} {...register("shopTag")}>
							<option className={styles.option} value="select Tag">
								Filter Tag
							</option>
							{renderAvailablShopTag()}
						</select>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("address")}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Name of Shop"
						/>
					</div>
				</div>
			</form>

			<div className={styles.displayFilter}>
				{isClient && (
					<div className={styles.renderVendorInnerCover}>
						{filteredFirebaseCountryShopList?.length > 0
							? RenderAvailableShops()
							: RenderAvailableModelShops()}
					</div>
				)}
			</div>
		</div>
	);
}
