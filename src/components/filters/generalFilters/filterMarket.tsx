import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { StateData } from "@/database/stateData";
import { MarketData } from "@/database/marketData";
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
	shopTag:string;
	status: string;
	title: string;
};

export default function MarketingFilter() {
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
			shopTag:"",
			status: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [isPending, startTransition] = useTransition();

	const [searchInput, setSearchInput] = useState("");

	const [more, setMore] = useState("");

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

	const areaValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="areaSelect"]') as HTMLInputElement)
					?.value || ""
			: "";

	const tagValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="tag"]') as HTMLInputElement)?.value ||
			  ""
			: `${tag}`;

	const statusValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="status"]') as HTMLInputElement)
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

	const filteredListcountry = MarketData.filter((eachItem) => {
		const text = eachItem.country.toLowerCase();
		return text.includes(selectCountry.toLowerCase());
	});
	const filteredListstate =
		filteredListcountry.length > 0
			? filteredListcountry.filter((eachItem) => {
					const text = eachItem.state.toLowerCase();
					return text.includes(selectState.toLowerCase());
			  })
			: [];
	const filteredListarea =
		filteredListstate.length > 0
			? filteredListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return text.includes(selectArea.toLowerCase());
			  })
			: [];

	const filteredListTag =
		filteredListarea.length > 0
			? filteredListarea.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return text.includes(tag.toLowerCase());
			  })
			: [];

	const filteredListStatus =
		filteredListTag.length > 0
			? filteredListTag.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return text.includes(status.toLowerCase());
			  })
			: [];

	const filteredList =
		filteredListStatus.length > 0
			? filteredListStatus.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

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
				<div className={styles.shopName}>{shop.shopName} Shop</div>
				<div className={styles.shoptitleBodyDivide}>
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
				<div className={styles.shopContactCover}>
						<div className={styles.shopContactTitle}> Shop Tag</div>
						<div className={styles.shopContact}>{shop.shopTag}</div>
					</div>
					<div className={styles.ShopContactCover}>
						<div className={styles.shopContactTitle}> Address</div>
						<div className={styles.shopAddress}>{shop.address}</div>
					</div>
					<div className={styles.shopContactCover}>
						<div className={styles.shopContactTitle}> Contact</div>
						<div className={styles.shopContact}>{shop.phone}</div>
					</div>
				</div>
				</div>
		
				
			</div>
		));
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

		return filteredList?.map((stock) => (
			<div className={styles.stockRenderCover} key={stock.id}>
				<div className={styles.stockName}>{stock.title}</div>
				<div className={styles.stockSeperatorCover}>
				<div className={styles.imgCover}>
					
					<Image
						className={styles.idiImg}
						src={`${stock.image}`}
						alt={`${stock.title}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextStockRenderCover}>
					<div className={styles.status}>{stock.status}</div>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>price</div>
						<div className={styles.contact}>{stock.price}</div>
					</div>

					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Address</div>
						<div className={styles.address}>{stock.address}</div>
					</div>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Contact</div>
						<div className={styles.contact}>{stock.phone}</div>
					</div>
				</div>
				<div className={styles.showWide}><div>
					
					<Image
						className={styles.idiImg}
						src={`${stock.image2}`}
						alt={`${stock.title}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextStockRenderCover}>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>features</div>
						<div className={styles.contact}>{stock.features}</div>
					</div>

					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Inventory</div>
						<div className={styles.address}>{stock.inventory}</div>
					</div>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Condition</div>
						<div className={styles.contact}>{stock.condition}</div>
					</div>
				</div></div>
				</div>
				{more ===`${stock.id}` && (<div className={styles.showMore}><div>
					
					<Image
						className={styles.idiImg}
						src={`${stock.image2}`}
						alt={`${stock.title}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextShowMoreRenderCover}>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>features</div>
						<div className={styles.contact}>{stock.features}</div>
					</div>

					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Inventory</div>
						<div className={styles.address}>{stock.inventory}</div>
					</div>
					<div className={styles.contactCover}>
						<div className={styles.contactTitle}>Condition</div>
						<div className={styles.contact}>{stock.condition}</div>
					</div>
				</div></div>)}
				<button className={more !==`${stock.id}`?styles.btn : styles.btnA} onClick={more!==`${stock.id}`?()=> selectTab(`${stock.id}`):()=> selectTab("")}>{more===`${stock.id}`?"Less":"More Details"}</button>
			</div>
		));
	}

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	// to prevent hydration due to typeof document !== 'undefined'?
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	const profileDetailRef = collection(database, "market");

	const vendorsQuery = query(
		profileDetailRef
	);

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

	const filteredFirebaseCountryList =
		profileDetails?.length > 0
			? profileDetails.filter((eachItem) => {
					const text = eachItem.countrySelect.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	const filteredFirebaseStateList =
		filteredFirebaseCountryList.length > 0
			? filteredFirebaseCountryList.filter((eachItem) => {
					const text = eachItem.stateSelect.toLowerCase();
					return text.includes(selectState.toLowerCase());
			  })
			: [];
	const filteredFirebaseaAreaList =
		filteredFirebaseStateList.length > 0
			? filteredFirebaseStateList.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return text.includes(selectArea.toLowerCase());
			  })
			: [];

	const filteredFirebaseTagList =
		filteredFirebaseaAreaList.length > 0
			? filteredFirebaseaAreaList.filter((eachItem) => {
					const text = eachItem.tag.toLowerCase();
					return text.includes(tag.toLowerCase());
			  })
			: [];

	const filteredFirebasetStatusList =
		filteredFirebaseTagList.length > 0
			? filteredFirebaseTagList.filter((eachItem) => {
					const text = eachItem.status.toLowerCase();
					return text.includes(status.toLowerCase());
			  })
			: [];

	const filteredFirebaseSearchInputList =
		filteredFirebasetStatusList.length > 0
			? filteredFirebasetStatusList.filter((eachItem) => {
					const text = eachItem.title.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

	function RenderAvailableGoods() {
		if (profileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return filteredFirebaseSearchInputList?.map((stock: any) => (
			<div className={styles.stockRenderCover} key={stock.id}>
			<div className={styles.stockName}>{stock.title}</div>
			<div className={styles.stockSeperatorCover}>
			<div className={styles.imgCover}>
				
				<Image
					className={styles.idiImg}
					src={`${stock.image}`}
					alt={`${stock.title}`}
					quality={100}
					width={500}
					height={500}
					// unoptimized
				/>
			</div>
			<div className={styles.innerTextStockRenderCover}>
				<div className={styles.status}>{stock.status}</div>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>price</div>
					<div className={styles.contact}>{stock.price}</div>
				</div>

				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Address</div>
					<div className={styles.address}>{stock.address}</div>
				</div>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Contact</div>
					<div className={styles.contact}>{stock.number}</div>
				</div>
			</div>
			<div className={styles.showWide}><div>
				
				<Image
					className={styles.idiImg}
					src={`${stock.image2}`}
					alt={`${stock.title}`}
					quality={100}
					width={500}
					height={500}
					// unoptimized
				/>
			</div>
			<div className={styles.innerTextStockRenderCover}>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>features</div>
					<div className={styles.contact}>{stock.features}</div>
				</div>

				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Inventory</div>
					<div className={styles.address}>{stock.inventory}</div>
				</div>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Condition</div>
					<div className={styles.contact}>{stock.condition}</div>
				</div>
			</div></div>
			</div>
			{more ===`${stock.id}` && (<div className={styles.showMore}><div>
				
				<Image
					className={styles.idiImg}
					src={`${stock.image2}`}
					alt={`${stock.title}`}
					quality={100}
					width={500}
					height={500}
					// unoptimized
				/>
			</div>
			<div className={styles.innerTextShowMoreRenderCover}>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>features</div>
					<div className={styles.contact}>{stock.features}</div>
				</div>

				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Inventory</div>
					<div className={styles.address}>{stock.inventory}</div>
				</div>
				<div className={styles.contactCover}>
					<div className={styles.contactTitle}>Condition</div>
					<div className={styles.contact}>{stock.condition}</div>
				</div>
			</div></div>)}
			<button className={more !==`${stock.id}`?styles.btn : styles.btnA} onClick={more!==`${stock.id}`?()=> selectTab(`${stock.id}`):()=> selectTab("")}>{more===`${stock.id}`?"Less":"More Details"}</button>
		</div>
		));
	}

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
			setProfileDetails(retrievedData);
		} catch (error) {
			console.error("Error getting profile detail:", error);
		}
	};

	useEffect(() => {
		handleGetProfileDetail();
		handleGetShopeDetail();
	}),
		[];

	const filteredFirebaseCountryShopList =
		profileDetails?.length > 0
			? profileDetails.filter((eachItem) => {
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
		if (profileDetails === null) {
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
			<div className={styles.Market}>
				<div
					onClick={() => setMarket("space")}
					className={
						market === "space" ? styles.SpaceHighlighted : styles.Space
					}
				>
					Items
				</div>
				<div
					onClick={() => setMarket("shop")}
					className={market === "shop" ? styles.ShopHighlighted : styles.Shop}
				>
					Shops
				</div>
			</div>
			{market === "space" && (
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
							<select className={styles.select} {...register("tag")}>
								<option className={styles.option} value="select Tag">
									Filter Tag
								</option>
								{renderAvailableTag()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select className={styles.select} {...register("status")}>
								<option className={styles.option} value="select Status">
									Filter Status
								</option>
								{renderAvailableStatus()}
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
								placeholder="Name of Items"
							/>
						</div>
					</div>
				</form>
			)}
			{market === "shop" && (
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
			)}

			<div className={styles.displayFilter}>
				{isClient && market === "space" && (
					<div className={styles.renderVendorInnerCover}>
						{filteredFirebaseCountryList?.length > 0
							? RenderAvailableGoods()
							: RenderAvailableModelGoods()}
					</div>
				)}
				{isClient && market === "shop" && (
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
