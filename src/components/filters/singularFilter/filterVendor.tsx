import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { StateData } from "@/database/stateData";
import { VendorsData } from "@/database/vendorData";
import {
	collection,
	collectionGroup,
	doc,
	setDoc,
	addDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;
import Pagination from "@/components/btn/paginationBtn";
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
	country:string;
	state: string;
	area:string;
	specialty:string;
};

export default function FilterVendors() {
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
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [searchInput, setSearchInput] = useState("");

	const searchParams = useSearchParams();

	const Vendors = searchParams.get("name");

	const selectCountry = watch("countrySelect");

	const selectState = watch("stateSelect");

	const selectArea = watch("areaSelect");

	const selectAddress = watch("address");

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

	const VendorsList = VendorsData.find(
		(vendorList) => vendorList.name === `${Vendors}`
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


	const filteredListstate= VendorsList?.vendorsList ? VendorsList.vendorsList.filter((eachItem) => {
		const text = eachItem.state.toLowerCase();
		return (selectState !==(null || undefined|| "" || "Select State")?text.includes(selectState.toLowerCase()):text );
	}):[];

	const filteredListarea = filteredListstate.length > 0 ?filteredListstate.filter((eachItem) => {
		const text = eachItem.area.toLowerCase();
		return (selectArea !==(null || undefined|| "" || "Select Area")?text.includes(selectArea.toLowerCase()):text );
	}):[];

	const filteredList = filteredListarea.length > 0 ?filteredListarea.filter((eachItem) => {
		const text = eachItem.address.toLowerCase();
		return text.includes(searchInput.toLowerCase());
	}):[];

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(4);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RendeAvailabeVendors() {
		if (filteredList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>No vendors found</div>
				</div>
			);
		}

		return currentPosts?.map((vendor) => (
			<div className={styles.VendorRenderCover} key={vendor.id}>
				<div className={styles.vendorName}>{vendor.name}</div>
				<div className={styles.imgCover}>
					
					<Image
						className={styles.idiImg}
						src={`${vendor.src}`}
						alt={`${vendor.name}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextVendorRenderCover}>
				<div className={styles.vendorAddresCover}>
						<div className={styles.vendoraddressTitle}>Specialty</div>
						<div className={styles.vendorAddress}>{vendor.specialty}</div>
					</div>
					<div className={styles.vendorAddresCover}>
						<div className={styles.vendoraddressTitle}>Address</div>
						<div className={styles.vendorAddress}>{vendor.address}</div>
					</div>
					<div className={styles.vendorContactCover}>
						<div className={styles.vendorContactTitle}>Contact</div>
						<div className={styles.vendorContact}>{vendor.contact}</div>
					</div>
				</div>
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

	const profileDetailRef = collection(database, `profile`);

	const vendorsQuery = query(
		profileDetailRef,
		where("selectService", "==", `${Vendors}`),
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

	useEffect(() => {
		handleGetProfileDetail();
	}),
		[];

		const filteredFireBaseListstate= profileDetails?.length > 0
		? profileDetails.filter((eachItem) => {
			const text = eachItem.stateSelect.toLowerCase();
			return (selectState !==(null || undefined|| "" || "Select State")?text.includes(selectState.toLowerCase()):text );
		}):[];
	
		const filteredFireBaseListarea = filteredFireBaseListstate?.length > 0 ?filteredFireBaseListstate.filter((eachItem) => {
			const text = eachItem.areaSelect.toLowerCase();
			return (selectArea !==(null || undefined|| "" || "Select Area")?text.includes(selectArea.toLowerCase()):text );
		}):[];

	const filteredFirebaseList =
		filteredFireBaseListarea?.length > 0
			? filteredFireBaseListarea.filter((eachItem) => {
					const text = eachItem.address.toLowerCase();
					return text.includes(searchInput);
			  })
			: [];

			const indexOfLastFireBasePost = currentPage * postsPerPage;
			const indexOfFirstFireBasePost = indexOfLastPost - postsPerPage;
			const currentFireBasePosts = filteredFirebaseList.slice(
				indexOfFirstFireBasePost,
				indexOfLastFireBasePost
			);

	function RenderAvailabeVendors() {
		if (!profileDetails) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentFireBasePosts?.map((vendor: any) => (
			<div className={styles.VendorRenderCover} key={vendor?.name}>
				<div className={styles.imgCover}>
					<div className={styles.vendorName}>{vendor.name}</div>
					<Image
						className={styles.idiImg}
						src={`${vendor.src ? vendor.src : '/placeholder.jpg'}`}
						alt={`${vendor.name}`}
						quality={100}
						width={500}
						height={500}
						// unoptimized
					/>
				</div>
				<div className={styles.innerTextVendorRenderCover}>
				<div className={styles.vendorAddresCover}>
						<div className={styles.vendoraddressTitle}>Specialty</div>
						<div className={styles.vendorAddress}>{vendor.specialty}</div>
					</div>
					<div className={styles.vendorAddresCover}>
						<div className={styles.vendoraddressTitle}>Address</div>
						<div className={styles.vendorAddress}>{vendor.address}</div>
					</div>
					<div className={styles.vendorContactCover}>
						<div className={styles.vendorContactTitle}>Contact</div>
						<div className={styles.vendorContact}>{vendor.number}</div>
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
						<select value={selectState !==(undefined || null)? selectState: (selectCountry === "Nigeria"?"": "Select State")} className={styles.select} {...register("stateSelect")}>
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
					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("address")}
							value={searchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Personal Address"
						/>
					</div>
				</div>
			</form>
			<div className={styles.displayFilter}>
				
			{ isClient && (
					<div className={styles.renderVendorInnerCover}>
						{profileDetails?.length > 0 ? RenderAvailabeVendors() :RendeAvailabeVendors()}
						
						{profileDetails?.length > 0?<div className={styles.pagi}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={profileDetails?.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>:<div className={styles.pagi}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>}
					</div>
				)}
				{profileDetails?.length > 0?<div className={styles.pagiMid}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={profileDetails?.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>:<div className={styles.pagiMid}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredList.length}
						paginate={paginate}
						currentpage={currentPage}
					/>{" "}
				</div>}
				
			</div>
		</div>
	);
}
