import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { StateData } from "@/database/stateData";
import { MarketTag } from "@/database/marketTag";
import { CompanyTag } from "@/database/companyTag";
import { ShopData } from "@/database/shopData";
import { CompanyData } from "@/database/companyData";
import ShopItemsComponent from "./fBIShopItem";
import CompanyVacanciesComponent from "./fBICompanyVacancy";
import RateUs from "@/components/btn/rateUs";
import Pagination from "@/components/btn/paginationBtn";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

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

interface RaterValue {
	name:string;
	docid:string;
	src:string;
}

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

	const [searchInput, setSearchInput] = useState("");

	const [shopSearchInput, setShopSearchInput] = useState("");

	const [more, setMore] = useState("");

	const [show, setShow] = useState("");

	const [raterDetail, setRaterDetail] = useState<RaterValue| null>(null);

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const selectComplex = watch("complex");

	const tag = watch("tag");

	const companyTag = watch("companyTag");

	const status = watch("status");

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

	function CompanyVacancies(shopName: string) {
		const vacancy = CompanyData.find((company) => company.name === `${shopName}`);

		if (!vacancy) return null;


	const filteredCompanyVacancies =  vacancy?.vacancies.filter((eachItem) => {
		const text = eachItem.jobTitle.toLowerCase();
		return text.includes(shopSearchInput.toLowerCase());
	});

		return filteredCompanyVacancies?.map((vacancy) => (
			<div className={styles.renderCover} key={vacancy.id}>
				<div className={styles.showCompanyVacancies}>
					
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Job Title</span>
							<span className={styles.companyVacancyDetail}>{vacancy.jobTitle}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Salary</span>
							<span className={styles.companyVacancyDetail}>{vacancy.salary}</span>
						</div>
					
				</div>
				{show === `${vacancy.id}` && (
					<div className={styles.showCompanyVacancies}>
            <div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Responsibility</span>
							<span className={styles.companyVacancyDetail}>{vacancy.responsibility}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Qualification</span>
							<span className={styles.companyVacancyDetail}>{vacancy.qualification}</span>
						</div>

						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Openning Date</span>
							<span className={styles.companyVacancyDetail}>{vacancy.opening}</span>
						</div>
						<div className={styles.CompanyVacancyBodyCover}>
							<span className={styles.companyVacancyTitle}>Clossing Date</span>
							<span className={styles.companyVacancyDetail}>{vacancy.closing}</span>
						</div>				
					</div>
				)}
				<div
					className={show !== `${vacancy.id}` ? styles.vShowbtn : styles.vShowbtn}
					onClick={
						show !== `${vacancy.id}`
							? () => setShow(`${vacancy.id}`)
							: () => setShow("")
					}
				>
					{show === `${vacancy.id}` ? "Less" : "Details"}
				</div>
			</div>
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
			const [postsPerPage] = useState(6);
		
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
			<div className={styles.shopRenderCover} key={company.id}>
				<div className={styles.shopName}>{company.companyName} </div>
				<div className={styles.shopNavBtnCover}>
				<div
					className={more !== `${company.id}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${company.id}`
							? () => setMore(`${company.id}`)
							: () => setMore("")
					}
				>
					{more === `${company.id}` ? "Vacancies" : "Vacancies"}
				</div>
				<div
					className={more !== `${company.companyName}` ? styles.btnShop : styles.btnShopA}
					onClick={
						more !== `${company.companyName}`
							? () => setMore(`${company.companyName}`)
							: () => setMore("")
					}
				>
					{more === `${company.companyName}` ? "DETAILS" : "details"}
				</div>
				</div>
	
				<div className={more !== `${company.id}`?styles.companyBodyDivied : styles.hide}>
					<div className={styles.companyImgCover}>
						<Image
							className={styles.companyImg}
							src={`${company.companyPic}`}
							alt={`${company.companyName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<div>
						<RateUs rateeId={`${company.id}`} raterId={`${raterDetail?.docid}`} raterName={`${raterDetail?.name}`} raterImg={`${raterDetail?.src}`} />
					</div>
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Company Tag</div>
							<div className={styles.companyVacancyDetail}>{company.companyTag}</div>
						</div>
					</div>
				{more === `${company.id}` ? <div className={styles.displayShopItemsFilter}>
				<div className={styles.searchShopImgCover}>
						<Image
							className={styles.searchShopImg}
							src={`${company.companyPic}`}
							alt={`${company.companyName}`}
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

				{more === `${company.id}` ? <div className={styles.displayShopItems}>{CompanyVacancies(company.name)}</div> : <></>}

				{more === `${company.companyName}` ?<div className={styles.displayShopItems}>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>About us</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.about} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.address} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.phone} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.email} </span>
						</div>
				</div>:<></>}
				<div 
				onClick={() =>
					router.push(
						`/company/` +
							"?" +
							set(
								"companyName",
								`${company.companyName}`
							) +
							"&" +
							set(
								"companyPic",
								`${company.companyPic}`
							)
							+
							"&" +
							set(
								"companyAddress",
								`${company.address}`
							)
							+
							"&" +
							set(
								"companyTag",
								`${company.companyTag}`
							)
							+
							"&" +
							set(
								"contact",
								`${company.phone}`
							)
							+
							"&" +
							set(
								"email",
								`${company.email}`
							)
							+
							"&" +
							set(
								"about",
								`${company.about}`
							)
					)
				}
				className={styles.enterShop}>{"Enter Company's Page"}</div>
			
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
			<div className={styles.shopRenderCover} key={company.companyId}>
			<div className={styles.shopName}>{company.shopName} </div>
			<div className={styles.shopNavBtnCover}>
			<div
				className={more !== `${company.companyId}` ? styles.btnShop : styles.btnShopA}
				onClick={
					more !== `${company.companyId}`
						? () => setMore(`${company.companyId}`)
						: () => setMore("")
				}
			>
				{more === `${company.companyId}` ? "Vacancies" : "Vacancies"}
			</div>
			<div
				className={more !== `${company.companyId}` ? styles.btnShop : styles.btnShopA}
				onClick={
					more !== `${company.companyId}`
						? () => setMore(`${company.companyId}`)
						: () => setMore("")
				}
			>
				{more === `${company.companyId}` ? "DETAILS" : "details"}
			</div>
			</div>

			<div className={more !== `${company.companyId}`?styles.shoptitleBodyDivide : styles.hide}>
			<div className={styles.companyImgCover}>
						<Image
							className={styles.companyImg}
							src={`${company.companyPic}`}
							alt={`${company.companyName}`}
							quality={100}
							width={500}
							height={500}
							// unoptimized
						/>
					</div>
					<RateUs rateeId={`${company.companyId}`} raterId={`${raterDetail?.docid}`} raterName={`${raterDetail?.name}`} raterImg={`${raterDetail?.src}`} />
					<div className={styles.showCompanyVacanciesTag}>
							<div className={styles.companyVacancyTitleAbtUS}> Company Tag</div>
							<div className={styles.companyVacancyDetail}>{company.companyTag}</div>
						</div>
			</div>
			
			
			{more === `${company.companyId}` ? <div className={styles.displayShopItemsFilter}>
			<div className={styles.searchShopImgCover}>
					<Image
						className={styles.searchShopImg}
						src={`${company.companyPic}`}
						alt={`${company.companyName}`}
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

			{more === `${company.companyId}` ? <div className={styles.displayShopItems}><CompanyVacanciesComponent companyId={company.companyId} value={shopSearchInput} tag={tag} /></div> : <></>} 

			{more === `${company.companyId}` ? <div className={styles.displayShopItems}>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>About us</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.about} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Address</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.address} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Contact</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.phone} </span>
						</div>
						<div className={styles.showCompanyVacanciesAbtUs}>
							<span className={styles.companyVacancyTitleAbtUS}>Email</span>
							<span className={styles.companyVacancyDetailAbtUs}>{company.email} </span>
						</div>
				</div>:<></>}
			<div 	onClick={() =>
					router.push(
						`/company/` +
							"?" +
							set(
								"companyId",
								`${company.companyId}`
							)
							 )} className={styles.enterShop}>Enter Companys Page</div>
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
