import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { MarketTag } from "@/database/marketTag";
import { CompanyTag } from "@/database/companyTag";
import { CompanyData } from "@/database/companyData";
import Company from "./companyComponent";
import CompanyVacanciesComponent from "./fBICompanyVacancy";
import CompanyModelVacancy from "./modelCompanyVacancyQ";
import Pagination from "@/components/btn/paginationBtn";
import { useRouter, useSearchParams } from "next/navigation";
import CompanyM from "./mComponent";
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
	companyPic: string;
	tag: string;
	companyTag: string;
	status: string;
	title: string;
	docid: string;
	companyId:string;
	vacancies: [
		{
			image: string;
			jobTitle: string;
			responsibility: string;
			qualification: string;
			salary: string;
			opening: string;
			closing: string;
		}
	];
	complex:string;
	market:string;
	id:string;
};

export default function CompanyFilter() {
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
			companyTag: "",
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

	const companyTag = watch("companyTag");

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


	function renderAvailablCompanyTag() {
		if (!CompanyTag) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return CompanyTag.map((tag) => (
			<option className={styles.renderCover} key={tag.id} value={tag.tag}>
				{tag.tag}
			</option>
		));
	}

	const filteredShopListstate = 
	CompanyData.filter((eachItem) => {
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


			const filteredcompanyTag =
		filteredShopListarea .length > 0
			? filteredShopListarea .filter((eachItem) => {
					const text = eachItem.companyTag.toLowerCase();
					return (companyTag !==(null || undefined|| "" || "Select Tag")?text.includes(companyTag.toLowerCase()):text );
			  })
			: [];

	const filteredShopList =
		filteredcompanyTag.length > 0
			? filteredcompanyTag.filter((eachItem) => {
					const text = eachItem.companyName.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

			const [currentPage, setCurrentPage] = useState(1);
			const [postsPerPage] = useState(10);
		
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

		return currentPosts?.map((company) => (
			<div key={company.id}>
				<CompanyM companyName={company.companyName} id={company.id} companyPic={company.companyPic} companyTag={company.companyTag} about={company.about}  address={company. address} phone={company.phone} email={company.email}   />
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

	const shopDetailRef = collection(database, `Companies`);

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

	const filteredFirebasecompanyTagList =
		filteredFirebaseaAreaShopList.length > 0
			? filteredFirebaseaAreaShopList.filter((eachItem) => {
					const text = eachItem.companyTag?.toLowerCase();
					return text?.includes(companyTag.toLowerCase());
			  })
			: [];

	const filteredFirebaseShopSearchInputList =
		filteredFirebasecompanyTagList.length > 0
			? filteredFirebasecompanyTagList.filter((eachItem) => {
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

		return currentFireBasePosts?.map((company: any) => (
			<div  key={company.companyId}>
				<Company companyName={company.companyName} id={company.companyId} companyPic={company.companyPic} companyTag={company.companyTag} about={company.about}  address={company. address} phone={company.phone} email={company.email} />
		</div>
		));
	}

	return (
		<div className={styles.filterBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select value={selectState !==(undefined || null)? selectState: (selectCountry === "Nigeria"?"": "select state")} className={styles.select} {...register("stateSelect")}>
							<option className={styles.option} value="Select State">
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
					<div className={styles.selectCover}>
						<select value={companyTag!==(undefined || null)? companyTag:(selectCountry?"": "select market")} className={styles.select} {...register("companyTag")}>
							<option className={styles.option} value="Select Tag">
								Select Tag
							</option>
							{renderAvailablCompanyTag()}
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
							placeholder="Search Company Name"
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
