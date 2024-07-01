import * as React from "react";
import { useState, useEffect, useCallback, useTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { StateData } from "@/database/stateData";
import { MarketData } from "@/database/marketData";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";

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
	docid: string;
};

export default function ItemsFilter() {
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
			{more ===`${stock.docid}` && (<div className={styles.showMore}><div>
				
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
			<button className={more !==`${stock.docid}`?styles.btn : styles.btnA} onClick={more!==`${stock.docid}`?()=> selectTab(`${stock.docid}`):()=> selectTab("")}>{more===`${stock.docid}`?"Less":"More Details"}</button>
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
							<select value={selectState !==(undefined || null)? selectState: (selectCountry === "Nigeria"?"": "select state")} className={styles.select} {...register("stateSelect")}>
								<option className={styles.option} value="select State">
									Filter State
								</option>
								{selectCountry === "Nigeria" && renderAvailableStates()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select value={selectArea!==(undefined || null)? selectArea:(selectState?"": "select area")} className={styles.select} {...register("areaSelect")}>
								<option className={styles.option} value="select Area">
									Filter Area
								</option>
								{selectState === `${stateValue}` && renderAvailableAreas()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select value={tag!==(undefined || null)? tag:(selectCountry?"": "select tag")} className={styles.select} {...register("tag")}>
								<option className={styles.option} value="select Tag">
									Filter Tag
								</option>
								{renderAvailableTag()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select value={status!==(undefined || null)? status:(selectCountry?"": "select status")} className={styles.select} {...register("status")}>
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
			<div className={styles.displayFilter}>
				{isClient  && (
					<div className={styles.renderVendorInnerCover}>
						{filteredFirebaseCountryList?.length > 0
							? RenderAvailableGoods()
							: RenderAvailableModelGoods()}
					</div>
				)}
			</div>
		</div>
	);
}
