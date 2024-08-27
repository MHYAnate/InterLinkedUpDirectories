import * as React from "react";
import { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { StateData } from "@/database/stateData";
import { MarketShopTag } from "@/database/marketShopTag";
import { MarketComplex } from "@/database/marketComplexTag";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { onAuthStateChanged } from "firebase/auth";
import Shop from "./shopComponent";
import {
	collection,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
const { auth, database} =
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

interface RaterValue {
	name:string;
	docid:string;
	src:string;
}

export default function ShopsFilter() {
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
			title: "",
			complex:"",
			name: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [searchInput, setSearchInput] = useState("");

	const [searchAddress, setSearchAddress] = useState("");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [shopProfileDetails, setShopProfileDetails] = useState<FormValue[]>([]);

	const [raterDetail, setRaterDetail] = useState<RaterValue| null>(null);

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const selectComplex = watch("complex");

	const shopTag = watch("shopTag");

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
			return null;
		}
	});

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

			const filteredShopAddressList =
		filteredShopList.length > 0
			? filteredShopList.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchAddress.toLowerCase());
			  })
			: [];

			const [currentPage, setCurrentPage] = useState(1);
			const [postsPerPage] = useState(6);
		
			// Get current posts
			const indexOfLastPost = currentPage * postsPerPage;
			const indexOfFirstPost = indexOfLastPost - postsPerPage;
			const currentPosts = filteredShopAddressList.slice(indexOfFirstPost, indexOfLastPost);

				// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	const check = shopProfileDetails.length;


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
			<div  key={shop.id}>
				<Shop shopName={shop.shopName} id={shop.id} shopPic={shop.shopPic}  docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} shopTag={shop.shopTag} market={shop.market} address={shop.address}  phone={shop. phone} email={shop.email} offers={shop.offers} check={check} value={shopSearchInput} namei={shop.name}/>
			</div>
		));
	}

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
		// handleSuggestionClick;
	};

	const updateSearchInputAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchAddress(event.target.value);
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

			const filteredFirebaseShopSearchInputAddressList =
		filteredFirebaseShopSearchInputList.length > 0
			? filteredFirebaseShopSearchInputList.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchAddress.toLowerCase());
			  })
			: [];


		
	useEffect(() => {
		handleGetShopeDetail();
	},[handleGetShopeDetail]);
	
	
	const indexOfLastFireBasePost = currentPage * postsPerPage;
	const indexOfFirstFireBasePost = indexOfLastPost - postsPerPage;
	const currentFireBasePosts = filteredFirebaseShopSearchInputAddressList.slice(
		indexOfFirstFireBasePost,
		indexOfLastFireBasePost
	);
	

	function RenderAvailableShops() {
		
		if (shopProfileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentFireBasePosts?.map((shop: any) => (
			<div  key={shop.shopId}>
			<Shop shopName={shop.shopName} id={shop.shopId} shopPic={shop.shopPic}  docid={raterDetail?.docid} name={raterDetail?.name} src={raterDetail?.src} shopTag={shop.shopTag} market={shop.market} address={shop.address}  phone={shop. phone} email={shop.email} offers={shop.offers} check={check} value={shopSearchInput} namei={shop.name}/>
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
							value={searchAddress}
							onChange={updateSearchInputAddress}
							id="vendorAddress"
							placeholder="Search Shop Address"
						/>
					</div>
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("name")}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Shop Name"
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
