import * as React from "react";
import { useState, useEffect, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { StateData } from "@/database/stateData";
import { VacancyData } from "@/database/vacancyData";
import Pagination from "@/components/btn/paginationBtn";

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
	status: string;
	title: string;
};

export default function VacanciesFilter() {
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
			status: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const [isPending, startTransition] = useTransition();

	const [searchInput, setSearchInput] = useState("");

	const [more, setMore] = useState("");

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

	let startTime = performance.now();

	while (performance.now() - startTime < 100) {
		// Do nothing for 1ms per item to emulate extremely slow code
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

	

	const filteredListstate =
	VacancyData.filter((eachItem) => {
					const text = eachItem.state.toLowerCase();
					return (selectState !==(null || undefined|| "" || "Select State")?text.includes(selectState.toLowerCase()):VacancyData);
			  });

	const filteredListarea =
		filteredListstate.length > 0
			? filteredListstate.filter((eachItem) => {
					const text = eachItem.area.toLowerCase();
					return (selectArea !==(null || undefined|| "" || "Select Area")?text.includes(selectArea.toLowerCase()):filteredListstate );
			  })
			: [];



	const filteredList =
		filteredListarea.length > 0
			? filteredListarea.filter((eachItem) => {
					const text = eachItem.jobTitle.toLowerCase();
					return text.includes(searchInput.toLowerCase());
			  })
			: [];

			const [currentPage, setCurrentPage] = useState(1);
			const [postsPerPage] = useState(3);
		
			// Get current posts
			const indexOfLastPost = currentPage * postsPerPage;
			const indexOfFirstPost = indexOfLastPost - postsPerPage;
			const currentPosts = filteredList.slice(indexOfFirstPost, indexOfLastPost);
		
			// Change page
			const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	

	function RenderAvailableModelVacancy() {
		if (filteredList.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>Search some where else</div>
				</div>
			);
		}

		return currentPosts?.map((vacancy) => (
			<div className={styles.VacancyRenderCover} key={vacancy.id}>
				<div className={styles.innerTextVacancyRenderCover}>
				<div className={styles.coverHeadDetail}>
						<div className={styles.detailHead}>{vacancy.jobTitle}</div>
						<div className={styles.headFootDetailCover}>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Opening</span>{vacancy.opening}</div>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Closing</span>{vacancy.closing}</div>
						</div>
						<div className={styles.headFootDetailCover}>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Employer</span>{vacancy.employer}</div>
							<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Salary</span>{vacancy.salary}</div>
						</div>
					</div>
					
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Responsibilities</div>
						<div className={styles.detail}>{vacancy.responsibility}</div>
					</div>
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Qualification</div>
						
						<div className={styles.detail}>{vacancy.qualification}</div>
					</div>

					
						{more ===`${vacancy.id}` && (<div  className={more ===`${vacancy.id}`?styles.dropDown: ""}>
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Adress</div>
						<div className={styles.detail}>{vacancy.addrees}</div>
					</div>
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Contact</div>
						<div className={styles.detail}>{vacancy.phone}</div>
					</div>
					<div className={styles.coverDetail}>
						<div className={styles.detailTitle}>Email</div>
						<div className={styles.detail}>{vacancy.email}</div>
					</div>
					
						</div>)}	
						<div className={styles.vBtnCover}>
							<button className={more !==`${vacancy.id}`?styles.btn : styles.btnA} onClick={more!==`${vacancy.id}`?()=> selectTab(`${vacancy.id}`):()=> selectTab("")}>{more===`${vacancy.id}`?"Show Less":"More Details"}</button>
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

	const profileDetailRef = collection(database, `Vacancy`);

	const vacancyQuery = query(
		profileDetailRef,
		where("countrySelect", "==", `${selectCountry}`)
	);

	const [profileDetails, setProfileDetails] = useState<FormValue[]>([]);

	const handleGetProfileDetail = async () => {
		try {
			const querySnapshot = await getDocs(vacancyQuery);

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
					return (selectState !==(null || undefined|| "" || "Select State")?text.includes(selectState.toLowerCase()):profileDetails );
			  })
			: [];
	const filteredFirebaseaAreaList =
		filteredFirebaseStateList.length > 0
			? filteredFirebaseStateList.filter((eachItem) => {
					const text = eachItem.areaSelect.toLowerCase();
					return (selectArea !==(null || undefined|| "" || "Select Area")?text.includes(selectArea.toLowerCase()):filteredFirebaseStateList );
			  })
			: [];


	const filteredFirebaseSearchInputList =
		filteredFirebaseaAreaList.length > 0
			? filteredFirebaseaAreaList.filter((eachItem) => {
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
		

	function RenderAvailableVacancy() {
		if (profileDetails === null) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}

		return currentFireBasePosts?.map((vacancy: any) => (
			<div className={styles.VacancyRenderCover} key={vacancy.id}>
			<div className={styles.innerTextVacancyRenderCover}>
			<div className={styles.coverHeadDetail}>
					<div className={styles.detailHead}>{vacancy.jobTitle}</div>
					<div className={styles.headFootDetailCover}>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Opening</span>{vacancy.opening}</div>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Closing</span>{vacancy.closing}</div>
					</div>
					<div className={styles.headFootDetailCover}>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Employer</span>{vacancy.employer}</div>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Salary</span>{vacancy.salary}</div>
					</div>
				</div>
				
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Responsibilities</div>
					<div className={styles.detail}>{vacancy.responsibility}</div>
				</div>
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Qualification</div>
					
					<div className={styles.detail}>{vacancy.qualification}</div>
				</div>

				
					{more ===`${vacancy.id}` && (<div  className={more ===`${vacancy.id}`?styles.dropDown: ""}>
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Adress</div>
					<div className={styles.detail}>{vacancy.addrees}</div>
				</div>
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Contact</div>
					<div className={styles.detail}>{vacancy.phone}</div>
				</div>
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Email</div>
					<div className={styles.detail}>{vacancy.email}</div>
				</div>
				
					</div>)}	
					<button className={more !==`${vacancy.id}`?styles.btn : styles.btnA} onClick={more!==`${vacancy.id}`?()=> selectTab(`${vacancy.id}`):()=> selectTab("")}>{more===`${vacancy.id}`?"Less":"More Details"}</button>
			</div>
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
							<select value={selectState !==(undefined || null)? selectState: (selectCountry === "Nigeria"?"": "select state")} className={styles.select} {...register("stateSelect")}>
								<option className={styles.option} value="Select State">
									Select State
								</option>
								 {renderAvailableStates()}
							</select>
						</div>
						<div className={styles.selectCover}>
							<select value={selectArea!==(undefined || null)? selectArea:(selectState?"": "select area")} className={styles.select} {...register("areaSelect")}>
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
								placeholder="Job Title"
							/>
						</div>
					</div>
				</form>
		

			<div className={styles.displayFilter}>
				{isClient && (
					<div className={styles.renderVacancyInnerCover}>
						{	profileDetails?.length > 0
							? RenderAvailableVacancy()
							: RenderAvailableModelVacancy()}
							{	profileDetails?.length > 0?<div className={styles.pagi}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredFirebaseSearchInputList.length}
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

{	profileDetails?.length > 0?<div className={styles.pagiMid}>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={filteredFirebaseSearchInputList.length}
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
