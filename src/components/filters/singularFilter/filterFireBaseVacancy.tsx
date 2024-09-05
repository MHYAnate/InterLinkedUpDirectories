"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import { ShopData } from "@/database/shopData";
import Pagination from "@/components/btn/paginationBtn";
import { useState, useEffect, useCallback, useTransition } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { VacancyType } from "@/database/vacancyType";
import { MarketStatus } from "@/database/marketStatus";
import { MarketTag } from "@/database/marketTag";
import { MarketCondition } from "@/database/marketCondition";
import { useForm } from "react-hook-form";
import firebase from "@/firebase/firebase";
const { auth, storage, database, clientColRef, add, getClientDoc, Delete } =
	firebase;

type CompanyVacancyValue = {
	id: string;
  jobTitle: string;
  responsibility: string;
  qualification: string;
  salary: string;
  opening: string;
  closing: string;
  type: string;
};

type companyId = {
	companyId: string;
	vendorId: String;
};

const FireBaseVacancy: React.FC<companyId> = ({ companyId , vendorId }) => {
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
	} = useForm<CompanyVacancyValue>({
		defaultValues: {
			jobTitle: "",
			type: "",
		},
		shouldUseNativeValidation: true,
		mode: "onChange",
	});

	const selectType = watch("type");

  const [companyVacancyDetails, setCompanyVacancyDetails] = useState<CompanyVacancyValue[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [show, setShow] = useState<string | null>(null);

	const [companyVacancySearchInput, setCompanyVacancySearchInput] = useState("");

	const [img, setImg] = useState("");

	const [currentPage, setCurrentPage] = useState(1);

	const [postsPerPage] = useState(6);

	const updateSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyVacancySearchInput(event.target.value);
		// handleSuggestionClick;
	};



  useEffect(() => {
    const fetchCompanyVacancy = async () => {
      setIsLoading(true);
      try {
        const shopItemDetailRef = collection(database, 'Vacancies');
        const companyVacancyQuery = query(shopItemDetailRef, where('companyId', '==', companyId));

				const vendorVacancyQuery = query(shopItemDetailRef, where('vendorId', '==', vendorId));
        const querySnapshot = await getDocs(companyId !== ("" || null || undefined)? companyVacancyQuery:vendorVacancyQuery);

        if (querySnapshot.empty) {
          console.log('No profile details found');
          setCompanyVacancyDetails([]);
        } else {
          const retrievedData: CompanyVacancyValue[] = [];
          querySnapshot.forEach((doc) => {
            const docData = doc.data() as CompanyVacancyValue;
						retrievedData.push(docData);
          });
          setCompanyVacancyDetails(retrievedData);
        }
      } catch (error) {
        console.error('Error getting profile detail:', error);
        setCompanyVacancyDetails([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyVacancy();
  }, [companyId]);

	const items = companyVacancyDetails;

	if (!items) return null;

	function renderAvailableVacancyType() {
		if (!VacancyType) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return null;
		}
		return VacancyType.map((vacancy) => (
			<option
				className={styles.renderCover}
				key={vacancy.id}
				value={vacancy.type}
			>
				{vacancy.type}
			</option>
		));
	}

	
	const filteredListType= items.length > 0 ?items.filter((eachItem) => {
    const text = eachItem.type.toLowerCase();
    return (selectType !==(null || undefined|| "" || "Select Type")?text.includes(selectType.toLowerCase()):text );
  }):[];

	const filteredVacancyTitle =
		filteredListType.length > 0
			? filteredListType.filter((eachItem) => {
					const text = eachItem.jobTitle.toLowerCase();
					return text.includes(companyVacancySearchInput.toLowerCase());
			  })
			: [];

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredVacancyTitle.slice(
		indexOfFirstPost,
		indexOfLastPost
	);

	// Change page
	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	function RenderAvailableVcancy() {
		if (filteredVacancyTitle.length === 0) {
			// Return a message or component indicating that the "Maintenance" category is not found
			return (
				<div>
					<div>fNo item found</div>
				</div>
			);
		}

		return currentPosts?.map((vacancy) => (
			<div className={styles.VacancyRenderCover} key={vacancy.id}>
			<div className={styles.innerTextVacancyRenderCover}>
				<div className={styles.coverHeadDetail}>
					<div className={styles.detailType}>
						<span>{vacancy.type}</span>
						<div className={styles.headFootDetail}>
							<span className={styles.headFootSpan}>Salary</span>
							{vacancy.salary}
						</div>
					</div>
					<div className={styles.detailHead}>{vacancy.jobTitle}</div>

					<div className={styles.headFootDetailCover}>
						<div className={styles.headFootDetail}>
							<span className={styles.headFootSpan}>Opening</span>
							{vacancy.opening}
						</div>
						<div className={styles.headFootDetail}>
							<span className={styles.headFootSpan}>Closing</span>
							{vacancy.closing}
						</div>
					</div>
				</div>
				{/* <div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Salary</div>
					<div className={styles.detail}>{vacancy.salary}</div>
				</div> */}

				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Responsibilities</div>
					<div className={styles.detail}>{vacancy.responsibility}</div>
				</div>
				<div className={styles.coverDetail}>
					<div className={styles.detailTitle}>Qualification</div>

					<div className={styles.detail}>{vacancy.qualification}</div>
				</div>
				{/* {show ===`${vacancy.id}` && (<div  className={show ===`${vacancy.id}`?styles.dropDown: ""}>
					<div className={styles.headFootDetailCover}>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Opening</span>{vacancy.opening}</div>
						<div className={styles.headFootDetail}><span className={styles.headFootSpan}>Closing</span>{vacancy.closing}</div>
					</div>
							
					</div>)}	
					<div className={styles.vBtnCover}>
						<button className={show !==`${vacancy.id}`?styles.vBtn : styles.vBtn} onClick={show!==`${vacancy.id}`?()=> selectTab(`${vacancy.id}`):()=> selectTab("")}>{show===`${vacancy.id}`?"Show Less":"More Details"}</button>
					</div> */}
			</div>
		</div>
		));
	}

	return (
		<div className={styles.shopItemBodyCover}>
			<form className={styles.filter} onSubmit={handleSubmit(console.log)}>
				<div className={styles.selectGroup}>
					<div className={styles.selectCover}>
						<select
							value={
								selectType !== (undefined || null)
									? selectType
									: "Select Type"
							}
							className={styles.select}
							{...register("type")}
						>
							<option className={styles.option} value="Select Type">
								Select Job Type
							</option>
							{renderAvailableVacancyType()}
						</select>
					</div>

					<div className={styles.inputCover}>
						<input
							type="search"
							className={styles.input}
							{...register("jobTitle")}
							value={companyVacancySearchInput}
							onChange={updateSearchInput}
							id="vendorAddress"
							placeholder="Search Job Title"
						/>
					</div>
				</div>
			</form>
			<div className={styles.renderAvModStockoverFlow}>
				<div className={styles.renderAvModVacancy}>
					{RenderAvailableVcancy()}
				</div>
			</div>

			<div className={styles.renderAvModpagi}>
				<Pagination
					postsPerPage={postsPerPage}
					totalPosts={filteredVacancyTitle.length}
					paginate={paginate}
					currentpage={currentPage}
				/>
			</div>
		</div>
	);
};

FireBaseVacancy.displayName = "FireBaseVacancy";
export default FireBaseVacancy;
