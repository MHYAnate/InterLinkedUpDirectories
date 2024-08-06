import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { MarketTag } from "@/database/marketTag";
import { MarketShopTag } from "@/database/marketShopTag";
import { MarketComplex } from "@/database/marketComplexTag";
import { ShopData } from "@/database/shopData";
import ShopItemsComponent from "./fBIShopItem";
import Pagination from "@/components/btn/paginationBtn";
import { useRouter, useSearchParams } from "next/navigation";

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
	complex:string;
	market:string;
	id:string;
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
			complex:"",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const searchParams = useSearchParams();

	const router = useRouter();

	const set = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const [isPending, startTransition] = useTransition();

	const [searchInput, setSearchInput] = useState("");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [more, setMore] = useState("");

	const [show, setShow] = useState("");

	const [market, setMarket] = useState("space");

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const selectComplex = watch("complex");

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

			const areaValue =
		typeof document !== "undefined"
			? (document.querySelector('[name="areaSelect"]') as HTMLInputElement)
					?.value || ""
			: "";

	const AreaList = StateData.find(
		(areaList) => areaList.name === `${stateValue}`
	);


	const marketComplex = MarketComplex.find(
		(complexTag) => complexTag.area === `${areaValue}`
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


	function renderAvailableMarketComplexTag() {
		if (!MarketComplex) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return marketComplex?.market.map((complex) => (
			<option className={styles.renderCover} key={complex.name} value={complex.name}>
				{complex.name}
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


	const filteredShopItemsName =  items?.items.filter((eachItem) => {
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
						<div className={styles.showMoreDetailCover}>
							<div className={styles.showMoreItemsDetailsBody}>
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
					className={show !== `${item.id}` ? styles.qShopbtn : styles.qShopbtn}
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

	const filteredShopListstate =
	ShopData.filter((eachItem) => {
					const text = eachItem.state.toLowerCase();
					return (selectState !==(null || undefined|| "" || "Select State")?text.includes(selectState.toLowerCase()):text );
			  });

	const filteredShopListarea =
		filteredShopListstate.length > 0
			? filteredShopListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return (selectArea !==(null || undefined|| "" || "Select Area")?text.includes(selectArea.toLowerCase()):text );
			  })
			: [];

			const filteredShopMarket =
			filteredShopListarea.length > 0
				? filteredShopListarea.filter((eachItem) => {
						const text = eachItem.market.toLowerCase();
						return (selectComplex !==(null || undefined|| "" || "Select Market Complex")?text.includes(selectComplex.toLowerCase()):text );
					})
				: [];

			const filteredShopTag =
		filteredShopMarket .length > 0
			? filteredShopMarket .filter((eachItem) => {
					const text = eachItem.shopTag.toLowerCase();
					return (shopTag !==(null || undefined|| "" || "Select Tag")?text.includes(shopTag.toLowerCase()):text );
			  })
			: [];

	const filteredShopList =
		filteredShopTag.length > 0
			? filteredShopTag.filter((eachItem) => {
					const text = eachItem.shopName.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

			const [currentPage, setCurrentPage] = useState(1);
			const [postsPerPage] = useState(4);
		
			// Get current posts
			const indexOfLastPost = currentPage * postsPerPage;
			const indexOfFirstPost = indexOfLastPost - postsPerPage;
			const currentPosts = filteredShopList.slice(indexOfFirstPost, indexOfLastPost);

				// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


	function RenderAvailableModelShops() {
		if (filteredShopList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No shop found</div>
				</div>
			);
		}

		return currentPosts?.map((shop) => (
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
	
				<div className={more !== `${shop.id}`?styles.companyBodyDivied : styles.hide}>
					<div className={styles.shopImgCover}>
						<Image
							className={styles.shopImg}
							src={`${shop.shopPic}`}
							alt={`${shop.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Shop Tag</div>
							<div className={styles.companyVacancyDetail}>{shop.shopTag}</div>
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
					<div className={styles.shopItemInputCover}>
						<input
							type="search"
							className={styles.shopItemInput}
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

				<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Market</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.market} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.address} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Owner</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.name} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.phone} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.email} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Offer</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.offers} </span>
						</div>

						
				</div>:<></>}
				<div 
				onClick={() =>
					router.push(
						`/shop/` +
							"?" +
							set(
								"shopName",
								`${shop.shopName}`
							) +
							"&" +
							set(
								"shopImg",
								`${shop.shopPic}`
							)
							+
							"&" +
							set(
								"shopAddress",
								`${shop.address}`
							)
							+
							"&" +
							set(
								"shopManager",
								`${shop.name}`
							)
							+
							"&" +
							set(
								"act",
								`${shop.account}`
							)
							+
							"&" +
							set(
								"bnkName",
								`${shop.bankName}`
							)
							+
							"&" +
							set(
								"actName",
								`${shop.accountName}`
							)
							+
							"&" +
							set(
								"contact",
								`${shop.phone}`
							)
							+
							"&" +
							set(
								"complex",
								`${shop.market}`
							)
					)
				}
				className={styles.enterShop}>Enter Shop</div>
			
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

	const shopDetailRef = collection(database, `Shop`);

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


	const filteredFirebaseStateShopList =
	shopProfileDetails?.length > 0
	? shopProfileDetails.filter((eachItem) => {
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

			const filteredFirebaseaAreaShopMarket =
		filteredFirebaseaAreaShopList.length > 0
			? filteredFirebaseaAreaShopList.filter((eachItem) => {
					const text = eachItem.market.toLowerCase();
					return text.includes(selectComplex.toLowerCase());
			  })
			: [];

	const filteredFirebaseShopTagList =
		filteredFirebaseaAreaShopMarket.length > 0
			? filteredFirebaseaAreaShopMarket.filter((eachItem) => {
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


		
	useEffect(() => {
		handleGetShopeDetail();
	},[handleGetShopeDetail]);
	
	
	const indexOfLastFireBasePost = currentPage * postsPerPage;
	const indexOfFirstFireBasePost = indexOfLastPost - postsPerPage;
	const currentFireBasePosts = filteredFirebaseShopSearchInputList.slice(
		indexOfFirstFireBasePost,
		indexOfLastFireBasePost
	);
	

	function RenderAvailableShops() {
		
		if (shopProfileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentFireBasePosts?.map((shop: any) => (
			<div className={styles.shopRenderCover} key={shop.shopId}>
			<div className={styles.shopName}>{shop.shopName} </div>
			<div className={styles.shopNavBtnCover}>
			<div
				className={more !== `${shop.shopId}` ? styles.btnShop : styles.btnShopA}
				onClick={
					more !== `${shop.shopId}`
						? () => setMore(`${shop.shopId}`)
						: () => setMore("")
				}
			>
				{more === `${shop.shopId}` ? "STOCKS" : "stocks"}
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

			<div className={more !== `${shop.shopId}`?styles.companyBodyDivied  : styles.hide}>
			<div className={styles.shopImgCover}>
						<Image
							className={styles.shopImg}
							src={`${shop.shopPic}`}
							alt={`${shop.shopName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Shop Tag</div>
							<div className={styles.companyVacancyDetail}>{shop.shopTag}</div>
						</div>
			</div>
			
			
			{more === `${shop.shopId}` ? <div className={styles.displayShopItemsFilter}>
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
					<div className={styles.shopItemInputCover}>
						<input
							type="search"
							className={styles.shopItemInput}
							{...register("title")}
							value={shopSearchInput}
							onChange={updateShopItemSearchInput}
							id="vendorAddress"
							placeholder="Name of Item"
						/>
					</div>
					</form>
			</div> : <></>}

			{more === `${shop.shopId}` ? <div className={styles.displayShopItems}><ShopItemsComponent shopId={shop.shopId} value={shopSearchInput} tag={tag} /></div> : <></>} 

			{more === `${shop.shopName}` ? <div className={styles.displayShopItems}>
			<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Market</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.market} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.address} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Owner</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.name} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.phone} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.email} </span>
						</div>

						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Offer</span>
							<span className={styles.companyVacancyDetailAbtUs}>{shop.offers} </span>
						</div>

			</div>:<></>}
			<div 	onClick={() =>
					router.push(
						`/shop/` +
							"?" +
							set(
								"shopId",
								`${shop.shopId}`
							) )} className={styles.enterShop}>Enter Shop</div>
		</div>
		));
	}

	return (
		<div className={styles.filterBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select value={selectState !==(undefined || null)? selectState: (selectCountry === "Nigeria"?"": "select state")} className={styles.select} {...register("stateSelect")}>
							<option className={styles.option} value="select State">
							Select State
							</option>
							{renderAvailableStates()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select value={selectArea!==(undefined || null)? selectArea:(selectState?"": "Select Area")} className={styles.select} {...register("areaSelect")}>
							<option className={styles.option} value="Select Area">
								Select Area
							</option>
							{selectState === `${stateValue}` && renderAvailableAreas()}
						</select>
					</div>
					<div  className={styles.selectCover}>
						<select value={selectComplex!==(undefined || null)? selectComplex:(selectArea?"": "select market")} className={styles.select} {...register("complex")}>
							<option className={styles.option} value="Select Market Complex">
								Select Market Complex
							</option>
							{selectArea === `${areaValue}` && renderAvailableMarketComplexTag()}
						</select>
					</div>
					<div className={styles.selectCover}>
						<select value={shopTag!==(undefined || null)? shopTag:(selectCountry?"": "select market")} className={styles.select} {...register("shopTag")}>
							<option className={styles.option} value="Select Tag">
								Select Tag
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
						{shopProfileDetails?.length > 0
							? RenderAvailableShops()
							: RenderAvailableModelShops()}
							{shopProfileDetails?.length > 0?<div className={styles.pagi}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredFirebaseStateShopList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>:<div className={styles.pagi}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredShopList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>}
					</div>
				)}
				{shopProfileDetails?.length > 0?<div className={styles.pagiMid}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredFirebaseStateShopList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>:<div className={styles.pagiMid}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredShopList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>}
			</div>
		</div>
	);
}
